// app/[lang]/layout.tsx
import { getDictionary } from "@/lib/dictionary";
import { Locale, i18n } from "@/i18n";
import DictionaryProvider from "@/components/dictionary-provider";
import Header from "@/components/header";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

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
            {process.env.NEXT_PUBLIC_GA_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
        </DictionaryProvider>
    );
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        lang: string;
    }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
    const { lang } = await params;

    if (!i18n.locales.includes(lang as Locale)) {
        throw new Error('Invalid locale');
    }

    const dictionary = await getDictionary(lang as Locale);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientLayout dictionary={dictionary}>
                {children}
            </ClientLayout>
        </Suspense>
    );
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as Locale);
    const pageTitle = dictionary.home.title;
    const formattedTitle = dictionary.common.titleFormat.replace('{title}', pageTitle);

    return {
        title: formattedTitle,
        description: dictionary.home.description,
        alternates: {
            languages: {
                ...Object.fromEntries(
                    i18n.locales.map(locale => [
                        locale,
                        `/${locale}`
                    ])
                )
            }
        }
    };
}

export const dynamic = 'force-static';
export const dynamicParams = false;