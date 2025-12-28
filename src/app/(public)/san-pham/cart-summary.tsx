'use client';

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartSummary() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-soft text-sm text-slate-600">
        Chưa có sản phẩm nào.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-blue">Giỏ hàng tóm tắt</p>
        <span className="text-xs text-slate-500">{items.length} SP</span>
      </div>

      <div className="mt-3 space-y-3 text-sm text-slate-700">
        {items.map((item) => (
          <div key={item.productId} className="rounded-xl border border-surface-border p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                {item.unit && <p className="text-xs text-slate-500">Đơn vị: {item.unit}</p>}
              </div>
              <button className="text-xs text-brand-orange" onClick={() => removeItem(item.productId)} title="Xóa">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span>{item.price != null ? formatCurrency(item.price) : "Đang cập nhật"}</span>
              <div className="flex items-center gap-2">
                <span>SL</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                  className="h-8 w-14 rounded-lg border border-surface-border px-2 text-right"
                />
              </div>
            </div>

            {item.children && item.children.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setOpenDetails((prev) => ({ ...prev, [item.productId]: !prev[item.productId] }))}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-blue"
                >
                  {openDetails[item.productId] ? (
                    <>
                      <ChevronDown className="h-3 w-3" /> Ẩn
                    </>
                  ) : (
                    <>
                      <ChevronRight className="h-3 w-3" /> Chi tiết
                    </>
                  )}
                </button>
                {openDetails[item.productId] && (
                  <div className="mt-2 space-y-1 rounded-lg bg-surface-light px-3 py-2 text-xs text-slate-700">
                    {item.children.map((child, idx) => (
                      <div key={`${item.productId}-child-${idx}`} className="flex items-center justify-between">
                        <span>
                          {child.name} × {child.quantity || 1}
                        </span>
                        {child.price != null && <span>{formatCurrency(child.price)}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
    </div>
  );
}
