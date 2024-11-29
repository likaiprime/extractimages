"use client";

import { useDictionary } from "@/components/dictionary-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const dictionary = useDictionary();
  
  return (
    <div id="faq" className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.home.faq.title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {dictionary.home.faq.items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {item.question}
                </h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-6">
                <p className="text-base font-normal text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
