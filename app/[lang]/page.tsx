// app/[lang]/page.tsx
import { i18n } from '@/i18n'
import HomePage from '@/components/home-page'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  return <HomePage />
}

export const dynamic = 'force-static'
export const dynamicParams = false