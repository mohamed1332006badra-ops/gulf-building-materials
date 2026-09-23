"use client";
import React, { useState, useEffect } from "react";
import { supabase, DbProduct, CATEGORIES_LIST } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<DbProduct | null>(null);

  const [form, setForm] = useState({
    name_ar: "",
    name_en: "",
    category_slug: "black-structure",
    brand: "",
    sku: "",
    description_ar: "",
    price: "",
    unit: "كيس",
    size: "",
    image_url: "",
    is_featured: false,
    is_best_seller: false,
    in_stock: true,
  });

  const ADMIN_PIN = "66379895";

  useEffect(() => {
    if (sessionStorage.getItem("gulf_admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("gulf_admin_auth", "true");
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setError(true);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  }

  function openAdd() {
    setEditProduct(null);
    setForm({
      name_ar: "",
      name_en: "",
      category_slug: "black-structure",
      brand: "",
      sku: "",
      description_ar: "",
      price: "",
      unit: "كيس",
      size: "",
      image_url: "",
      is_featured: false,
      is_best_seller: false,
      in_stock: true,
    });
    setModalOpen(true);
  }

  function openEdit(p: DbProduct) {
    setEditProduct(p);
    setForm({
      name_ar: p.name_ar,
      name_en: p.name_en || "",
      category_slug: p.category_slug,
      brand: p.brand || "",
      sku: p.sku || "",
      description_ar: p.description_ar || "",
      price: p.price !== null ? p.price.toString() : "",
      unit: p.unit || "كيس",
      size: p.size || "",
      image_url: p.image_url || "",
      is_featured: p.is_featured,
      is_best_seller: p.is_best_seller,
      in_stock: p.in_stock,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name_ar: form.name_ar,
      name_en: form.name_en || form.name_ar,
      category_slug: form.category_slug,
      brand: form.brand,
      sku: form.sku,
      description_ar: form.description_ar,
      price: form.price ? parseFloat(form.price) : null,
      unit: form.unit,
      size: form.size,
      image_url: form.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
      is_featured: form.is_featured,
      is_best_seller: form.is_best_seller,
      in_stock: form.in_stock,
    };

    if (editProduct) {
      await supabase.from("products").update(payload).eq("id", editProduct.id);
    } else {
      await supabase.from("products").insert([payload]);
    }
    setModalOpen(false);
    fetchProducts();
  }

  async function handleDelete(id: string, name: string) {
    if (confirm(`حذف المادة: ${name}؟`)) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <form onSubmit={handleAuth} className="bg-industrial-900 border border-industrial-800 p-8 rounded-2xl max-w-sm w-full text-center">
          <span className="text-3xl block mb-2">🛡️</span>
          <h2 className="text-base font-bold text-white mb-2">تسجيل دخول الإدارة</h2>
          <p className="text-xs text-slate-400 mb-4">أدخل رمز المرور للتحكم في مواد بناء الخليج</p>
          <input
            type="password"
            placeholder="الرمز الافتراضي: 66379895"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full text-center px-4 py-2.5 bg-industrial-950 border border-industrial-800 rounded-xl text-white text-xs mb-3 focus:outline-none focus:border-safety-amber"
          />
          {error && <p className="text-xs text-red-400 mb-3">الرمز غير صحيح</p>}
          <button type="submit" className="w-full bg-safety-amber text-slate-950 font-black py-2.5 rounded-xl text-xs">
            دخول للوحة
          </button>
        </form>
      </div>
    );
  }

  const filtered = products.filter(
    (p) =>
      p.name_ar.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black text-white">إدارة مواد البناء والمستودع</h1>
          <p className="text-xs text-slate-400">إضافة وتعديل الأسعار والمخزون في Supabase</p>
        </div>
        <button onClick={openAdd} className="bg-safety-amber text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs">
          + إضافة مادة / أداة جديدة
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="بحث بالاسم أو الكود..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-3 py-2 bg-industrial-900 border border-industrial-800 rounded-xl text-xs text-white focus:outline-none focus:border-safety-amber"
        />
      </div>

      <div className="bg-industrial-900 border border-industrial-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">تحميل البيانات...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-industrial-950 text-slate-400 border-b border-industrial-800">
                <tr>
                  <th className="p-3">المادة</th>
                  <th className="p-3">القسم</th>
                  <th className="p-3">السعر</th>
                  <th className="p-3">الوحدة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-industrial-800/40">
                    <td className="p-3">
                      <div className="font-bold text-white">{p.name_ar}</div>
                      <div className="text-[10px] text-slate-500 font-mono">كود: {p.sku || "—"}</div>
                    </td>
                    <td className="p-3 text-slate-300">{p.category_slug}</td>
                    <td className="p-3 font-bold text-safety-amber">{p.price !== null ? `${p.price.toFixed(3)} د.ك` : "عند الطلب"}</td>
                    <td className="p-3 text-slate-400">{p.unit}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(p)} className="bg-industrial-800 hover:bg-industrial-700 px-2 py-1 rounded text-slate-200">
                          تعديل
                        </button>
                        <button onClick={() => handleDelete(p.id, p.name_ar)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-1 rounded">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">لا توجد نتائج</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-industrial-900 border border-industrial-800 p-6 rounded-2xl max-w-lg w-full text-xs space-y-3 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-sm text-white mb-2">{editProduct ? "تعديل مادة" : "إضافة مادة جديدة"}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">اسم المادة بالعربي *</label>
                <input
                  required
                  type="text"
                  value={form.name_ar}
                  onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">وصف المادة</label>
                <textarea
                  rows={2}
                  value={form.description_ar}
                  onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">القسم *</label>
                  <select
                    value={form.category_slug}
                    onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
                    className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.id} value={c.slug}>{c.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">السعر بالدينار (فارغ = عند الطلب)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">وحدة البيع (كيس، طن، رول...)</label>
                  <input
                    type="text"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">الكود (SKU)</label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">العلامة التجارية</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رابط الصورة (Image URL)</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-800 rounded-lg text-white"
                  style={{ direction: "ltr", textAlign: "left" }}
                />
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="rounded"
                  />
                  منتج مميز
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_best_seller}
                    onChange={(e) => setForm({ ...form, is_best_seller: e.target.checked })}
                    className="rounded"
                  />
                  الأكثر طلباً
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.in_stock}
                    onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                    className="rounded"
                  />
                  متوفر
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-2 bg-industrial-800 rounded-lg text-slate-300">
                  إلغاء
                </button>
                <button type="submit" className="px-4 py-2 bg-safety-amber text-slate-950 font-black rounded-lg">
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
