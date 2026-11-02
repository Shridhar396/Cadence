import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "CADENCE — Pure Sound | Architectural Acoustic Headphone",
  description:
    "Experience Cadence: A triumph of precision acoustic engineering, vapor-deposited titanium drivers, and aerospace structural metallurgy.",
  keywords: ["Cadence", "Cadence Headphone", "Audiophile", "Pure Sound", "Titanium Drivers", "Lossless Audio"],
  authors: [{ name: "Cadence Acoustics" }],
  openGraph: {
    title: "CADENCE — Pure Sound",
    description: "Architectural acoustic deconstruction. Hear everything.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#050505]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-white/90 antialiased selection:bg-white/20 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
