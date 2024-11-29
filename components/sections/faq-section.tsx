"use client";

import { useDictionary } from "@/components/dictionary-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqs?: FAQ[]
}

export default function FaqSection({ faqs = [] }: FaqSectionProps) {
  const dictionary = useDictionary();
  const faqItems = faqs.length > 0 ? faqs : dictionary.home.faq.items;

  if (!faqItems || faqItems.length === 0) return null

  return (
    <section id="faq" className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.home.faq.title}</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <h3 className="text-lg font-semibold">
                {item.question}
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base font-normal text-muted-foreground">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
