import Link from "next/link";
import { SolutionForm } from "../_solution-form";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { ComboSummary } from "./combo-summary";
import DeleteSolution from "../delete-solution";

type SolutionWithLinks = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_url: string | null;
  pdf_url: string | null;
  problem: string | null;
  solution: string | null;
  solution_products: { product_id: string; quantity: number; products: { id: string; name: string; price: number | null } | null }[];
  solution_combos?: {
    id: string;
    name: string;
    description: string | null;
    combo_items: { product_id: string; quantity: number; products?: { id: string; name: string; price: number | null } }[];
  }[];
};

export default async function SolutionDetailPage({ params }: { params: { id: string } }) {
  const supabase = getServiceSupabase();
  const [{ data: solution, error }, { data: products }] = await Promise.all([
    supabase
      .from("solutions")
      .select(
        "id, title, slug, excerpt, hero_url, pdf_url, problem, solution, solution_products (product_id, quantity, products(id, name, price)), solution_combos(id, name, slug, description, price, is_active, combo_items(product_id, quantity, products(id,name,price)))"
      )
      .eq("id", params.id)
      .single(),
    supabase.from("products").select("id, name").order("name", { ascending: true })
  ]);

  if (error || !solution) {
    return <div className="text-red-600">Không tải được giải pháp: {error?.message}</div>;
  }

  const linkedProducts =
    (solution.solution_products || [])
      .map((sp) =>
        sp.products ? { id: sp.products.id, name: sp.products.name, price: sp.products.price, linkQuantity: sp.quantity } : null
      )
      .filter(Boolean) as { id: string; name: string; price?: number | null; linkQuantity?: number }[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Solution detail</p>
          <h1 className="font-heading text-2xl text-brand-blue">{solution.title}</h1>
          <p className="text-slate-600">Chỉnh sửa nội dung và gắn sản phẩm.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin/solutions">← Danh sách</Link>
          </Button>
          <DeleteSolution solutionId={solution.id} />
        </div>
      </div>

      <SolutionForm solution={solution as SolutionWithLinks} products={(products || []) as { id: string; name: string }[]} />
      <ComboSummary products={linkedProducts} />
    </div>
  );
}
