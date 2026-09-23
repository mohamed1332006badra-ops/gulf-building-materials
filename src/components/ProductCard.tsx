"use client";
import React, { useState } from "react";
import { DbProduct } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { formatWhatsAppUrl, generateProductInquiry } from "@/utils/whatsapp";

export default function ProductCard({ product }: { product: DbProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const priceFormatted = product.price !== null ? `${product.price.toFixed(3)} د.ك` : "السعر عند الطلب";
  const inquiryUrl = formatWhatsAppUrl(generateProductInquiry(product.name_ar, product.sku, priceFormatted));

  return (
    <div className="bg-industrial-900 border border-industrial-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-industrial-700 transition group shadow-sm">
      <div>
        <div className="relative h-44 bg-industrial-950 overflow-hidden">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"}
            alt={product.name_ar}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          <span className="absolute top-2.5 right-2.5 bg-industrial-950/80 backdrop-blur border border-industrial-800 text-safety-amber text-[10px] font-bold px-2 py-0.5 rounded">
            {product.category_slug}
          </span>
          {product.is_best_seller && (
            <span className="absolute bottom-2.5 right-2.5 bg-safety-dark text-white text-[10px] font-black px-2 py-0.5 rounded">
              الأكثر طلباً
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="text-[10px] text-slate-500 font-mono mb-1">
            كود: {product.sku || "—"} {product.brand ? `· ${product.brand}` : ""}
          </div>
          <h3 className="font-bold text-sm text-white leading-snug mb-1">{product.name_ar}</h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.description_ar || "مواد مطابقة للمواصفات الإنشائية القياسية بدولة الكويت."}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="pt-2 border-t border-industrial-800/80 mb-3 flex items-baseline justify-between">
          <div>
            {product.price !== null ? (
              <span className="text-base font-black text-safety-amber">
                {product.price.toFixed(3)} <span className="text-xs text-slate-400">د.ك</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-safety-amber">السعر عند الطلب</span>
            )}
          </div>
          <span className="text-[11px] text-slate-500">/ {product.unit} {product.size ? `(${product.size})` : ""}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              added ? "bg-emerald-600 text-white" : "bg-industrial-800 hover:bg-industrial-700 text-white"
            }`}
          >
            <span>{added ? "تمت الإضافة!" : "أضف للسلة"}</span>
          </button>

          <a
            href={inquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-wa/15 hover:bg-wa/25 text-wa border border-wa/30 py-2 px-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1"
          >
            <span>واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
}
