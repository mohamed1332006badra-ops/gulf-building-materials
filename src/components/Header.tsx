"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-industrial-950/95 backdrop-blur border-b border-industrial-800 text-slate-100">
      {/* Top Banner */}
      <div className="bg-industrial-900 border-b border-industrial-800 text-[11px] py-1.5 px-4 text-slate-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-safety-amber font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            مستودعات الشويخ الصناعية: جاهزون للتوريد الموقعي الفوري
          </span>
          <div className="flex items-center gap-4 font-semibold text-slate-300" style={{ direction: "ltr" }}>
            <a href="tel:66379895" className="hover:text-safety-amber transition">📞 66379895</a>
            <span>/</span>
            <a href="tel:95594085" className="hover:text-safety-amber transition">📞 95594085</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-safety-amber text-industrial-950 flex items-center justify-center font-black text-xl shadow-lg shadow-safety-amber/20">
            🏗️
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-white block">مواد بناء الخليج</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">الشويخ الصناعية – الكويت</span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300">
          <Link href="/" className="hover:text-safety-amber transition">الرئيسية</Link>
          <Link href="/products" className="hover:text-safety-amber transition">كتالوج المواد</Link>
          <Link href="/#categories" className="hover:text-safety-amber transition">الأقسام الإنشائية</Link>
          <Link href="/#quote" className="hover:text-safety-amber transition">طلب تسعير</Link>
          <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition">لوحة الإدارة 🔒</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/96566379895"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition"
          >
            <span>واتساب المبيعات</span>
          </a>

          <Link
            href="/cart"
            className="relative bg-industrial-900 hover:bg-industrial-800 border border-industrial-700 p-2.5 rounded-xl transition text-white flex items-center"
          >
            <span className="text-lg">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-safety-amber text-industrial-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 text-xl"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-900 border-t border-industrial-800 px-6 py-4 space-y-3 text-xs font-bold">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200">الرئيسية</Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200">المنتجات والمواد</Link>
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200">سلة الطلبات</Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-400">لوحة الإدارة 🔒</Link>
        </div>
      )}
    </header>
  );
}
