'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('cart');
      if (s) setItems(JSON.parse(s) || []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (p) =>
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], quantity: copy[i].quantity + 1 };
        return copy;
        }
      return [
        ...prev,
        { id: p.id, title: p.title, price: Number(p.price) || 0, quantity: 1, image: p.image },
      ];
    });

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  const setQty = (id, q) =>
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, Number(q) || 1) } : x)),
    );

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((a, i) => a + (Number(i.price) || 0) * (Number(i.quantity) || 0), 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((a, i) => a + (Number(i.quantity) || 0), 0),
    [items],
  );

  const isInCart = (id) => items.some((x) => x.id === id);

  const value = useMemo(
    () => ({ items, add, remove, setQty, clear, total, count, isInCart }),
    [items, total, count],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
