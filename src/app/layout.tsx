import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from "@/components/providers";
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://astramedical.co'),
  title: {
    default: 'Astra Medical | AI-Powered Medical Billing',
    template: '%s | Astra Medical'
  },
  description: 'Increase revenue by 30% with AI medical billing. Reduce denials and file claims in under 10 minutes.',
  icons: {
    icon: '/astra-logo.png',
    shortcut: '/astra-logo.png',
    apple: '/astra-logo.png',
  },
  manifest: '/manifest.json',
  applicationName: 'Astra Medical',
  keywords: ['medical billing', 'healthcare AI', 'revenue cycle management', 'claim denials', 'medical coding'],
  authors: [{ name: 'Astra Medical' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://astramedical.co',
    title: 'Astra Medical | AI-Powered Medical Billing',
    description: 'Increase revenue by 30% with AI medical billing. Reduce denials and file claims in under 10 minutes.',
    siteName: 'Astra Medical',
    images: [
      {
        url: '/astra-logo.png',
        width: 800,
        height: 600,
        alt: 'Astra Medical Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra Medical | AI-Powered Medical Billing',
    description: 'Increase revenue by 30% with AI medical billing. Reduce denials and file claims in under 10 minutes.',
    images: ['/astra-logo.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/astra-logo.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
