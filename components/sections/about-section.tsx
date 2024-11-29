"use client";

import { useDictionary } from "@/components/dictionary-provider";

interface About {
  title: string
  description1?: string
  description2?: string
  keyFeatures?: {
    title: string
    items: readonly string[]
  }
  whyChoose?: {
    title: string
    items: readonly string[]
  }
}

interface AboutSectionProps {
  about?: About
}

export default function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null

  return (
    <section id="about" className="py-16 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{about.title}</h2>
        
        <div className="space-y-4 text-lg">
          {about.description1 && (
            <p className="text-base font-normal text-muted-foreground">{about.description1}</p>
          )}
          {about.description2 && (
            <p className="text-base font-normal text-muted-foreground">{about.description2}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {about.keyFeatures && (
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">{about.keyFeatures.title}</h3>
                <ul className="space-y-2 text-base font-normal text-muted-foreground">
                  {about.keyFeatures.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {about.whyChoose && (
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">{about.whyChoose.title}</h3>
                <ul className="space-y-2 text-base font-normal text-muted-foreground">
                  {about.whyChoose.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
