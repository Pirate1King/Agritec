"use client";

import { upsertPartner } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type PartnerFormProps = {
  partner?: {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    sort_order: number | null;
    is_active: boolean;
  };
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? "Dang luu..." : label}
    </Button>
  );
}

export function PartnerForm({ partner }: PartnerFormProps) {
  const [state, formAction] = useFormState(upsertPartner, { success: false, message: "" });

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-surface-border bg-surface-light p-6">
      <input type="hidden" name="partner_id" value={partner?.id || ""} />

      <div>
        <label className="text-sm font-semibold text-slate-800">Ten doi tac</label>
        <input
          name="name"
          defaultValue={partner?.name}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-slate-800">Logo (URL)</label>
          <input name="logo_url" defaultValue={partner?.logo_url || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Website</label>
          <input name="website_url" defaultValue={partner?.website_url || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Thu tu</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={partner?.sort_order ?? 0}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3 py-2">
        <input type="checkbox" name="is_active" defaultChecked={partner?.is_active ?? true} className="h-4 w-4" />
        <span className="text-sm text-slate-700">Hien thi doi tac</span>
      </label>

      {state.message && (
        <div className={`rounded-xl px-3 py-2 text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      )}

      <div className="flex justify-end">
        <SubmitButton label="Luu doi tac" />
      </div>
    </form>
  );
}
