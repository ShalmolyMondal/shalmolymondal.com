import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSiteContent();

  return {
    title: site.metadata.title,
    description: site.metadata.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
