import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radha Krishna Enterprises Jewels | Premium Jewellery in Mumbai",
  description:
    "Discover exquisite gold, diamond and bridal jewellery crafted with passion and timeless Indian artistry. BIS Hallmarked. Certified Diamonds. Lifetime Support.",
  keywords:
    "gold jewellery, diamond jewellery, bridal jewellery, Mumbai, Mira Road, 22K gold, engagement rings",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
