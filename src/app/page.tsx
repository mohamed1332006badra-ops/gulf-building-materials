import React from "react";
import Link from "next/link";
import { supabase, DbProduct, CATEGORIES_LIST } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

async function getFeaturedProducts(): Promise<DbProduct[]> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(8);
  return data || [];
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-industrial-800 bg-gradient-to-b from-industrial-900 via-industrial-950 to-industrial-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-800/80 border border-safety-amber/40 text-safety-amber text-xs font-bold mb-6">
              <span>📍 المركز المعتمد لمقاولي وأصحاب القسائم – الشويخ الصناعية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              توريد مباشر لجميع <span className="text-safety-amber">مواد البناء والعزل</span> في الكويت
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8 max-w-2xl">
              نوفر منظومة توريد متكاملة للمشاريع السكنية والتجارية: حديد تسليح، أسمنت بورتلاند ومقاوم، طابوق، لواصق سيراميك، وأقوى عوازل الأسطح، مع تسعير وطلب مباشر عبر الواتساب.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/products" className="bg-safety-amber hover:bg-safety-dark text-industrial-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition">
                تصفح الكتالوج الشامل
              </Link>
              <a
                href="https://wa.me/96566379895"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-wa hover:bg-wa-dark text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition"
              >
                طلب تسعير مباشر عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-14 bg-industrial-950 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-safety-amber block mb-1">الكتالوج الإنشائي</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">الأقسام الإنشائية الرئيسية</h2>
            </div>
            <Link href="/products" className="text-xs text-slate-400 hover:text-white font-bold">
              عرض كافة الأقسام ←
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES_LIST.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="bg-industrial-900 border border-industrial-800 hover:border-safety-amber p-4 rounded-xl text-center transition group flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-industrial-800 group-hover:bg-safety-amber group-hover:text-industrial-950 text-white flex items-center justify-center text-xl transition">
                  🏗️
                </div>
                <strong className="text-xs text-white group-hover:text-safety-amber transition block">{c.nameAr}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 bg-industrial-900/60 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-safety-amber block mb-1">مستودع الشويخ</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">منتجات ومواد مختارة</h2>
            </div>
            <Link href="/products" className="text-xs text-safety-amber hover:underline font-bold">
              عرض كل المنتجات ({featured.length})
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="bg-industrial-900 border border-industrial-800 p-12 text-center rounded-2xl">
              <p className="text-xs text-slate-400 mb-2">لا توجد منتجات مميزة بعد</p>
              <p className="text-[11px] text-slate-500">أضف منتجات من لوحة الإدارة وفعّل خيار &quot;مميز&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-14 bg-industrial-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black text-white mb-2">طلب تسعير كميات ومشاريع</h2>
          <p className="text-xs text-slate-400 mb-8">أرسل لنا بيانات مشروعك وسيقوم مسؤول المبيعات بالتواصل معك فوراً عبر الواتساب</p>

          <div className="bg-industrial-900 border border-industrial-800 p-6 sm:p-8 rounded-2xl text-right">
            <a
              href="https://wa.me/96566379895?text=السلام%20عليكم%20معي%20مخطط%20قسيمة%20وأريد%20تسعير%20مواد%20بناء"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-wa hover:bg-wa-dark text-slate-950 font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <span>فتح محادثة مبيعات المشاريع المباشرة بالواتساب</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
