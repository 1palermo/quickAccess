import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Electrolize } from 'next/font/google';

const electrolize = Electrolize({
  weight: '400',
  subsets: ['latin'],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Separate viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};
export const metadata: Metadata = {
  title: {
    default: "FlashShare - Fast & Secure File Sharing",
    template: "%s | FlashShare"
  },
  description: "Share files instantly with FlashShare. Secure, fast, and easy-to-use file sharing platform with QR code support and instant downloads.",
  keywords: [
    "file share online", 
    "online file sharing",
    "file share qr",
    "file share qrcode",
    "toffeshare",
    "filetransfer",
    "file transfer fast",
    "online qrcode file transfer",
    "file sharing",
    "secure file transfer",
    "quick share",
    "QR code sharing",
    "instant file upload",
    "cloud storage",
    "file hosting",
    "secure file hosting",
    "send large files",
    "privacy-focused file sharing",
    "high-speed file transfer",
    "file transfer app",
    "large file transfer online",
    "file sharing with QR code",
    "peer-to-peer file sharing",
    "secure file transfer for business",
    "encrypted file sharing",
    "one-click file sharing",
    "instant document transfer",
    "large file upload",
    "mobile file sharing",
    "best online file sharing",
    "file transfer with QR code",
    "document sharing online",
    "send files without email",
    "file storage and sharing",
    "cloud file transfer",
    "file sharing for teams",
    "unlimited file sharing",
    "no-login file sharing",
    "business file transfer",
    "file sharing with password",
    "file sharing for enterprises",
    "share files instantly",
    "file transfer via QR code",
    "share documents online",
    "fastest file transfer tool",
    "anonymous file sharing",
    "privacy-first file sharing",
    "share files with QR code",
    "instant file link sharing",
    "cross-device file transfer",
    "send files instantly",
    "file storage platform",
    "quick file transfer app",
    "file sharing platform",
    "personal file sharing",
    "secure data transfer",
    "easy file transfer online",
    "send large files quickly",
    "transfer large files safely",
    "share files with no limit",
    "secure cloud storage",
    "password-protected sharing",
    "file transfer without signup",
    "transfer files fast and secure",
    "file sharing without size limits",
    "quick and easy file sharing",
    "best file sharing for privacy",
    "digital file transfer",
    "collaborative file sharing",
    "high-speed file uploader",
    "secure file backup",
    "file transfer for remote teams",
    "file sharing made simple",
    "file storage and sharing app",
    "share files without registration",
    "reliable file transfer platform"
],
  authors: [
    {
      name: "Rohit Kumar",
      url: "https://rohitk.me/",
    }
  ],
  creator: "Rohit Kumar",
  publisher: "FlashShare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flash-share.vercel.app/",
    title: "FlashShare - Fast & Secure File Sharing",
    description: "Share files instantly with FlashShare. Secure, fast, and easy-to-use file sharing platform with QR code support.",
    siteName: "FlashShare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlashShare Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlashShare - Fast & Secure File Sharing",
    description: "Instantly share files with secure, fast, and easy-to-use platform featuring QR code support.",
    images: ["/og-image.png"],
    creator: "@gutsy_coder",
    site: "rohitk.me",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  category: "Technology",
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  applicationName: "FlashShare",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlashShare",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags */}
        <meta name="language" content="English" />
        <meta name="author" content="Rohit Kumar" />
        <meta name="rating" content="General" />
        {/* Add more additional meta tags here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${electrolize.className} antialiased bg-black`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
