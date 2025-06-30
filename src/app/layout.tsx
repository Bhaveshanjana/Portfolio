import type { Metadata } from "next";
import "./globals.css";
import DarkModeProvider from "@/context/DarkModeContext";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

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
    <html lang="en">
      <DarkModeProvider>
        <body className={`bg-white dark:bg-black`}>
          <ToastContainer position="bottom-right" />
          <Navbar />
          {children}
        </body>
      </DarkModeProvider>
    </html>
  );
}
