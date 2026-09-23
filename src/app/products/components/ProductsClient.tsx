"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { supabase, DbProduct, CATEGORIES_LIST } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCat === "all" || p.category_slug === selectedCat;
      const matchSearch =
        !searchVal.trim() ||
        p.name_ar.toLowerCase().includes(searchVal.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchVal.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(searchVal.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCat, searchVal]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-2">الكتالوج الإنشائي والتوريدي</h1>
        <p className="text-xs text-slate-400 mb-6">تصفح كافة المواد المسجلة أو استخدم الفلاتر للوصول السريع</p>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs mb-4" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
              selectedCat === "all" ? "bg-safety-amber text-slate-950" : "bg-industrial-900 text-slate-300 border border-industrial-800"
            }`}
          >
            كل المواد ({products.length})
          </button>
          {CATEGORIES_LIST.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                selectedCat === c.slug ? "bg-safety-amber text-slate-950" : "bg-industrial-900 text-slate-300 border border-industrial-800"
              }`}
            >
              {c.nameAr}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="ابحث عن مادة، أسمنت، كود..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-4 py-2.5 bg-industrial-900 border border-industrial-800 rounded-xl text-xs text-white focus:outline-none focus:border-safety-amber"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-xs text-slate-400">جاري جلب المواد من قاعدة البيانات...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-industrial-900 border border-industrial-800 p-12 text-center rounded-2xl max-w-sm mx-auto">
          <p className="text-xs text-slate-400 mb-3">لا توجد مواد مطابقة للبحث</p>
          <button
            onClick={() => { setSelectedCat("all"); setSearchVal(""); }}
            className="text-xs bg-industrial-800 text-white px-3 py-1.5 rounded-lg"
          >
            إلغاء الفلترة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
