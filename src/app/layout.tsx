import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Journ-ai",
  description: "A POC for journalists to develop articles helped by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[50vh] w-auto flex flex-col p-6`}
      >
        <main className="flex flex-col gap-8 mx-auto font-[family-name:var(--font-geist-sans)">
          <Link href="/" className="p-2 border-2 w-min rounded text-sm absolute left-72 top-[1.48rem]">Home</Link>
          {children}
        </main>
      </body>
    </html>
  );
}
