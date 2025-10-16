'use client';
import { useCart } from '../../../context/CartContext';
import { useI18n } from '../../I18nProvider';

export default function AddToCart({ product }) {
  const { add } = useCart();
  const { t } = useI18n();
  return (
    <button onClick={() => add(product)} className="btn-primary px-5 py-2 rounded-xl">
      {t('product.addToCart')}
    </button>
  );
}
