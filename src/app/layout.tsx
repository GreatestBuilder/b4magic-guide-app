import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

import type { Metadata } from "next";

import localFont from "next/font/local";
import Providers from "../components/Providers";
import Headers from "@/components/Presentations/Headers";

export const metadata: Metadata = {
  title: "B4 Magic Guide",
  description: "Nothing is random,  everything is for granted",
  openGraph: {
    images: "/logo/LOGO-MIN.png",
  },
  icons: "/logo/LOGO-MIN.png",
};

const valky = localFont({
  src: [
    {
      path: "../../public/fonts/Valky-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Valky-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Valky-Semibold.otf",
      weight: "500",
      style: "normal",
    },

    {
      path: "../../public/fonts/Valky-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-valky",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={valky.className}>
        <Providers>
          <main className="bg-app">
            <Headers />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
