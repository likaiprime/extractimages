import { getDictionary } from "@/lib/dictionary";
import { i18n } from "@/i18n";
import DictionaryProvider from "@/components/dictionary-provider";
import Header from "@/components/header";
import { Suspense } from "react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

function ClientLayout({ children, dictionary }: { children: React.ReactNode; dictionary: any }) {
  return (
    <DictionaryProvider dictionary={dictionary}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </DictionaryProvider>
  );
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const lang = params?.lang;
  if (!lang) {
    throw new Error('Language parameter is required');
  }

  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLayout dictionary={dictionary}>{children}</ClientLayout>
    </Suspense>
  );
}

export const dynamic = 'force-static';
