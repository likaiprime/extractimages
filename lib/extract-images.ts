import JSZip from 'jszip'

interface ExtractedImage {
  data: Blob
  extension: string
}

export async function extractImages(
  file: File,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  const zip = new JSZip()
  const content = await file.arrayBuffer()
  const zipFile = await zip.loadAsync(content)
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