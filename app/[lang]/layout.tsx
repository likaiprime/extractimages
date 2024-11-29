// app/[lang]/layout.tsx
import { getDictionary } from "@/lib/dictionary";
import { Locale, i18n } from "@/i18n";
import DictionaryProvider from "@/components/dictionary-provider";
import Header from "@/components/header";
import { Suspense } from "react";

// Define proper types for the layout
type LayoutProps = {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
};

// Separate client component with its own props type
type ClientLayoutProps = {
  children: React.ReactNode;
  dictionary: any;
};

function ClientLayout({ children, dictionary }: ClientLayoutProps) {
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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Root layout component with proper typing
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = params;

  if (!i18n.locales.includes(lang)) {
    throw new Error('Invalid locale');
  }

  const dictionary = await getDictionary(lang);

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <ClientLayout dictionary={dictionary}>
          {children}
        </ClientLayout>
      </Suspense>
  );
}

// Metadata generator with correct typing
export async function generateMetadata({ params }: LayoutProps) {
  return {
    title: 'Office Document Image Extractor',
    description: 'Extract images from Word, PowerPoint, and Excel files instantly',
  };
}

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;