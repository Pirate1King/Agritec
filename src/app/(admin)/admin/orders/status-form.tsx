'use client';

import { updateOrderStatusAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

const statuses = ["pending", "confirmed", "shipped", "completed", "cancelled"] as const;

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="sm" disabled={pending}>
      {pending ? "Đang cập nhật..." : "Cập nhật"}
    </Button>
  );
}

export default function StatusForm({ orderId, current }: { orderId: string; current: string }) {
  const [state, formAction] = useFormState(updateOrderStatusAction, { success: false, message: "" });

  return (
    <form action={formAction} className="mt-3 flex flex-col gap-2">
      <input type="hidden" name="order_id" value={orderId} />
      <div className="flex items-center gap-3">
        <select
          name="status"
          defaultValue={current}
          className="h-11 rounded-xl border border-surface-border px-3 text-sm"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <SubmitBtn />
      </div>
      {state.message && (
        <p className={`text-xs ${state.success ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>
      )}
    </form>
  );
}
