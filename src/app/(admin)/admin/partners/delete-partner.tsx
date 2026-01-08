"use client";

import { deletePartner } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type Props = { partnerId: string };

function DeleteSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Xoa doi tac nay?")) {
          e.preventDefault();
        }
      }}
    >
      {pending ? "Dang xoa..." : "Xoa"}
    </Button>
  );
}

export default function DeletePartner({ partnerId }: Props) {
  const [state, formAction] = useFormState(deletePartner, { success: false, message: "" });
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="partner_id" value={partnerId} />
      <DeleteSubmit />
      {state.message && <span className={`text-xs ${state.success ? "text-emerald-600" : "text-red-600"}`}>{state.message}</span>}
    </form>
  );
}
