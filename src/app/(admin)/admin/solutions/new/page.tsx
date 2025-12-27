import Link from "next/link";
import { SolutionForm } from "../_solution-form";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";

export default async function NewSolutionPage() {
  const supabase = getServiceSupabase();
  const { data: products, error } = await supabase.from("products").select("id, name").order("name", { ascending: true });

  if (error) {
    return <div className="text-red-600">Không tải được danh sách sản phẩm: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">New solution</p>
          <h1 className="font-heading text-2xl text-brand-blue">Tạo giải pháp</h1>
        </div>
        <Button asChild variant="secondary">
          <Link href="/admin/solutions">← Danh sách</Link>
        </Button>
      </div>
      <SolutionForm products={(products || []) as { id: string; name: string }[]} />
    </div>
  );
}
