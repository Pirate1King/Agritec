import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { formatCurrency } from "@/lib/utils";
import StatusForm from "../status-form";

type OrderDetail = {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string | null;
  status: string;
  payment_method: string;
  created_at: string;
  order_items: {
    quantity: number;
    price: number | null;
    products: { name: string; unit: string | null } | null;
  }[];
};

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = getServiceSupabase();
  const { data, error } = (await supabase
    .from("orders")
    .select("id, name, phone, address, note, status, payment_method, created_at, order_items(quantity, price, products(name, unit))")
    .eq("id", params.id)
    .single()) as { data: OrderDetail | null; error: any };

  if (error || !data) {
    return <div className="text-red-600">Không tải được đơn hàng: {error?.message}</div>;
  }

  const total = (data.order_items || []).reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Order detail</p>
          <h1 className="font-heading text-2xl text-brand-blue">Đơn hàng #{data.id.slice(0, 8)}</h1>
          <p className="text-slate-600">Khách: {data.name} · {data.phone}</p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/admin/orders">← Danh sách</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-border bg-surface-light p-4">
          <p className="text-sm font-semibold text-slate-800">Thông tin</p>
          <div className="mt-2 space-y-1 text-sm text-slate-700">
            <p>Địa chỉ: {data.address}</p>
            {data.note && <p>Ghi chú: {data.note}</p>}
            <p>Thanh toán: {data.payment_method}</p>
            <p>Tạo lúc: {new Date(data.created_at).toLocaleString("vi-VN")}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-surface-border bg-surface-light p-4">
          <p className="text-sm font-semibold text-slate-800">Trạng thái</p>
          <StatusForm orderId={data.id} current={data.status} />
        </div>
      </div>

      <div className="rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">SL</th>
              <th className="px-4 py-3">Đơn giá</th>
              <th className="px-4 py-3">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {(data.order_items || []).map((item, idx) => (
              <tr key={idx} className="border-t border-surface-border">
                <td className="px-4 py-3">
                  {item.products?.name || "Sản phẩm"} {item.products?.unit ? `(${item.products.unit})` : ""}
                </td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{formatCurrency(item.price)}</td>
                <td className="px-4 py-3">{formatCurrency((item.price || 0) * item.quantity)}</td>
              </tr>
            ))}
            {(data.order_items || []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                  Không có sản phẩm.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-surface-border bg-surface-light font-semibold text-slate-900">
              <td className="px-4 py-3" colSpan={3}>
                Tổng
              </td>
              <td className="px-4 py-3">{formatCurrency(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
