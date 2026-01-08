"use client";

import { deleteNews } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type Props = { newsId: string };

function DeleteSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Xoa tin tuc nay?")) {
          e.preventDefault();
        }
      }}
    >
      {pending ? "Dang xoa..." : "Xoa"}
    </Button>
  );
}

export default function DeleteNews({ newsId }: Props) {
  const [state, formAction] = useFormState(deleteNews, { success: false, message: "" });
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="news_id" value={newsId} />
      <DeleteSubmit />
      {state.message && <span className={`text-xs ${state.success ? "text-emerald-600" : "text-red-600"}`}>{state.message}</span>}
    </form>
  );
}
