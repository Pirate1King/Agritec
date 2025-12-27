'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const { items } = useCartStore();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link href="/dat-hang" className="relative inline-flex items-center rounded-full px-3 py-2 text-slate-700 hover:bg-surface-light">
      <div className="relative">
        <ShoppingCart className="h-5 w-5 text-brand-blue" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}
