"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DbProduct } from "@/lib/supabase";

export interface CartItem {
  product: DbProduct;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: DbProduct, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gulf_cart_v2");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("gulf_cart_v2", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: DbProduct, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
