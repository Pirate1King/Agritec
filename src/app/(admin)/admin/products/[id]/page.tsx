import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { ProductForm } from "../_product-form";
import DeleteProduct from "../delete-product";

type ProductWithRelations = {
  id: string;
  name: string;
  slug: string;
  unit: string | null;
  price: number | null;
  description: string | null;
  excerpt: string | null;
  product_images: { id: string; url: string; is_primary: boolean }[];
  solution_products: { solution_id: string }[];
};

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = getServiceSupabase();
  const [{ data: product, error }, { data: solutions }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, slug, unit, price, description, excerpt, product_images(id, url, is_primary), solution_products(solution_id)")
      .eq("id", params.id)
      .single(),
    supabase.from("solutions").select("id, title").order("title", { ascending: true })
  ]);

  if (error || !product) {
    return <div className="text-red-600">Không tải được sản phẩm: {error?.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Product detail</p>
          <h1 className="font-heading text-2xl text-brand-blue">{product.name}</h1>
          <p className="text-slate-600">Cập nhật mô tả, ảnh và liên kết giải pháp.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin/products">← Danh sách</Link>
          </Button>
          <DeleteProduct productId={product.id} />
        </div>
      </div>

      <ProductForm
        product={product as ProductWithRelations}
        solutions={(solutions || []) as { id: string; title: string }[]}
      />
    </div>
  );
}
