import { i18n } from '@/i18n'
import ExcelPage from '@/components/excel-page'

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
  return <ExcelPage />
}

export const dynamic = 'force-static'
export const dynamicParams = false
