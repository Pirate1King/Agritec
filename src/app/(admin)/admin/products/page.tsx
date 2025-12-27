import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getServiceSupabase } from "@/lib/supabase/service";

type ProductRow = {
  id: string;
  name: string;
  unit: string | null;
  price: number | null;
  product_images: { id: string; url: string; is_primary: boolean }[];
};

export default async function AdminProductsPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, unit, price, product_images(id, url, is_primary)")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Không tải được sản phẩm: {error.message}</div>;
  }

  const products = (data || []) as ProductRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Products</p>
          <h1 className="font-heading text-2xl text-brand-blue">Quản lý sản phẩm</h1>
          <p className="text-slate-600">Ảnh, giá, đơn vị và liên kết giải pháp.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/products/new">+ Thêm sản phẩm</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Đơn vị</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const primary = product.product_images?.find((img) => img.is_primary) || product.product_images?.[0];
              return (
                <tr key={product.id} className="border-t border-surface-border">
                  <td className="px-4 py-3">
                    {primary ? (
                      <img src={primary.url} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-light text-xs text-slate-500">
                        —
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{product.name}</td>
                  <td className="px-4 py-3 text-slate-600">{product.unit || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                  Chưa có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
