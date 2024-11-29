/**
 * Represents an extracted image with its data and file extension
 */
export interface ExtractedImage {
    /** The image data as a Blob */
    data: Blob
    /** The file extension (e.g., 'png', 'jpg', etc.) */
    extension: string
}
