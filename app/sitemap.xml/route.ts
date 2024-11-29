import { i18n } from '@/i18n'

export async function GET() {
    const baseUrl = 'https://extractimages.net'

    // 定义所有可用的路径
    const paths = [
        '/',
        '/excel',
        '/word',
        '/powerpoint',
        '/pdf'
    ]

    // 为每个语言和路径生成URL
    const urls = i18n.locales.flatMap(locale =>
        paths.map(path => ({
            url: `${baseUrl}/${locale}${path}`,
            lastModified: new Date().toISOString(),
        }))
    )

  // 生成sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(({ url, lastModified }) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
        </url>
      `).join('')}
    </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

// 强制静态生成
export const dynamic = 'force-static'

// 生成静态参数
export async function generateStaticParams() {
  return [{}]
}
