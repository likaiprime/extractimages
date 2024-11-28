"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import JSZip from 'jszip'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { extractImages } from '@/lib/extract-images'

export function FileUpload() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const file = acceptedFiles[0]
      const images = await extractImages(file, (progress) => {
        setProgress(progress)
      })

      if (images.length === 0) {
        toast({
          title: "No images found",
          description: "The selected file doesn't contain any images.",
          variant: "destructive"
        })
      } else {
        // Create a zip file containing all images
        const zip = new JSZip()
        images.forEach((image, index) => {
          zip.file(`image-${index + 1}.${image.extension}`, image.data)
        })
        
        const content = await zip.generateAsync({ type: "blob" })
        const url = window.URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = `images-${file.name}.zip`
        a.click()
        window.URL.revokeObjectURL(url)

        toast({
          title: "Success!",
          description: `Extracted ${images.length} images from ${file.name}`
        })
      }
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "An error occurred while processing your file. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  })

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">Drop your file here or click to select</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files
            </p>
          </div>
          <Button variant="secondary" disabled={isProcessing}>
            Select File
          </Button>
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Processing... {progress}%
          </p>
        </div>
      )}
    </div>
  )
}