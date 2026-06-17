import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FullPageLoader from "@/components/FullPageLoader";
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
  const site = getSiteContent();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        <FullPageLoader name={site.loaderText}>{children}</FullPageLoader>
      </body>
    </html>
  );
}
