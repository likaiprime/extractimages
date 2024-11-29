export const i18n = {
  defaultLocale: 'en',
  locales: [
    'en',    // English
    'zh',    // Simplified Chinese
    'tw',    // Traditional Chinese
    'ko',    // Korean
    'ja',    // Japanese
    'pt',    // Portuguese
    'es',    // Spanish
    'de',    // German
    'fr',    // French
    'vi',    // Vietnamese
    'ar',    // Arabic
    'nl',    // Dutch
    'pl'     // Polish
  ]
} as const;

export type Locale = typeof i18n['locales'][number];
