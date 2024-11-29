import HomePage from '@/components/home-page'
import { i18n } from '@/i18n'

export default function Page() {
  return <HomePage />
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export const dynamic = 'force-static'
