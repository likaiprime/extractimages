"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n";
import { cn } from "@/lib/utils";

const languageNames: { [key: string]: string } = {
  en: "English",
  zh: "简体中文",
  tw: "繁體中文",
  ko: "한국어",
  ja: "日本語",
  pt: "Português",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  vi: "Tiếng Việt",
  ar: "العربية",
  nl: "Nederlands",
  pl: "Polski"
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || i18n.defaultLocale;
  const restPath = pathname.split('/').slice(2).join('/');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Languages className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {i18n.locales.map((locale) => {
          const isActive = currentLang === locale;
          const href = `/${locale}${restPath ? `/${restPath}` : ''}`;
          
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link
                href={href}
                className={cn(
                  "w-full cursor-pointer",
                  isActive && "bg-accent font-medium"
                )}
                aria-current={isActive ? "page" : undefined}
                hrefLang={locale}
                title={`Switch to ${languageNames[locale]}`}
              >
                {languageNames[locale]}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
