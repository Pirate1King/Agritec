"use client";

import { upsertProduct } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type ProductFormProps = {
  product?: {
    id: string;
    name: string;
    slug: string;
    unit: string | null;
    price: number | null;
    description: string | null;
    excerpt: string | null;
    product_images?: { id: string; url: string; is_primary: boolean }[];
    solution_products?: { solution_id: string }[];
  };
  solutions: { id: string; title: string }[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? "Đang lưu..." : label}
    </Button>
  );
}

export function ProductForm({ product, solutions }: ProductFormProps) {
  const selectedSolutions = new Set(product?.solution_products?.map((sp) => sp.solution_id));
  const primaryImage = product?.product_images?.find((img) => img.is_primary);
  const [state, formAction] = useFormState(upsertProduct, { success: false, message: "" });

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-surface-border bg-surface-light p-6" encType="multipart/form-data">
      <input type="hidden" name="product_id" value={product?.id || ""} />

      <div>
        <label className="text-sm font-semibold text-slate-800">Tên sản phẩm</label>
        <input
          name="name"
          defaultValue={product?.name}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
          placeholder="Ví dụ: Globacid DW"
          required
        />
        <p className="mt-1 text-xs text-slate-500">Slug sẽ tự tạo từ tên sản phẩm và kiểm tra trùng.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-slate-800">Đơn vị</label>
          <input name="unit" defaultValue={product?.unit || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Giá (VND)</label>
          <input type="number" name="price" defaultValue={product?.price ?? ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Tóm tắt</label>
          <input
            name="excerpt"
            defaultValue={product?.excerpt || ""}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
            placeholder="Ngắn gọn 1-2 câu"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Mô tả</label>
        <textarea name="description" defaultValue={product?.description || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3" />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Ảnh sản phẩm</label>
        <div className="mt-3 space-y-3">
          <input type="file" name="images" multiple accept="image/*" className="text-sm" />
          {product?.product_images && product.product_images.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {product.product_images.map((img) => (
                <label key={img.id} className="flex items-center gap-3 rounded-xl border border-surface-border bg-white p-2">
                  <input type="radio" name="primaryImage" value={img.id} defaultChecked={primaryImage?.id === img.id} className="h-4 w-4" />
                  <div className="h-16 w-20 overflow-hidden rounded-lg bg-surface-light">
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-xs text-slate-700">Đặt làm ảnh chính</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Thuộc giải pháp</label>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {solutions.map((solution) => (
            <label key={solution.id} className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3 py-2">
              <input type="checkbox" name="solutionIds" value={solution.id} defaultChecked={selectedSolutions.has(solution.id)} className="h-4 w-4" />
              <span className="text-sm text-slate-800">{solution.title}</span>
            </label>
          ))}
          {solutions.length === 0 && <p className="text-sm text-slate-500">Chưa có giải pháp.</p>}
        </div>
      </div>

      {state.message && (
        <div className={`rounded-xl px-3 py-2 text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      )}

      <div className="flex justify-end">
        <SubmitButton label="Lưu sản phẩm" />
      </div>
    </form>
  );
}
