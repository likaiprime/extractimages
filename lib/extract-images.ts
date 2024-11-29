import JSZip from 'jszip'
import * as pdfjsLib from 'pdfjs-dist'

// Ensure the PDF.js worker is properly set up
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

interface ExtractedImage {
  data: Blob
  extension: string
}

async function extractImagesFromPDF(file: ArrayBuffer, onProgress?: (progress: number) => void): Promise<ExtractedImage[]> {
  const images: ExtractedImage[] = []
  const pdf = await pdfjsLib.getDocument({ data: file }).promise
  const numPages = pdf.numPages

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)
    const ops = await page.getOperatorList()
    const imgIds = new Set<string>()

    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject) {
        const imgId = ops.argsArray[j][0]
        if (!imgIds.has(imgId)) {
          imgIds.add(imgId)
          const img = await page.objs.get(imgId)
          if (img?.data) {
            const blob = new Blob([img.data], { type: 'image/png' })
            images.push({ data: blob, extension: 'png' })
          }
        }
      }
    }

    if (onProgress) {
      onProgress(Math.round((i / numPages) * 100))
    }
  }

  return images
}

async function extractImagesFromOffice(file: ArrayBuffer, onProgress?: (progress: number) => void): Promise<ExtractedImage[]> {
  const zip = new JSZip()
  const zipFile = await zip.loadAsync(file)
  const images: ExtractedImage[] = []
  const totalFiles = Object.keys(zipFile.files).length
  let processedFiles = 0

  for (const [path, zipEntry] of Object.entries(zipFile.files)) {
    if (zipEntry.dir) {
      processedFiles++
      continue
    }

    // Check if the file is an image
    if (path.match(/\.(png|jpe?g|gif|bmp|tiff?)$/i)) {
      const blob = await zipEntry.async('blob')
      const extension = path.split('.').pop() || 'png'
      images.push({ data: blob, extension })
    }

    processedFiles++
    if (onProgress) {
      onProgress(Math.round((processedFiles / totalFiles) * 100))
    }
  }

  return images
}

export async function extractImages(
  file: File,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  const content = await file.arrayBuffer()
  
  // Check file type and use appropriate extraction method
  if (file.name.toLowerCase().endsWith('.pdf')) {
    return extractImagesFromPDF(content, onProgress)
  } else {
    return extractImagesFromOffice(content, onProgress)
  }
}