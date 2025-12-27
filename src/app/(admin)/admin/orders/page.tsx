import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { Badge } from "@/components/ui/badge";

type OrderRow = {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
};

export default async function AdminOrdersPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select("id, name, phone, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Không tải được đơn hàng: {error.message}</div>;
  }

  const orders = (data || []) as OrderRow[];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Orders</p>
        <h1 className="font-heading text-2xl text-brand-blue">Quản lý đơn hàng</h1>
        <p className="text-slate-600">Theo dõi đơn đã gửi và trạng thái xử lý.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Điện thoại</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-surface-border">
                <td className="px-4 py-3 font-semibold text-slate-900">{order.name}</td>
                <td className="px-4 py-3 text-slate-600">{order.phone}</td>
                <td className="px-4 py-3 text-slate-600 capitalize">
                  <Badge variant={order.status === "pending" ? "outline" : "default"}>{order.status}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">{new Date(order.created_at).toLocaleString("vi-VN")}</td>
                <td className="px-4 py-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}`}>Xem</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                  Chưa có đơn hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
