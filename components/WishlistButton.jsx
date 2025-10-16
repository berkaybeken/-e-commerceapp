'use client';
import { useWishlist } from '../context/WishlistContext';

function Heart({ filled, className }) {
  return filled ? (
    <svg viewBox="0 0 24 24" className={className}><path d="M12 21s-9-4.78-9-12a4.5 4.5 0 018.34-2.625c.43-.78 1.24-1.875 3.32-1.875A4.5 4.5 0 1121 9c0 7.22-9 12-9 12z"/></svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className}><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M21 8.25c0-2.485-2.086-4.5-4.66-4.5-1.86 0-3.487 1.065-4.34 2.625C11.147 4.815 9.52 3.75 7.66 3.75 5.086 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
  );
}

export default function WishlistButton({ productId, className = '' }) {
  const { ids, toggle } = useWishlist();
  const wished = ids.includes(productId);
  return (
    <button
      onClick={() => toggle(productId)}
      aria-label="Wishlist"
      className={`icon-btn ${wished ? 'active' : ''} ${className}`}
    >
      <Heart filled={wished} className="w-5 h-5" />
    </button>
  );
}
