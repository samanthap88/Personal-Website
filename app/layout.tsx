import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import { getBaseUrl, siteName } from "./lib/site";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Samantha Pang | Software Engineer Portfolio",
    template: "%s | Samantha Pang",
  },
  description:
    "Samantha Pang is a software engineer and computer science student building full-stack products across web, data, and AI.",
  keywords: [
    "Samantha Pang",
    "Samantha Pang portfolio",
    "Samantha Pang software engineer",
    "software engineer portfolio",
    "full stack developer",
    "computer science student",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Samantha Pang" }],
  creator: "Samantha Pang",
  publisher: "Samantha Pang",
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "Samantha Pang | Software Engineer Portfolio",
    description:
      "Portfolio of Samantha Pang featuring software engineering experience, projects, and technical skills.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samantha Pang | Software Engineer Portfolio",
    description:
      "Portfolio of Samantha Pang featuring software engineering experience, projects, and technical skills.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
