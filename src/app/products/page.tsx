import React, { Suspense } from "react";
import ProductsClient from "./components/ProductsClient";

export const metadata = {
  title: "الكتالوج الإنشائي | مواد بناء الخليج – الشويخ",
  description: "تصفح كافة مواد البناء والأسمنت والحديد والعوازل ولواصق السيراميك.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">جاري تحميل المنتجات...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
