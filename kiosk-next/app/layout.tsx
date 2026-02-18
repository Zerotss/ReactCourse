import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900']
})
export const metadata: Metadata = {
  title: "kiosk Next.js con App Router y Primas",
  description: "kiosk Next.js con App Router y Primas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} bg-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
