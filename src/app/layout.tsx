import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { DemoBanner } from '@/components/layout/DemoBanner';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Astra Medical",
  description: "Streamline your medical billing with AI-powered automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {process.env.NEXT_PUBLIC_APP_MODE === 'demo' && <DemoBanner />}
        {children}
      </body>
    </html>
  );
}