'use client';

import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartSummary() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-blue">Giỏ hàng tạm</p>
        <span className="text-xs text-slate-500">{items.length} SP</span>
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Chưa có sản phẩm.</p>
      ) : (
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <div key={item.productId} className="rounded-xl border border-surface-border p-3">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900">{item.name}</span>
                <button className="text-xs text-brand-orange" onClick={() => removeItem(item.productId)}>
                  Xóa
                </button>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>{formatCurrency(item.price)}</span>
                <div className="flex items-center gap-2">
                  <span>SL</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                    className="h-8 w-14 rounded-lg border border-surface-border px-2"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-surface-border pt-2 text-sm font-semibold text-slate-900">
            <span>Tổng</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button asChild variant="accent" size="sm" className="w-full">
            <Link href="/dat-hang">Đi đến đặt hàng</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
