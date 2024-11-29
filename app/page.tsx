import { i18n } from '@/i18n'

export default function RootPage() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Available languages in our application
            const availableLanguages = ${JSON.stringify(i18n.locales)};
            
            // Get browser language
            const userLang = navigator.language || navigator.userLanguage;
            const browserLang = userLang.toLowerCase().split('-')[0];
            
            // Find the best matching language
            let lang = '${i18n.defaultLocale}'; // default to English
            
            // Special handling for Chinese variants
            if (browserLang.startsWith('zh')) {
              // zh-TW -> tw, zh-HK -> tw, others -> zh
              lang = userLang.includes('TW') || userLang.includes('HK') ? 'tw' : 'zh';
            } else {
              // For other languages, try to match exactly
              if (availableLanguages.includes(browserLang)) {
                lang = browserLang;
              }
            }
            
            // Redirect to the appropriate language page
            window.location.href = '/' + lang + '/';
          `,
        }}
      />
    </div>
  )
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({
    lang,
  }));
}