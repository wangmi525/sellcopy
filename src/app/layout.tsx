import type { Metadata } from "next";
import "./globals.css";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "SellCopy.ai - AI Product Descriptions That Sell",
  description: "Generate SEO-optimized product listings for Amazon, Shopify, and Etsy in seconds.",
  openGraph: { title: "SellCopy.ai", description: "AI-Powered Product Descriptions for E-commerce", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Inter'] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
