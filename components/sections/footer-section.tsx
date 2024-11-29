"use client";

import { useDictionary } from "@/components/dictionary-provider";

export default function FooterSection() {
  const dictionary = useDictionary();
  
  return (
    <footer className="w-full border-t mt-24">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ExtractImages.net - {dictionary.home.footer}
      </div>
    </footer>
  );
}
