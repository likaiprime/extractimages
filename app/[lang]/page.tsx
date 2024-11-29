// app/[lang]/page.tsx
import { i18n } from '@/i18n';
import HomePage from '@/components/home-page';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

interface PageProps {
  params: {
    lang: string;
  };
}

export default function Page({ params }: PageProps) {
  return <HomePage />;
}

// Static generation config
export const dynamic = 'force-static';
export const dynamicParams = false;