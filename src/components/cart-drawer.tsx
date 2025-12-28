"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, clear } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={close} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition">
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-brand-blue">
            <ShoppingCart className="h-5 w-5" />
            Giỏ hàng
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            {items.length > 0 && (
              <button onClick={clear} className="hover:text-brand-blue">
                Xóa hết
              </button>
            )}
            <button onClick={close} aria-label="Đóng giỏ" className="rounded-full p-1 hover:bg-surface-light">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-center text-slate-600">Chưa có sản phẩm nào.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 rounded-2xl border border-surface-border p-3 shadow-sm">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-surface-light">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-500">No image</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-brand-blue">{item.name}</p>
                    {item.unit && <p className="text-xs text-slate-500">Đơn vị: {item.unit}</p>}
                    {item.price != null && <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.price)}</p>}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-surface-border">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="grid h-8 w-8 place-items-center text-slate-700 hover:text-brand-blue"
                          aria-label="Giảm"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[32px] text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="grid h-8 w-8 place-items-center text-slate-700 hover:text-brand-blue"
                          aria-label="Tăng"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label="Xóa"
                        className="text-slate-500 transition hover:text-brand-orange"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-surface-border p-5">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Tạm tính</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" asChild onClick={close}>
              <Link href="/dat-hang">Xem giỏ</Link>
            </Button>
            <Button variant="accent" className="flex-1" asChild onClick={close}>
              <Link href="/dat-hang">Đặt hàng</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
