import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";

type NewsRow = {
  id: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  is_published: boolean;
};

export default async function AdminNewsPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("news")
    .select("id, title, excerpt, image_url, is_published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Khong tai duoc tin tuc: {error.message}</div>;
  }

  const items = (data || []) as NewsRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">News</p>
          <h1 className="font-heading text-2xl text-brand-blue">Quan ly tin tuc</h1>
          <p className="text-slate-600">Cap nhat noi dung tin tuc hien thi o trang chu.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/news/new">+ Them tin tuc</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Anh</th>
              <th className="px-4 py-3">Tieu de</th>
              <th className="px-4 py-3">Trang thai</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-surface-border">
                <td className="px-4 py-3">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-surface-light text-xs text-slate-500">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  {item.excerpt && <p className="text-xs text-slate-500">{item.excerpt}</p>}
                </td>
                <td className="px-4 py-3 text-slate-600">{item.is_published ? "On" : "Off"}</td>
                <td className="px-4 py-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/admin/news/${item.id}`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                  Chua co tin tuc nao.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
