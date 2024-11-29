import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
  ar: () => import("@/dictionaries/ar").then((module) => module.default),
  de: () => import("@/dictionaries/de").then((module) => module.default),
  en: () => import("@/dictionaries/en").then((module) => module.default),
  es: () => import("@/dictionaries/es").then((module) => module.default),
  fr: () => import("@/dictionaries/fr").then((module) => module.default),
  ja: () => import("@/dictionaries/ja").then((module) => module.default),
  ko: () => import("@/dictionaries/ko").then((module) => module.default),
  nl: () => import("@/dictionaries/nl").then((module) => module.default),
  pl: () => import("@/dictionaries/pl").then((module) => module.default),
  pt: () => import("@/dictionaries/pt").then((module) => module.default),
  tw: () => import("@/dictionaries/tw").then((module) => module.default),
  vi: () => import("@/dictionaries/vi").then((module) => module.default),
  zh: () => import("@/dictionaries/zh").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
