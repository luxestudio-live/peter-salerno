import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peter Salerno — The Man With The Magic Message | Keynote Speaker & Author",
  description:
    "Official interactive 3D digital book experience for Peter Salerno — Australian keynote speaker, author of The Man With The Magic Message, podcast host of Happy Business Radio, and commercial mentor.",
  keywords: [
    "Peter Salerno",
    "The Man With The Magic Message",
    "Keynote Speaker Australia",
    "Happy Business Radio",
    "Laughter Clubs Australasia",
    "Corporate Speaker Sydney Melbourne Brisbane",
    "Sales Psychology",
    "Business Mentor",
  ],
  authors: [{ name: "Peter Salerno" }],
  openGraph: {
    title: "Peter Salerno — The Man With The Magic Message",
    description: "A little laughter. A different perspective. A powerful change.",
    siteName: "Peter Salerno",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121314",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#121314] antialiased selection:bg-[#A85B32] selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
