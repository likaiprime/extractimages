export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://extractimages.net/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

// 强制静态生成
export const dynamic = 'force-static'

// 生成静态参数
export async function generateStaticParams() {
  return [{}]
}
