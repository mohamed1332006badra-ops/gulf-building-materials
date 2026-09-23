import React from "react";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مواد بناء الخليج | الشويخ الصناعية – الكويت",
  description: "المركز المتخصص لتوريد مواد البناء والتشطيب والعزل ومستلزمات الهيكل الأسود في الكويت.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="bg-industrial-950 text-slate-100 min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
