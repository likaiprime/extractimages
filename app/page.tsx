import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { FileImage, Github } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileImage className="h-6 w-6" />
            <span className="font-bold text-xl">ExtractImages.net</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://github.com/yourusername/extractimages"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Extract Images from Office Documents
          </h1>
          <p className="text-xl text-muted-foreground">
            Easily extract images from Word, PowerPoint, and Excel files. 
            No upload to server - everything happens in your browser!
          </p>
        </div>

        <FileUpload />

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Files are processed entirely in your browser. Nothing is uploaded to any server.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-muted-foreground">
              Support for Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Fast & Easy</h3>
            <p className="text-muted-foreground">
              Just drag and drop your file, and get your images in seconds.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ExtractImages.net - All rights reserved.
        </div>
      </footer>
    </div>
  )
}