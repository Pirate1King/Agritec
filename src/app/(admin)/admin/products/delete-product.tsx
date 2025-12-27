"use client";

import { deleteProduct } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type Props = { productId: string };

function DeleteSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Xoá sản phẩm này?")) {
          e.preventDefault();
        }
      }}
    >
      {pending ? "Đang xoá..." : "Xoá"}
    </Button>
  );
}

export default function DeleteProduct({ productId }: Props) {
  const [state, formAction] = useFormState(deleteProduct, { success: false, message: "" });
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="product_id" value={productId} />
      <DeleteSubmit />
      {state.message && <span className={`text-xs ${state.success ? "text-emerald-600" : "text-red-600"}`}>{state.message}</span>}
    </form>
  );
}
