import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { weddingConfig } from '@/config/wedding'

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const { couple, date } = weddingConfig

export const metadata: Metadata = {
  title: `Bröllop ${date.year} - ${couple.name1} & ${couple.name2}`,
  description: `Välkommen till vårt bröllop ${date.fullDate}. ${couple.name1} & ${couple.name2} gifter sig!`,
  openGraph: {
    title: `Bröllop ${date.year} - ${couple.name1} & ${couple.name2}`,
    description: `Välkommen till vårt bröllop ${date.fullDate}`,
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
