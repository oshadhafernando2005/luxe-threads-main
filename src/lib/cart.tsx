import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartLine = {
  id: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  favorites: string[];
  add: (product: Product, size: string, color: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleFavorite: (productId: string) => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "lumen-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setLines(parsed.lines ?? []);
        setFavorites(parsed.favorites ?? []);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, favorites }));
    } catch {
      /* ignore */
    }
  }, [lines, favorites]);

  const add = useCallback((product: Product, size: string, color: string) => {
    const id = `${product.id}__${size}__${color}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, productId: product.id, size, color, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => setLines((p) => p.filter((l) => l.id !== id)), []);

  const setQty = useCallback(
    (id: string, qty: number) =>
      setLines((p) => (qty <= 0 ? p.filter((l) => l.id !== id) : p.map((l) => (l.id === id ? { ...l, qty } : l)))),
    [],
  );

  const toggleFavorite = useCallback(
    (productId: string) =>
      setFavorites((p) => (p.includes(productId) ? p.filter((x) => x !== productId) : [...p, productId])),
    [],
  );

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => {
      const p = products.find((x) => x.id === l.productId);
      return s + (p ? p.price * l.qty : 0);
    }, 0);
    return { lines, favorites, add, remove, setQty, toggleFavorite, count, subtotal };
  }, [lines, favorites, add, remove, setQty, toggleFavorite]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
