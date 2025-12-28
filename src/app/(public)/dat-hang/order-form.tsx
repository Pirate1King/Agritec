"use client";

import { submitOrder } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { useCartStore, type CartItem } from "@/store/cart-store";
import { useEffect, useState, useTransition } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";

type Props = {
  prefillItems: CartItem[];
};

export default function OrderForm({ prefillItems }: Props) {
  const { items, setItems, addItem, updateQuantity, removeItem, clear } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment_method: "cod" as "cod" | "bank_transfer"
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const supabase = getBrowserSupabaseClient();

  useEffect(() => {
    const fetchOptions = async () => {
      if (!supabase) return;
      const { data } = await supabase.from("products").select("id,name,price,unit").order("created_at", { ascending: false }).limit(30);
      if (data) {
        setOptions(
          data.map((p) => ({
            productId: p.id,
            name: p.name,
            price: p.price || 0,
            unit: (p.unit as string | null) || undefined,
            quantity: 1
          }))
        );
      }
    };
    fetchOptions();
  }, [supabase]);

  useEffect(() => {
    if (prefillItems.length > 0) {
      setItems(prefillItems);
    }
  }, [prefillItems, setItems]);

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const transferReference = form.phone ? `AGRITEC ${form.phone}` : "AGRITEC + SĐT của bạn";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setMessage("Vui lòng chọn sản phẩm hoặc combo trước khi đặt.");
      return;
    }
    startTransition(async () => {
      const result = await submitOrder({
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        payment_method: form.payment_method,
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      });
      setMessage(result.message);
      if (result.success) {
        clear();
      }
    });
  };

  const addSelected = () => {
    const found = options.find((o) => o.productId === selectedId);
    if (found) {
      addItem({ ...found, quantity: selectedQty });
      setSelectedId("");
      setSelectedQty(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 md:grid-cols-[1.6fr,1fr]">
      <div className="space-y-6 rounded-3xl border border-surface-border bg-white p-8 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Giỏ hàng</p>
            <h2 className="font-heading text-2xl text-brand-blue">Sản phẩm / Combo</h2>
          </div>
          <Button variant="ghost" size="sm" type="button" onClick={() => clear()}>
            Xóa giỏ
          </Button>
        </div>

        <div className="rounded-2xl bg-surface-light p-4 text-sm text-slate-700 space-y-3">
          <p>{items.length === 0 ? "Chưa có sản phẩm. Chọn nhanh bên dưới." : "Thêm sản phẩm khác (tùy chọn):"}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="h-11 w-full rounded-xl border border-surface-border px-3 text-sm"
            >
              <option value="">-- Chọn sản phẩm --</option>
              {options.map((opt) => (
                <option key={opt.productId} value={opt.productId}>
                  {opt.name} ({formatCurrency(opt.price)})
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={selectedQty}
              onChange={(e) => setSelectedQty(Math.max(1, Number(e.target.value)))}
              className="h-11 w-24 rounded-xl border border-surface-border px-3 text-sm"
            />
            <Button type="button" variant="accent" size="sm" className="sm:w-auto" disabled={!selectedId} onClick={addSelected}>
              Thêm
            </Button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-3 rounded-2xl border border-surface-border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                    className="h-10 w-20 rounded-lg border border-surface-border px-2 text-center"
                  />
                  <Button variant="ghost" size="sm" type="button" onClick={() => removeItem(item.productId)}>
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6 rounded-3xl border border-surface-border bg-white p-8 shadow-soft">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Thông tin khách hàng</p>
          <h3 className="font-heading text-xl text-brand-blue">Xác nhận đơn</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Họ tên</Label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <Label>Số điện thoại</Label>
            <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required />
          </div>
          <div>
            <Label>Địa chỉ</Label>
            <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} required />
          </div>
          <div>
            <Label>Ghi chú</Label>
            <Textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} />
          </div>
          <div>
            <Label>Phương thức thanh toán</Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { key: "cod", label: "COD" },
                { key: "bank_transfer", label: "Chuyển khoản" }
              ].map((method) => (
                <button
                  key={method.key}
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    form.payment_method === method.key ? "border-brand-blue text-brand-blue" : "border-surface-border text-slate-700"
                  }`}
                  onClick={() => setForm((f) => ({ ...f, payment_method: method.key as "cod" | "bank_transfer" }))}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
          {form.payment_method === "bank_transfer" && (
            <div className="rounded-2xl border border-surface-border bg-surface-light p-4 text-sm text-slate-700">
              <p className="font-semibold text-brand-blue">Thông tin chuyển khoản</p>
              <p>Ngân hàng: TP Bank</p>
              <p>
                Số tài khoản: <span className="font-semibold">00947260262</span>
              </p>
              <p>Chủ tài khoản: AGRITEC</p>
              <p className="mt-2 text-xs text-slate-600">
                Nội dung chuyển: <span className="font-semibold text-brand-blue">{transferReference}</span> (ghi SĐT để định danh).
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-surface-light px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">Tổng tạm tính</p>
          <p className="text-lg font-semibold text-brand-blue">{formatCurrency(total)}</p>
        </div>
        {message && <p className="text-sm text-brand-blue">{message}</p>}
        <Button type="submit" variant="accent" size="lg" disabled={isPending} className="w-full">
          {isPending ? "Đang xử lý..." : "Gửi đơn hàng"}
        </Button>
      </div>
    </form>
  );
}
