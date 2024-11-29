"use client";

import { useDictionary } from "@/components/dictionary-provider";

export default function HeroSection() {
  const dictionary = useDictionary();
  
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        {dictionary.home.title}
      </h1>
      <h2 className="text-2xl font-semibold mb-4">
        {dictionary.home.subtitle}
      </h2>
      <p className="text-lg font-normal text-muted-foreground mb-8">
        {dictionary.home.description}
      </p>
    </div>
  );
}
