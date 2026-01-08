import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";

type PartnerRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  is_active: boolean;
};

export default async function AdminPartnersPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("partners")
    .select("id, name, logo_url, website_url, is_active")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Khong tai duoc doi tac: {error.message}</div>;
  }

  const items = (data || []) as PartnerRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Partners</p>
          <h1 className="font-heading text-2xl text-brand-blue">Quan ly doi tac</h1>
          <p className="text-slate-600">Cap nhat logo va lien ket doi tac.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/partners/new">+ Them doi tac</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-700">
            <tr>
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3">Ten</th>
              <th className="px-4 py-3">Trang thai</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-surface-border">
                <td className="px-4 py-3">
                  {item.logo_url ? (
                    <img src={item.logo_url} alt={item.name} className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-surface-light text-xs text-slate-500">
                      No logo
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {item.website_url && <p className="text-xs text-slate-500">{item.website_url}</p>}
                </td>
                <td className="px-4 py-3 text-slate-600">{item.is_active ? "On" : "Off"}</td>
                <td className="px-4 py-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/admin/partners/${item.id}`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                  Chua co doi tac nao.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
