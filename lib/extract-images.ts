import JSZip from 'jszip'
import * as pdfjsLib from 'pdfjs-dist'

// Ensure the PDF.js worker is properly set up
if (typeof window !== 'undefined') {
  const workerSrc = `${window.location.origin}/pdf.worker.min.js`
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
}

interface ExtractedImage {
  data: Blob
  extension: string
}

async function extractImagesFromPDF(file: ArrayBuffer, onProgress?: (progress: number) => void): Promise<ExtractedImage[]> {
  const images: ExtractedImage[] = []
  const processedImgIds = new Set<string>()

  try {
    // Initialize PDF document with more options
    const loadingTask = pdfjsLib.getDocument({
      data: file,
      cMapUrl: '/cmaps/',
      cMapPacked: true,
      enableXfa: true,
      useSystemFonts: true
    })

    const pdf = await loadingTask.promise
    const numPages = pdf.numPages

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    // Function to extract image data
    async function extractImageData(imageObj: any): Promise<Blob | null> {
      try {
        // Ensure width and height are valid positive integers
        const width = Math.floor(Math.abs(imageObj.width));
        const height = Math.floor(Math.abs(imageObj.height));

        if (!width || !height || width <= 0 || height <= 0) {
          console.error('Invalid dimensions:', width, height);
          return null;
        }

        // Create canvas with validated dimensions
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        if (!ctx) {
          console.error('Failed to get canvas context');
          return null;
        }

        // Handle different image types
        if (imageObj.bitmap instanceof VideoFrame) {
          ctx.drawImage(imageObj.bitmap, 0, 0);
          imageObj.bitmap.close(); // Clean up VideoFrame
        } else if (imageObj.bitmap instanceof ImageBitmap) {
          ctx.drawImage(imageObj.bitmap, 0, 0);
          imageObj.bitmap.close(); // Clean up ImageBitmap
        } else if (imageObj.data) {
          // Handle raw image data
          const imageData = new ImageData(
              new Uint8ClampedArray(imageObj.data),
              width,
              height
          );
          ctx.putImageData(imageData, 0, 0);
        } else {
          console.error('Unsupported image format');
          return null;
        }

        // Convert to blob with high quality
        return canvas.convertToBlob({
          type: 'image/png',
          quality: 1.0
        });
      } catch (error) {
        console.error('Error processing image data:', error, 'Image object:', imageObj);
        return null;
      }
    }

    async function retryGetObject(page: any, objId: string, maxRetries = 5): Promise<Blob | null> {
      let attempt = 0;
      let lastError: Error | null = null;

      while (attempt < maxRetries) {
        try {
          // Get page resources safely
          const resources = await page.getOperatorList();
          if (!resources) {
            throw new Error('No resources found in page');
          }

          // Try to get image object
          const imageObj = await page.objs.get(objId);
          if (!imageObj) {
            throw new Error(`Image object ${objId} not found`);
          }

          console.log('Found image object for', objId + ':', imageObj);

          // Extract image data
          const blob = await extractImageData(imageObj);
          if (!blob) {
            throw new Error(`Failed to extract image data for ${objId}`);
          }

          return blob;
        } catch (error) {
          lastError = error as Error;
          attempt++;
          console.log(`Attempt ${attempt} failed for ${objId}:`, error);

          if (attempt < maxRetries) {
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 500));
          }
        }
      }

      throw lastError || new Error(`Failed to extract image ${objId}`);
    }

    // Process each page
    for (let i = 0; i < numPages; i++) {
      try {
        const page = await pdf.getPage(i + 1)
        const ops = await page.getOperatorList()

        for (let j = 0; j < ops.fnArray.length; j++) {
          if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject ||
              ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
            const imgId = ops.argsArray[j][0]

            if (typeof imgId === 'string' && !processedImgIds.has(imgId)) {
              processedImgIds.add(imgId)
              try {
                const imageResult = await retryGetObject(page, imgId)
                if (imageResult) {
                  images.push({data: imageResult, extension: 'png'})
                }
              } catch (error) {
                console.warn(`Error extracting image ${imgId} from page ${i + 1}:`, error)
              }
            }
          }
        }

        if (onProgress) {
          onProgress(Math.round(((i + 1) / numPages) * 100))
        }
      } catch (error) {
        console.error(`Error processing page ${i + 1}:`, error)
      }
    }
  } catch (error) {
    console.error('Error loading PDF:', error)
    throw error
  }

  return images
}

async function extractImagesFromOffice(file: ArrayBuffer, onProgress?: (progress: number) => void): Promise<ExtractedImage[]> {
  const zip = new JSZip()
  try {
    const zipFile = await zip.loadAsync(file)
    const images: ExtractedImage[] = []
    const totalFiles = Object.keys(zipFile.files).length
    let processedFiles = 0

    for (const [path, zipEntry] of Object.entries(zipFile.files)) {
      try {
        if (zipEntry.dir) {
          processedFiles++
          continue
        }

        // Check if the file is an image
        if (path.match(/\.(png|jpe?g|gif|bmp|tiff?|svg)$/i)) {
          try {
            const blob = await zipEntry.async('blob')
            const extension = path.split('.').pop()?.toLowerCase() || 'png'

            // 设置正确的MIME类型
            let mimeType: string
            switch (extension) {
              case 'jpg':
              case 'jpeg':
                mimeType = 'image/jpeg'
                break
              case 'svg':
                mimeType = 'image/svg+xml'
                break
              case 'gif':
                mimeType = 'image/gif'
                break
              case 'bmp':
                mimeType = 'image/bmp'
                break
              case 'tif':
              case 'tiff':
                mimeType = 'image/tiff'
                break
              default:
                mimeType = 'image/png'
            }

            // 创建新的blob以确保正确的MIME类型
            const blobWithType = new Blob([await blob.arrayBuffer()], {type: mimeType})
            images.push({data: blobWithType, extension})
          } catch (error) {
            console.error(`Error extracting image from office file ${path}:`, error)
          }
        }

        processedFiles++
        if (onProgress) {
          onProgress(Math.round((processedFiles / totalFiles) * 100))
        }
      } catch (error) {
        console.error(`Error processing office file ${path}:`, error)
        continue
      }
    }

    return images
  } catch (error) {
    console.error('Error loading office file:', error)
    throw error
  }
}

export async function extractImages(
  file: File,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  try {
    const content = await file.arrayBuffer()

    // Check file type and use appropriate extraction method
    if (file.name.toLowerCase().endsWith('.pdf')) {
      return extractImagesFromPDF(content, onProgress)
    } else {
      return extractImagesFromOffice(content, onProgress)
    }
  } catch (error) {
    console.error('Error reading file:', error)
    throw error
  }
}