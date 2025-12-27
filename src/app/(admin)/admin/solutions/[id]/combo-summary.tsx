import { formatCurrency } from "@/lib/utils";

type ComboSummaryProps = {
  products: { id: string; name: string; price?: number | null; linkQuantity?: number }[];
};

export function ComboSummary({ products }: ComboSummaryProps) {
  if (!products || products.length === 0) return null;

  const total = products.reduce((sum, p) => sum + (p.price || 0) * (p.linkQuantity || 1), 0);

  return (
    <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Combo mặc định</p>
          <h3 className="font-heading text-lg text-brand-blue">Tất cả sản phẩm của giải pháp</h3>
        </div>
        <p className="text-lg font-semibold text-brand-blue">{formatCurrency(total)}</p>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {products.map((p) => (
          <li key={p.id} className="flex justify-between">
            <span>{p.name}</span>
            <span className="text-slate-500">x{p.linkQuantity || 1}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
