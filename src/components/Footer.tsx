import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-industrial-950 text-slate-400 text-xs border-t border-industrial-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏗️</span>
              <strong className="text-white text-base">مواد بناء الخليج</strong>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              توريد مباشر لجميع مواد البناء والتشطيب والعوازل المعتمدة بدولة الكويت. نلبي متطلبات القسائم وشركات المقاولات بأعلى معايير المطابقة.
            </p>
            <span className="text-safety-amber font-bold">📍 الشويخ الصناعية – دولة الكويت</span>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">الأقسام الإنشائية</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=black-structure" className="hover:text-white">الهيكل الأسود والحديد</Link></li>
              <li><Link href="/products?category=plaster" className="hover:text-white">المساح والطرطشة</Link></li>
              <li><Link href="/products?category=paints" className="hover:text-white">الأصباغ والمعاجين</Link></li>
              <li><Link href="/products?category=adhesives-ceramics" className="hover:text-white">الأواصق والسيراميك</Link></li>
              <li><Link href="/products?category=insulation" className="hover:text-white">مواد العزل المائي والحراري</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">الاتصال والتوريد الموقعي</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>هاتف المبيعات 1:</span>
                <a href="tel:66379895" className="font-bold text-white" style={{ direction: "ltr" }}>66379895</a>
              </div>
              <div className="flex items-center gap-2">
                <span>هاتف المبيعات 2:</span>
                <a href="tel:95594085" className="font-bold text-white" style={{ direction: "ltr" }}>95594085</a>
              </div>
              <p className="text-slate-500 text-[11px] pt-1">السبت – الخميس: 6:00 ص – 8:00 م</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">الطلبات الفورية</h4>
            <p className="text-slate-400 mb-3 leading-relaxed">
              أرسل لستة المواد أو المخطط وسيقوم مسؤولو المبيعات بتجهيز التسعير الفوري:
            </p>
            <a
              href="https://wa.me/96566379895?text=السلام%20عليكم%20معي%20لستة%20مواد%20بناء%20وأريد%20تسعيرها"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-wa hover:bg-wa-dark text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <span>إرسال قائمة المواد بالواتساب</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500 text-[11px]">
          <p>© 2026 مواد بناء الخليج. جميع الحقوق محفوظة.</p>
          <p>الشويخ الصناعية – دولة الكويت 🇰🇼</p>
        </div>
      </div>
    </footer>
  );
}
