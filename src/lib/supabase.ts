import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vsniagohylehdwygceco.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_emm3Q8Qk8pgmfRWSRYu5JA_CItqXzgY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbProduct {
  id: string;
  name_ar: string;
  name_en: string;
  category_slug: string;
  brand: string;
  sku: string;
  description_ar: string;
  price: number | null;
  unit: string;
  size: string;
  image_url: string;
  is_featured: boolean;
  is_best_seller: boolean;
  in_stock: boolean;
  created_at?: string;
}

export const CATEGORIES_LIST = [
  { id: "black-structure", slug: "black-structure", nameAr: "الهيكل الأسود", nameEn: "Black Structure" },
  { id: "plaster", slug: "plaster", nameAr: "المساح والطرطشة", nameEn: "Plastering" },
  { id: "paints", slug: "paints", nameAr: "الأصباغ والدهانات", nameEn: "Paints" },
  { id: "adhesives-ceramics", slug: "adhesives-ceramics", nameAr: "الأواصق والسيراميك", nameEn: "Adhesives & Ceramics" },
  { id: "insulation", slug: "insulation", nameAr: "مواد العزل", nameEn: "Insulation" },
  { id: "tools-equipment", slug: "tools-equipment", nameAr: "العدد والأدوات", nameEn: "Tools & Equipment" },
];
