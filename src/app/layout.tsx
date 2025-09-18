import type { Metadata } from "next";
import "./globals.css";
import DarkModeProvider from "@/context/DarkModeContext";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/data/siteconfig";
import Img from "./image.png";

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
  keywords: siteConfig.keywords,
  title: { default: siteConfig.authors, template: `%s | ${siteConfig.authors}` },
  authors: [{ name: siteConfig.authors }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: Img.src,
        width: Img.width,
        height: Img.height,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    images: [
      {
        url: Img.src,
        width: Img.width,
        height: Img.height,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script for white flash during refresh in dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
              })();
            `,
          }}
        />
      </head>
      <DarkModeProvider>
        <body className={`bg-white/60 dark:bg-black`}>
          <ToastContainer position="bottom-right" />
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </DarkModeProvider>
    </html>
  );
}
