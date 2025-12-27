"use client";

import { useState } from "react";
import { upsertSolution } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type SolutionFormProps = {
  solution?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    hero_url: string | null;
    pdf_url: string | null;
    problem: string | null;
    solution: string | null;
    solution_products?: { product_id: string; quantity?: number }[];
    solution_combos?: {
      id: string;
      name: string;
      description: string | null;
      combo_items: { product_id: string; quantity: number }[];
    }[];
  };
  products: { id: string; name: string }[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? "Đang lưu..." : label}
    </Button>
  );
}

type ComboDraft = {
  id?: string;
  name: string;
  description?: string | null;
  items: { product_id: string; quantity: number }[];
};

function CombosBuilder({
  initialCombos,
  products
}: {
  initialCombos: ComboDraft[];
  products: { id: string; name: string }[];
}) {
  const [combos, setCombos] = useState<ComboDraft[]>(initialCombos);

  const updateCombo = (idx: number, updater: (c: ComboDraft) => ComboDraft) => {
    setCombos((prev) => prev.map((c, i) => (i === idx ? updater(c) : c)));
  };

  const toggleProduct = (idx: number, product_id: string, checked: boolean) => {
    updateCombo(idx, (combo) => {
      const existing = combo.items.find((i) => i.product_id === product_id);
      let nextItems = combo.items;
      if (checked) {
        if (existing) {
          nextItems = combo.items.map((i) => (i.product_id === product_id ? { ...i, quantity: i.quantity || 1 } : i));
        } else {
          nextItems = [...combo.items, { product_id, quantity: 1 }];
        }
      } else {
        nextItems = combo.items.filter((i) => i.product_id !== product_id);
      }
      return { ...combo, items: nextItems };
    });
  };

  const changeQty = (idx: number, product_id: string, qty: number) => {
    updateCombo(idx, (combo) => {
      const nextItems = combo.items.map((i) =>
        i.product_id === product_id ? { ...i, quantity: qty > 0 ? qty : 1 } : i
      );
      return { ...combo, items: nextItems };
    });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Combos</p>
          <h3 className="font-heading text-lg text-brand-blue">Nhóm sản phẩm cho giải pháp</h3>
        </div>
        <Button
          type="button"
          variant="accent"
          size="sm"
          onClick={() => setCombos((prev) => [...prev, { name: "", description: "", items: [] }])}
        >
          Thêm combo
        </Button>
      </div>

      {combos.length === 0 && <p className="text-sm text-slate-600">Chưa có combo. Bấm “Thêm combo”.</p>}

      <div className="space-y-3">
        {combos.map((combo, idx) => (
          <div key={combo.id || idx} className="space-y-3 rounded-2xl border border-surface-border bg-surface-light p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-semibold text-slate-800">Tên combo</label>
                <input
                  className="mt-1 w-full rounded-xl border border-surface-border px-3 py-2"
                  value={combo.name}
                  onChange={(e) => updateCombo(idx, (c) => ({ ...c, name: e.target.value }))}
                  required
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setCombos((prev) => prev.filter((_, i) => i !== idx))}
              >
                Xóa
              </Button>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">Mô tả ngắn</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-surface-border px-3 py-2"
                value={combo.description || ""}
                onChange={(e) => updateCombo(idx, (c) => ({ ...c, description: e.target.value }))}
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {products.map((p) => {
                const item = combo.items.find((i) => i.product_id === p.id);
                const checked = Boolean(item);
                return (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-surface-border bg-white px-3 py-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={checked}
                        onChange={(e) => toggleProduct(idx, p.id, e.target.checked)}
                      />
                      <span className="text-sm text-slate-800">{p.name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">SL</span>
                      <input
                        type="number"
                        min={1}
                        className="h-9 w-16 rounded-lg border border-surface-border px-2 text-sm"
                        value={item?.quantity || 1}
                        disabled={!checked}
                        onChange={(e) => changeQty(idx, p.id, Number(e.target.value))}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <input type="hidden" name="combos_json" value={JSON.stringify(combos)} />
    </div>
  );
}

export function SolutionForm({ solution, products }: SolutionFormProps) {
  const initialCombos =
    solution?.solution_combos?.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      items: c.combo_items || []
    })) || [];
  const [state, formAction] = useFormState(upsertSolution, { success: false, message: "" });

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-surface-border bg-surface-light p-6"
      encType="multipart/form-data"
    >
      <input type="hidden" name="solution_id" value={solution?.id || ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">Tiêu đề</label>
          <input
            name="title"
            defaultValue={solution?.title}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Slug</label>
          <input
            name="slug"
            defaultValue={solution?.slug}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Tóm tắt</label>
        <textarea
          name="excerpt"
          defaultValue={solution?.excerpt}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3"
          placeholder="Giảm 30% nước, tăng 18% năng suất..."
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">Problem</label>
          <textarea
            name="problem"
            defaultValue={solution?.problem || ""}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Solution</label>
          <textarea
            name="solution"
            defaultValue={solution?.solution || ""}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Hero image/video URL</label>
        <input
          name="hero_url"
          defaultValue={solution?.hero_url || ""}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">Brochure / PDF</label>
        <input type="file" name="pdf" accept="application/pdf" className="text-sm" />
        {solution?.pdf_url && (
          <a
            href={solution.pdf_url}
            target="_blank"
            className="text-sm font-semibold text-brand-blue hover:underline"
            rel="noreferrer"
          >
            Xem file hiện tại
          </a>
        )}
      </div>

      <CombosBuilder initialCombos={initialCombos} products={products} />

      {state.message && (
        <div
          className={`rounded-xl px-3 py-2 text-sm ${
            state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="flex justify-end">
        <SubmitButton label="Lưu giải pháp" />
      </div>
    </form>
  );
}
