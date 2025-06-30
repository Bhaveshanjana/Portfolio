import type { Metadata } from "next";
import "./globals.css";
import DarkModeProvider from "@/context/DarkModeContext";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Bhavesh",
  description:
    "Bhavesh Anjana is a Full Stack Developer specializing in building impactful web applications from scratch. Explore his portfolio to see my projects and skills.",
  keywords:
    "Bhavesh Anjana, Full Stack Developer, Web Developer, Portfolio, JavaScript, TypeScript, React, Next.js, software engineer",
  authors: [{ name: "Bhavesh Anjana" }],
  icons: {
    icon: "/b.png",
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
        <body className={`bg-white/60 dark:bg-black/95`}>
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
