import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";

type SolutionRow = {
  id: string;
  title: string;
  slug: string;
  solution_products: { product_id: string }[];
};

export default async function AdminSolutionsPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("solutions")
    .select("id, title, slug, solution_products (product_id)")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Cannot load solutions: {error.message}</div>;
  }

  const solutions = (data || []) as SolutionRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Solutions</p>
          <h1 className="font-heading text-2xl text-brand-blue">Quản lý giải pháp</h1>
          <p className="text-slate-600">Liên kết sản phẩm với giải pháp và cập nhật nội dung.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/solutions/new">+ Thêm giải pháp</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution) => (
              <tr key={solution.id} className="border-t border-surface-border">
                <td className="px-4 py-3 font-semibold text-slate-900">{solution.title}</td>
                <td className="px-4 py-3 text-slate-600">{solution.slug}</td>
                <td className="px-4 py-3 text-slate-600">{solution.solution_products?.length || 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/admin/solutions/${solution.id}`}>View / Edit</Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {solutions.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                  Chưa có giải pháp nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
