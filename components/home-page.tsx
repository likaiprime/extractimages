"use client";

import { FileUpload } from '@/components/file-upload'
import { FileImage, Shield, Zap, Package, Layers, Image as ImageIcon, Monitor } from 'lucide-react'
import { useDictionary } from "@/components/dictionary-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function HomePage() {
  const dictionary = useDictionary();
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {dictionary.home.title}
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            {dictionary.home.subtitle}
          </h2>
          <p className="text-xl text-muted-foreground">
            {dictionary.home.description}
          </p>
        </div>

        {/* 文件上传部分 */}
        <div className="w-full mb-16">
          <FileUpload />
        </div>

        {/* 特性部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <Shield className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.privacy.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.privacy.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <Zap className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.speed.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.speed.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <Package className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.formats.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.formats.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <Layers className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.batch.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.batch.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <ImageIcon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.quality.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.quality.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <Monitor className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{dictionary.home.features.noInstall.title}</h3>
            <p className="text-center text-muted-foreground">
              {dictionary.home.features.noInstall.description}
            </p>
          </div>
        </div>

        {/* FAQ部分 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{dictionary.home.faq.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {dictionary.home.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <footer className="w-full border-t mt-24">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ExtractImages.net - {dictionary.home.footer}
        </div>
      </footer>
    </div>
  )
}
