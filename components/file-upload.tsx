"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import JSZip from 'jszip'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { extractImages } from '@/lib/extract-images'
import { useDictionary } from '@/components/dictionary-provider'

export function FileUpload() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const dictionary = useDictionary()

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
          title: dictionary.home.upload.message.noImages,
          description: dictionary.home.upload.message.error,
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
          title: dictionary.home.upload.status.success,
          description: dictionary.home.upload.status.ready
        })
      }
    } catch (error) {
      console.error('Error processing file:', error)
      toast({
        title: dictionary.home.upload.status.error,
        description: dictionary.home.upload.message.error,
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [toast, dictionary])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 
          transition-colors duration-200 ease-in-out
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}
          ${isProcessing ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">
              {isDragActive 
                ? dictionary.home.upload.dropzone.title
                : dictionary.home.upload.dropzone.hint}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {dictionary.home.upload.dropzone.description}
            </p>
          </div>
          {!isDragActive && (
            <>
              <p className="text-sm text-muted-foreground">{dictionary.home.upload.dropzone.or}</p>
              <Button variant="secondary" disabled={isProcessing}>
                {dictionary.home.upload.dropzone.browse}
              </Button>
            </>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{dictionary.home.upload.status.processing}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}
    </div>
  )
}