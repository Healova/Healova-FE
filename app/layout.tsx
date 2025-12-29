import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Healova - Expert PCOD/PCOS Care That Actually Works",
  description:
    "Get personalized PCOD/PCOS treatment from board-certified doctors. Trusted by 10,000+ women. Online consultations, evidence-based care, and lasting results. Start your healing journey today.",
  keywords: [
    "PCOD treatment",
    "PCOS care",
    "PCOD doctor online",
    "PCOS treatment online",
    "hormonal imbalance treatment",
    "irregular periods treatment",
    "PCOD specialist",
    "women's health",
    "PCOS diet plan",
    "PCOD symptoms",
  ],
  authors: [{ name: "Healova" }],
  creator: "Healova",
  publisher: "Healova",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://healova.com",
    title: "Healova - Expert PCOD/PCOS Care That Actually Works",
    description:
      "Get personalized PCOD/PCOS treatment from board-certified doctors. Trusted by 10,000+ women. Start your healing journey today.",
    siteName: "Healova",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healova - Expert PCOD/PCOS Care",
    description: "Personalized PCOD/PCOS treatment from expert doctors. Trusted by 10,000+ women.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
