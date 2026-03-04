import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Emon | Full-Stack Software Engineer',
  description: 'Portfolio of Emon, a Full-Stack Engineer crafting scalable, modern, and reliable web applications.',
  keywords: ['Emon', 'Full-Stack Engineer', 'Software Developer', 'Web Development', 'React', 'Next.js', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Emon Howlader' }],
  creator: 'Emon Howlader',
  openGraph: {
    title: 'Emon | Full-Stack Software Engineer',
    description: 'Crafting scalable, modern, and reliable web applications.',
    url: 'https://emon-portfolio.vercel.app',
    siteName: 'Emon Portfolio',
    images: [
      {
        url: '/emon-profile.png', // Fallback to existing profile image
        width: 800,
        height: 600,
        alt: 'Emon Profile Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emon | Full-Stack Software Engineer',
    description: 'Crafting scalable, modern, and reliable web applications.',
    images: ['/emon-profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg?v=1',
    shortcut: '/favicon.svg?v=1',
    apple: '/favicon.svg?v=1',
  },
};

import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
