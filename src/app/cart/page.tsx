"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatWhatsAppUrl, generateCartOrderMessage } from "@/utils/whatsapp";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCart();
  const [clientName, setClientName] = useState("");
  const [area, setArea] = useState("");
  const [phoneLine, setPhoneLine] = useState("96566379895");

  const grandTotal = items.reduce((sum, i) => sum + ((i.product.price || 0) * i.qty), 0);

  function handleSendOrder() {
    if (items.length === 0) return;
    const payloadItems = items.map((i) => ({
      name: i.product.name_ar,
      qty: i.qty,
      unit: i.product.unit,
      price: i.product.price,
    }));
    const message = generateCartOrderMessage(payloadItems, clientName, area);
    window.open(formatWhatsAppUrl(message, phoneLine), "_blank");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-industrial-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">سلة طلبات المواد</h1>
          <p className="text-xs text-slate-400 mt-1">تجهيز وإرسال الطلبية مباشرة لمسؤولي مبيعات الشويخ</p>
        </div>
        {items.length > 0 && (
          <button onClick={clearCart} className="text-xs text-red-400 hover:underline">تفريغ السلة</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-12 text-center max-w-sm mx-auto">
          <span className="text-4xl block mb-2">🛒</span>
          <p className="text-sm font-bold text-white mb-1">سلتك فارغة</p>
          <p className="text-xs text-slate-400 mb-6">لم تضف مواد أو عدد للبناء بعد</p>
          <Link href="/products" className="bg-safety-amber text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs inline-block">
            تصفح الكتالوج الإنشائي
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-3">
            {items.map((i) => (
              <div key={i.product.id} className="bg-industrial-900 border border-industrial-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{i.product.name_ar}</h4>
                  <div className="text-[11px] text-safety-amber font-mono mt-0.5">
                    {i.product.price ? `${(i.product.price * i.qty).toFixed(3)} د.ك` : "السعر عند الطلب"}
                    <span className="text-slate-500 mr-1">({i.product.unit})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-industrial-950 border border-industrial-800 rounded-lg p-1">
                  <button onClick={() => updateQty(i.product.id, i.qty - 1)} className="w-6 h-6 text-xs text-slate-400 hover:text-white">−</button>
                  <span className="w-6 text-center text-xs font-bold text-white">{i.qty}</span>
                  <button onClick={() => updateQty(i.product.id, i.qty + 1)} className="w-6 h-6 text-xs text-slate-400 hover:text-white">+</button>
                </div>

                <button onClick={() => removeItem(i.product.id)} className="text-slate-500 hover:text-red-400 text-xs">✕</button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 bg-industrial-900 border border-industrial-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-baseline border-b border-industrial-800 pb-3">
              <span className="text-xs text-slate-400 font-bold">الإجمالي التقديري:</span>
              <span className="text-xl font-black text-safety-amber">{grandTotal.toFixed(3)} د.ك</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">اسم المقاول / العميل:</label>
                <input
                  type="text"
                  placeholder="مثال: فهد المطيري"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-xl text-white focus:outline-none focus:border-safety-amber"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المنطقة / القسيمة بالكويت:</label>
                <input
                  type="text"
                  placeholder="مثال: غرب عبدالله المبارك ق 2"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-xl text-white focus:outline-none focus:border-safety-amber"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">إرسال الطلب إلى خط مبيعات:</label>
                <select
                  value={phoneLine}
                  onChange={(e) => setPhoneLine(e.target.value)}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-xl text-white focus:outline-none"
                >
                  <option value="96566379895">خط مبيعات 1: 66379895 (مشاريع وهيكل)</option>
                  <option value="96595594085">خط مبيعات 2: 95594085 (عوازل وتشطيب)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSendOrder}
              className="w-full bg-wa hover:bg-wa-dark text-slate-950 font-black py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>إرسال الطلب بالكامل عبر WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
