"use client";

import { useDictionary } from "./dictionary-provider";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { FileImage } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const dictionary = useDictionary();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/${currentLang}`} className="flex items-center space-x-2">
            <FileImage className="h-6 w-6" />
            <span className="font-semibold">
              {dictionary.header?.title || "Free Office Document Images Extractor"}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href={`/${currentLang}`} className="transition-colors hover:text-foreground/80">
            {dictionary.navigation.home}
          </Link>
          <Link href={`/${currentLang}#about`} className="transition-colors hover:text-foreground/80">
            {dictionary.navigation.about}
          </Link>
          <Link href={`/${currentLang}#faq`} className="transition-colors hover:text-foreground/80">
            {dictionary.navigation.faq}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
