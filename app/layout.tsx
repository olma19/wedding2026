import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding 2026",
  description: "Join us for our special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
