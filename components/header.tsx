"use client";

import { useDictionary } from "./dictionary-provider";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { ToolsMenu } from "./tools-menu";
import { FileImage } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const dictionary = useDictionary();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center">
        {/* Logo and title */}
        <Link href={`/${currentLang}`} className="flex items-center space-x-2">
          <FileImage className="h-6 w-6" />
          <span className="font-semibold hidden sm:inline">
            {dictionary.header?.title || "Free Office Document Images Extractor"}
          </span>
        </Link>

        {/* Right side navigation and controls */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Navigation links */}
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link href={`/${currentLang}`} className="transition-colors hover:text-foreground/80">
              {dictionary.navigation.home}
            </Link>
            <ToolsMenu />
            <Link href={`/${currentLang}#about`} className="transition-colors hover:text-foreground/80">
              {dictionary.navigation.about}
            </Link>
            <Link href={`/${currentLang}#faq`} className="transition-colors hover:text-foreground/80">
              {dictionary.navigation.faq}
            </Link>
          </nav>

          {/* Theme and language controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
