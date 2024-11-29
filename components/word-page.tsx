'use client'

import { useDictionary } from './dictionary-provider'
import UploadSection from './sections/upload-section'
import FeaturesSection from './sections/features-section'
import FaqSection from './sections/faq-section'
import AboutSection from './sections/about-section'

export default function WordPage() {
  const { word: dict } = useDictionary()
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Word-specific hero section */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {dict?.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {dict?.subtitle}
          </p>
          <p className="text-lg text-muted-foreground">
            {dict?.description}
          </p>
        </section>

        <UploadSection acceptTypes=".docx,.doc" />
        
        <FeaturesSection features={dict?.features} />
        
        <FaqSection faqs={Array.isArray(dict?.faq?.items) ? dict.faq.items : []} />
        
        <AboutSection about={dict?.about} />
      </div>
    </div>
  )
}
