'use client';

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const { items, toggle } = useCartStore();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative inline-flex items-center rounded-full px-3 py-2 text-slate-700 hover:bg-surface-light"
      aria-label="Mở giỏ hàng"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5 text-brand-blue" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white">
            {count}
          </span>
        )}
      </div>
    </button>
  );
}
