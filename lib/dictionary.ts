import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.default),
  cn: () => import("@/dictionaries/cn").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
