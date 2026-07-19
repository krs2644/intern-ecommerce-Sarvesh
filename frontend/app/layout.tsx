import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {SearchProvider} from "@/context/SearchContext";
import {AuthProvider} from "@/context/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopify",
  description: "Shop Electronics, Fashion, Furniture and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white">
        <AuthProvider>
          <SearchProvider>
            <Navbar />
            {children}
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
