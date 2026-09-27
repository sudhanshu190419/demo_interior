import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-luxury",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "FORMA INTERIORS — Spaces that feel like you",
  description:
    "Award-winning luxury interior design studio creating bespoke residential and architectural transformations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased selection:bg-[#2C3E2D] selection:text-white`}
    >
      <head>
        <link
          rel="preload"
          href="/interior/base/tv-room.png"
          as="image"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/interior/base/tv-room-mobile.png"
          as="image"
          media="(max-width: 1023px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/interior/before-after/slices/living-room-before.png"
          as="image"
          media="(min-width: 1024px)"
        />
        <link
          rel="preload"
          href="/interior/before-after/slices/living-room-before-mobile.png"
          as="image"
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          href="/interior/before-after/slices/living-room-after.png"
          as="image"
          media="(min-width: 1024px)"
        />
        <link
          rel="preload"
          href="/interior/before-after/slices/living-room-after-mobile.png"
          as="image"
          media="(max-width: 1023px)"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#101010] text-[#E8E2D9] font-sans">
        {children}
      </body>
    </html>
  );
}
