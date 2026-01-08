import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "../_partner-form";

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Partners</p>
          <h1 className="font-heading text-2xl text-brand-blue">Them doi tac</h1>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/partners">Quay lai</Link>
        </Button>
      </div>
      <PartnerForm />
    </div>
  );
}
