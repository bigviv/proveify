import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proveify | AI-powered social proof for freelancers & agencies",
  description: "Collect testimonials from clients automatically, polish them with AI, and display them beautifully on your website. Set up in 5 minutes.",
icons: {
  icon: '/favicon.png',
},
  openGraph: {
  images: ['/og-image.png'],
},
twitter: {
  card: 'summary_large_image',
  images: ['/og-image.png'],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
