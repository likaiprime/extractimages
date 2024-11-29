"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { i18n } from "@/i18n";

const languageNames = {
  en: "English",
  cn: "简体中文",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] || i18n.defaultLocale;

  const handleLanguageChange = (newLocale: string) => {
    if (currentLang === newLocale) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    router.push(newPathname);
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(languageNames).map((locale) => (
          <SelectItem key={locale} value={locale}>
            {languageNames[locale as keyof typeof languageNames]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
