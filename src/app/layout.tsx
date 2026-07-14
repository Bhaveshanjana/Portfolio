import type { Metadata } from "next";
import "./globals.css";
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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-black text-zinc-100">
        <ToastContainer position="bottom-right" theme="dark" />
        <Navbar />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
