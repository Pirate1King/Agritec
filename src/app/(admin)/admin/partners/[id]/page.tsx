import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { PartnerForm } from "../_partner-form";
import DeletePartner from "../delete-partner";

type Props = { params: { id: string } };

export default async function EditPartnerPage({ params }: Props) {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("partners")
    .select("id, name, logo_url, website_url, sort_order, is_active")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <div className="text-red-600">Khong tim thay doi tac.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Partners</p>
          <h1 className="font-heading text-2xl text-brand-blue">Chinh sua doi tac</h1>
        </div>
        <div className="flex items-center gap-3">
          <DeletePartner partnerId={data.id} />
          <Button variant="ghost" asChild>
            <Link href="/admin/partners">Quay lai</Link>
          </Button>
        </div>
      </div>
      <PartnerForm partner={data} />
    </div>
  );
}
