"use client";

import { useMemo, useState } from "react";
import { upsertCombo, deleteCombo } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type ComboFormProps = {
  solutionId: string;
  products: { id: string; name: string }[];
  combo?: {
    id: string;
    name: string;
    slug?: string;
    description: string | null;
    items?: { product_id: string; quantity: number }[];
  };
  onDone?: () => void;
};

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="sm" disabled={pending}>
      {pending ? "Đang lưu..." : label}
    </Button>
  );
}

export default function ComboForm({ solutionId, products, combo, onDone }: ComboFormProps) {
  const [state, formAction] = useFormState(upsertCombo, { success: false, message: "" });
  const mapQty = new Map(combo?.items?.map((item) => [item.product_id, item.quantity]));
  const initialSelected = useMemo(() => {
    const sel = new Set<string>();
    mapQty.forEach((qty, pid) => {
      if (qty > 0) sel.add(pid);
    });
    return sel;
  }, [mapQty]);
  const [selected, setSelected] = useState<Set<string>>(initialSelected);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const obj: Record<string, number> = {};
    products.forEach((p) => {
      const qty = mapQty.get(p.id);
      obj[p.id] = qty && qty > 0 ? qty : 1;
    });
    return obj;
  });

  return (
    <form
      action={async (formData) => {
        const result = await formAction(formData);
        if (result.success && onDone) onDone();
        return result;
      }}
      className="space-y-3 rounded-2xl border border-surface-border bg-white p-4 shadow-soft"
      encType="multipart/form-data"
    >
      <input type="hidden" name="solution_id" value={solutionId} />
      <input type="hidden" name="combo_id" value={combo?.id || ""} />

      <div>
        <label className="text-sm font-semibold text-slate-800">Tên combo</label>
        <input
          name="name"
          defaultValue={combo?.name}
          className="mt-1 w-full rounded-xl border border-surface-border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Mô tả</label>
        <textarea
          name="description"
          defaultValue={combo?.description || ""}
          className="mt-1 w-full rounded-xl border border-surface-border px-3 py-2"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800">Chọn sản phẩm</label>
          <span className="text-xs text-slate-500">Tick để thêm vào combo</span>
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {products.map((p) => {
            const isChecked = selected.has(p.id);
            return (
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-light px-3 py-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={isChecked}
                    onChange={(e) => {
                      const next = new Set(selected);
                      if (e.target.checked) {
                        next.add(p.id);
                      } else {
                        next.delete(p.id);
                      }
                      setSelected(next);
                    }}
                  />
                  <span className="text-sm text-slate-800">{p.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">SL</span>
                  <input
                    type="number"
                    min={1}
                    className="h-9 w-16 rounded-lg border border-surface-border px-2 text-sm"
                    value={quantities[p.id] ?? 1}
                    disabled={!isChecked}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setQuantities((prev) => ({ ...prev, [p.id]: val > 0 ? val : 1 }));
                    }}
                  />
                </div>
                <input type="hidden" name={`combo_qty_${p.id}`} value={isChecked ? quantities[p.id] ?? 1 : 0} />
              </div>
            );
          })}
          {products.length === 0 && <p className="text-sm text-slate-500">Chưa có sản phẩm.</p>}
        </div>
      </div>

      {state.message && (
        <p className={`text-xs ${state.success ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>
      )}

      <div className="flex justify-between">
        {combo && (
          <form
            action={deleteCombo}
            className="inline-flex items-center gap-2"
            onSubmit={(e) => {
              if (!confirm("Xóa combo này?")) e.preventDefault();
            }}
          >
            <input type="hidden" name="combo_id" value={combo.id} />
            <input type="hidden" name="solution_id" value={solutionId} />
            <Button type="submit" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Xóa
            </Button>
          </form>
        )}
        <SubmitBtn label="Lưu combo" />
      </div>
    </form>
  );
}
