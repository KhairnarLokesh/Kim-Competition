"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isBoxHomeEnabled: boolean;
  setIsBoxHomeEnabled: (val: boolean) => void;
  packagingFee: number;
  shippingFee: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  isBoxHomeEnabled: false,
  setIsBoxHomeEnabled: () => {},
  packagingFee: 0,
  shippingFee: 0,
  totalAmount: 0,
});

const CART_STORAGE_KEY = "kumbh_local_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBoxHomeEnabled, setIsBoxHomeEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Cart storage load failed:", e);
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error("Cart storage save failed:", e);
    }
  };

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const existingIndex = items.findIndex((i) => i.listingId === item.listingId);
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      saveItems(updated);
    } else {
      saveItems([...items, { ...item, quantity }]);
    }
  };

  const removeItem = (id: string) => {
    saveItems(items.filter((i) => i.id !== id && i.listingId !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.id === id || item.listingId === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
    setIsBoxHomeEnabled(false);
  };

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Nashik Box Home packaging & city-consolidated delivery fee
  const packagingFee = isBoxHomeEnabled ? 90 : 0;
  const shippingFee = isBoxHomeEnabled ? 120 : 0;
  const totalAmount = subtotal + packagingFee + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isBoxHomeEnabled,
        setIsBoxHomeEnabled,
        packagingFee,
        shippingFee,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
