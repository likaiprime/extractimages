import JSZip from 'jszip'
import {ExtractedImage} from './types'

/**
 * Extract images from Office files (docx, pptx, xlsx)
 */
export async function extractImagesFromOffice(
    content: ArrayBuffer,
    onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
    const images: ExtractedImage[] = []
    try {
        const zip = new JSZip()
        const zipContent = await zip.loadAsync(content)
        const imageFiles = Object.keys(zipContent.files).filter(path =>
            /\.(png|jpe?g|gif|bmp|tiff?)$/i.test(path)
        )

        for (let i = 0; i < imageFiles.length; i++) {
            const path = imageFiles[i]
            const zipEntry = zipContent.files[path]

            if (!zipEntry.dir) {
                try {
                    const blob = await zipEntry.async('blob')
                    const extension = path.split('.').pop()?.toLowerCase() || 'png'

                    // Set correct MIME type
                    let mimeType: string
                    switch (extension) {
                        case 'jpg':
                        case 'jpeg':
                            mimeType = 'image/jpeg'
                            break
                        case 'png':
                            mimeType = 'image/png'
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

                    // Create new blob with correct MIME type
                    const blobWithType = new Blob([await blob.arrayBuffer()], {type: mimeType})
                    images.push({data: blobWithType, extension})
                } catch (error) {
                    console.error(`Error extracting image from office file ${path}:`, error)
                }
            }

            if (onProgress) {
                onProgress((i + 1) / imageFiles.length)
            }
        }
    } catch (error) {
        console.error('Error extracting images from office file:', error)
    }

    return images
}
