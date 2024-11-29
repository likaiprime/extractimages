import { i18n } from '@/i18n'
import PowerPointPage from '@/components/powerpoint-page'

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
  return <PowerPointPage />
}

export const dynamic = 'force-static'
export const dynamicParams = false
