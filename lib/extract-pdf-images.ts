import * as pdfjsLib from 'pdfjs-dist'
import { ExtractedImage } from './types'

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

/**
 * Extract images from PDF files
 */
export async function extractImagesFromPDF(
  file: ArrayBuffer,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  const images: ExtractedImage[] = []
  const processedImgIds = new Set<string>()
  const pageImageCache = new Map<number, any>()

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: file,
      cMapUrl: '/cmaps/',
      enableXfa: true,
      useSystemFonts: true
    })

    const pdf = await loadingTask.promise
    const numPages = pdf.numPages

    async function extractImageData(imageObj: any): Promise<Blob | null> {
      try {
        const width = Math.floor(Math.abs(imageObj.width))
        const height = Math.floor(Math.abs(imageObj.height))

        if (!width || !height || width <= 0 || height <= 0) {
          return null
        }

        const canvas = new OffscreenCanvas(width, height)
        const ctx = canvas.getContext('2d', {willReadFrequently: true})
        if (!ctx) {
          return null
        }

        if (imageObj.bitmap instanceof VideoFrame) {
          ctx.drawImage(imageObj.bitmap, 0, 0)
          imageObj.bitmap.close()
        } else if (imageObj.bitmap instanceof ImageBitmap) {
          ctx.drawImage(imageObj.bitmap, 0, 0)
          imageObj.bitmap.close()
        } else if (imageObj.data) {
          const imageData = new ImageData(
            new Uint8ClampedArray(imageObj.data),
            width,
            height
          )
          ctx.putImageData(imageData, 0, 0)
        } else {
          return null
        }

        return canvas.convertToBlob({
          type: 'image/png',
          quality: 1.0
        })
      } catch (error) {
        console.error('Error processing image data:', error)
        return null
      }
    }

    // Pre-process all pages to warm up the cache
    await Promise.all(Array.from({ length: numPages }, async (_, i) => {
      const pageNum = i + 1
      const page = await pdf.getPage(pageNum)
      const opList = await page.getOperatorList()
      pageImageCache.set(pageNum, { page, opList })
    }))

    // Process each page
    for (let i = 0; i < numPages; i++) {
      const pageNum = i + 1
      const pageData = pageImageCache.get(pageNum)
      
      if (!pageData) continue

      const { page, opList } = pageData
      
      // Get all image operations from the page
      const imageOps = []
      for (let j = 0; j < opList.fnArray.length; j++) {
        if (opList.fnArray[j] === pdfjsLib.OPS.paintImageXObject ||
            opList.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
          imageOps.push({
            index: j,
            id: opList.argsArray[j][0]
          })
        }
      }

      // Process images in order
      for (const op of imageOps) {
        const imgId = op.id
        
        if (typeof imgId !== 'string' || processedImgIds.has(imgId)) {
          continue
        }

        try {
          processedImgIds.add(imgId)

          // Try to get the image object
          let imageObj
          try {
            imageObj = await page.objs.get(imgId)
          } catch (e) {
            // If the original ID fails, try variations
            const altIds = [
              imgId,
              `g_d0_${imgId}`,
              imgId.replace('g_d0_', ''),
              `img_p${i}_${op.index}`
            ]

            for (const altId of altIds) {
              try {
                imageObj = await page.objs.get(altId)
                if (imageObj) break
              } catch (e) {
                continue
              }
            }
          }

          if (!imageObj) {
            console.warn(`Could not find image object for ${imgId}`)
            continue
          }

          const blob = await extractImageData(imageObj)
          if (blob) {
            images.push({ data: blob, extension: 'png' })
          }
        } catch (error) {
          console.warn(`Error processing image ${imgId} on page ${pageNum}:`, error)
        }
      }

      if (onProgress) {
        onProgress((i + 1) / numPages)
      }
    }

    // Clean up
    pageImageCache.clear()

  } catch (error) {
    console.error('Error extracting images from PDF:', error)
  }

  return images
}