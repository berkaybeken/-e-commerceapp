'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishCtx = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('wishlist');
      if (s) setIds(JSON.parse(s) || []);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(ids));
    } catch {}
  }, [ids]);

  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const remove = (id) => setIds((prev) => prev.filter((x) => x !== id));

  const clear = () => setIds([]);

  const has = (id) => ids.includes(id);

  const value = useMemo(() => ({ ids, toggle, remove, clear, has }), [ids]);

  return <WishCtx.Provider value={value}>{children}</WishCtx.Provider>;
}

export const useWishlist = () => useContext(WishCtx);
