'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n'
import { useDictionary } from '@/components/dictionary-provider'

const LANGUAGES = {
  en: 'English',
  'zh': '简体中文',
  'tw': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ar: 'العربية',
  hi: 'हिन्दी',
  bn: 'বাংলা',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  th: 'ภาษาไทย',
  vi: 'Tiếng Việt',
  nl: 'Nederlands',
  pl: 'Polski',
  tr: 'Türkçe'
}

export default function FooterSection() {
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1]
    const {tools, footer} = useDictionary()

  const friendlyLinks = [
    { name: 'Dreamega.AI', url: 'https://dreamega.ai' },
    { name: 'Videoweb.AI', url: 'https://videoweb.ai' },
    { name: 'Flux-AI.io', url: 'https://flux-ai.io' }
  ]

  const toolLinks = [
    { name: tools.excel, path: '/excel' },
    { name: tools.word, path: '/word' },
    { name: tools.powerpoint, path: '/powerpoint' },
    { name: tools.pdf, path: '/pdf' }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Logo and Copyright */}
        <div className="md:col-span-6 flex flex-col items-start">
          <Image 
            src="/dreamega.svg" 
            alt="Dreamega Logo" 
            width={120} 
            height={40}
            className="mb-4"
          />
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dreamega. All rights reserved.
          </p>
        </div>

        {/* Links Container */}
        <div className="md:col-span-6 grid grid-cols-2 gap-8">
          {/* Friendly Links */}
          <div>
              <h3 className="font-semibold mb-4 text-white">{footer.partners}</h3>
            <ul className="space-y-2">
              {friendlyLinks.map((link) => (
                <li key={link.url}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tool Links */}
          <div>
              <h3 className="font-semibold mb-4 text-white">{footer.tools}</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={`/${currentLang}${link.path}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="border-t border-gray-800 pt-8">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center gap-4 min-w-max px-4">
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}${pathname.slice(3)}`}
                className={`text-sm whitespace-nowrap transition-colors ${
                  currentLang === locale
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {LANGUAGES[locale] || locale.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
