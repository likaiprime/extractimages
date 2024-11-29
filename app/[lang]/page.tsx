// page.tsx
import HomePage from '@/components/home-page';
import { i18n } from '@/i18n';

type PageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = async () => {
  const locales = i18n.locales;
  return locales.map((lang) => ({ lang }));
};

const Page = async ({ params }: PageProps) => {
  return <HomePage />;
};

export default Page;

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;