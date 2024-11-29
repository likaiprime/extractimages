"use client";

import { useDictionary } from "@/components/dictionary-provider";

export default function AboutSection() {
  const dictionary = useDictionary();
  
  return (
    <section id="about" className="py-16 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{dictionary.home.about.title}</h2>
        
        <div className="space-y-4 text-lg">
          <p className="text-base font-normal text-muted-foreground">{dictionary.home.about.description1}</p>
          <p className="text-base font-normal text-muted-foreground">{dictionary.home.about.description2}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">{dictionary.home.about.keyFeatures.title}</h3>
              <ul className="space-y-2 text-base font-normal text-muted-foreground">
                {dictionary.home.about.keyFeatures.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">{dictionary.home.about.whyChoose.title}</h3>
              <ul className="space-y-2 text-base font-normal text-muted-foreground">
                {dictionary.home.about.whyChoose.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
