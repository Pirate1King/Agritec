import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/service";

export default async function AdminHomePage() {
  const supabase = getServiceSupabase();

  const [solutions, products, orders] = await Promise.all([
    supabase.from("solutions").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true })
  ]);

  const cards = [
    { label: "Giải pháp", value: solutions.count ?? 0, link: "/admin/solutions" },
    { label: "Sản phẩm", value: products.count ?? 0, link: "/admin/products" },
    { label: "Đơn hàng", value: orders.count ?? 0, link: "/admin/orders" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Dashboard</p>
        <h1 className="font-heading text-2xl text-brand-blue">Tổng quan</h1>
        <p className="text-slate-600">Số liệu trực tiếp từ Supabase.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.link}
            className="rounded-2xl border border-surface-border bg-white p-5 shadow-soft transition hover:-translate-y-1"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-3xl font-semibold text-brand-blue">{card.value}</p>
            <p className="text-sm text-slate-500">Xem chi tiết →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
