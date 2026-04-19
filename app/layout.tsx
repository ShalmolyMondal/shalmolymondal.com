import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FullPageLoader from "@/components/FullPageLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shalmoly - Data Engineer & Creative Soul",
  description: "Portfolio of Shalmoly - Data Engineer passionate about building scalable data pipelines and creating beautiful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        <FullPageLoader>{children}</FullPageLoader>
      </body>
    </html>
  );
}
