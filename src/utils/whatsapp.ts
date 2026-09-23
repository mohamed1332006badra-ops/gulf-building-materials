const PRIMARY_PHONE = "96566379895";
const SECONDARY_PHONE = "96595594085";

export function formatWhatsAppUrl(message: string, phone: string = PRIMARY_PHONE): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function generateProductInquiry(name: string, sku: string, priceText: string): string {
  return `السلام عليكم،
أرغب بالاستفسار عن توفر المادة التالية من شركة مواد بناء الخليج:

▫️ المادة: ${name}
▫️ الكود: ${sku || "غير مدون"}
▫️ السعر الحالي: ${priceText}

يرجى تأكيد التوفر وإمكانية التوريد بالقسيمة بالشويخ/الموقع.`;
}

export function generateCartOrderMessage(
  items: Array<{ name: string; qty: number; unit: string; price: number | null }>,
  clientName: string,
  deliveryArea: string
): string {
  let grandTotal = 0;
  let hasDynamic = false;

  const list = items.map((i, idx) => {
    if (i.price !== null) {
      const sub = i.price * i.qty;
      grandTotal += sub;
      return `${idx + 1}. *${i.name}*\n   الكمية: ${i.qty} (${i.unit}) | السعر: ${sub.toFixed(3)} د.ك`;
    } else {
      hasDynamic = true;
      return `${idx + 1}. *${i.name}*\n   الكمية: ${i.qty} (${i.unit}) | السعر عند الطلب`;
    }
  }).join("\n\n");

  const totalText = hasDynamic
    ? `الإجمالي التقديري: ${grandTotal.toFixed(3)} د.ك (+ مواد تسعير كميات)`
    : `الإجمالي: ${grandTotal.toFixed(3)} د.ك`;

  return `*طلب توريد مواد بناء - مواد بناء الخليج* 🏗️
-----------------------------------
👤 *العميل / المقاول:* ${clientName || "عميل محترم"}
📍 *الموقع / القسيمة:* ${deliveryArea || "الشويخ الصناعية / يرجى التنسيق"}
-----------------------------------
📋 *قائمة المواد:*
${list}
-----------------------------------
💰 *${totalText}*
-----------------------------------
يرجى تأكيد موعد تجهيز الشحنة والتوصيل.`;
}
