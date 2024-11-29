import {ExtractedImage} from './types'
import {extractImagesFromOffice} from './extract-office-images'
import {extractImagesFromPDF} from './extract-pdf-images'

/**
 * Main function to extract images from files
 * @param file The file to extract images from (PDF or Office document)
 * @param onProgress Optional callback for progress updates
 * @returns Promise resolving to array of extracted images
 */
export async function extractImages(
  file: File,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  try {
    const content = await file.arrayBuffer()

    // Check file type and use appropriate extraction method
    if (file.name.toLowerCase().endsWith('.pdf')) {
      return extractImagesFromPDF(content, onProgress)
    } else if (/\.(docx|pptx|xlsx)$/i.test(file.name)) {
      return extractImagesFromOffice(content, onProgress)
    } else {
      throw new Error('Unsupported file type')
    }
  } catch (error) {
    console.error('Error extracting images:', error)
    throw error
  }
}