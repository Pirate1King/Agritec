import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { ProductForm } from "../_product-form";

export default async function NewProductPage() {
  const supabase = getServiceSupabase();
  const { data: solutions, error } = await supabase.from("solutions").select("id, title").order("title", { ascending: true });

  if (error) {
    return <div className="text-red-600">Không tải được giải pháp: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">New product</p>
          <h1 className="font-heading text-2xl text-brand-blue">Tạo sản phẩm</h1>
        </div>
        <Button asChild variant="secondary">
          <Link href="/admin/products">← Danh sách</Link>
        </Button>
      </div>
      <ProductForm solutions={(solutions || []) as { id: string; title: string }[]} />
    </div>
  );
}
