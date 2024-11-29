import { i18n } from '@/i18n'

export default function RootPage() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const userLang = navigator.language || navigator.userLanguage;
            const lang = userLang.startsWith('zh') ? 'cn' : 'en';
            window.location.href = '/' + lang + '/';
          `,
        }}
      />
    </div>
  )
}

// 强制静态生成
export const dynamic = 'force-static'

// 生成静态路径
export async function generateStaticParams() {
  return [{}]
}
