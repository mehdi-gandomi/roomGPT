import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";

let title = "Dream Room Generator";
let description = "Generate your dream room in seconds.";
let ogimage = "/icon.png";
let sitename = "Bazar3D Design";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://roomgpt-demo.vercel.app",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="//image.bazar360.net/image-map-pro.min.js"></script>
      </head>
      <body className="bg-[#17181C] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
