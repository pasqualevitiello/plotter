import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "../public/fonts/CalSansVF.woff2", style: "normal" },
    { path: "../public/fonts/CalSansVF-Italic.woff2", style: "italic" },
  ],
  display: "swap",
  variable: "--font-sans",
  weight: "400 700",
});
const mono = localFont({
  src: "../public/fonts/PaperMono-Regular.woff2",
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Plotter — A language for drawing",
    template: "%s — Plotter",
  },
  description:
    "Editable construction illustrations. A shared visual grammar, drawing and animation skills, and a collection of precise ideas.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} bg-neutral-50 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
