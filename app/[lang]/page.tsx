"use client";

import { FileUpload } from '@/components/file-upload'
import { FileImage } from 'lucide-react'
import { useDictionary } from "@/components/dictionary-provider";

export default function Home() {
  const dictionary = useDictionary();
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {dictionary.home.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.home.description}
          </p>
        </div>

        <div className="w-full mb-16">
          <FileUpload />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.privacy.title}</h3>
            <p className="text-muted-foreground">
              {dictionary.home.features.privacy.description}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.formats.title}</h3>
            <p className="text-muted-foreground">
              {dictionary.home.features.formats.description}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.speed.title}</h3>
            <p className="text-muted-foreground">
              {dictionary.home.features.speed.description}
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full border-t mt-24">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
          {new Date().getFullYear()} ExtractImages.net - {dictionary.home.footer}
        </div>
      </footer>
    </div>
  )
}
