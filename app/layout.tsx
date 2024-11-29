import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExtractImages - Free Office Document Image Extractor",
  description: "Extract images from Office documents easily and securely in your browser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={`${inter.className} min-h-screen flex flex-col`}>
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-static';