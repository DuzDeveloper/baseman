import type { Metadata } from 'next';
import { minikitConfig } from '../minikit.config';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Baseman',
  description: 'Saving the Base Blockchain',
    openGraph: {
    title: minikitConfig.miniapp.ogTitle || minikitConfig.miniapp.name,
    description: minikitConfig.miniapp.ogDescription || minikitConfig.miniapp.description,
    images: [
      {
        url: minikitConfig.miniapp.ogImageUrl || minikitConfig.miniapp.heroImageUrl || minikitConfig.miniapp.iconUrl,
        width: 1200,
        height: 630,
        alt: minikitConfig.miniapp.name,
      },
    ],
  },
  other: {
    'base:app_id': '698609178dcaa0daf5755fb6',
    'fc:miniapp': JSON.stringify({
      version: minikitConfig.miniapp.version,
      imageUrl: minikitConfig.miniapp.heroImageUrl || minikitConfig.miniapp.iconUrl,
      button: {
        title: `Open ${minikitConfig.miniapp.name}`,
        action: {
          type: 'launch_frame',
          url: minikitConfig.miniapp.homeUrl,
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
