import { SolutionCombo } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  combo: SolutionCombo;
  solutionSlug: string;
};

export function ComboCard({ combo, solutionSlug }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Combo</p>
          <h4 className="font-heading text-xl text-brand-blue">{combo.name}</h4>
        </div>
        <p className="text-lg font-semibold text-slate-900">{formatCurrency(combo.price)}</p>
      </div>
      {combo.description && <p className="text-sm text-slate-600">{combo.description}</p>}
      <div className="rounded-xl bg-surface-light p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-800">Thành phần:</p>
        <ul className="mt-2 space-y-1">
          {combo.items?.map((item) => (
            <li key={item.product_id} className="flex items-center justify-between">
              <span>{item.product?.name || item.product_id}</span>
              <span className="text-slate-500">x{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="accent" size="sm" asChild>
          <Link href={`/dat-hang?combo=${combo.slug}&solution=${solutionSlug}`}>Đặt combo</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="https://zalo.me/0977791412" target="_blank">
            Tư vấn
          </Link>
        </Button>
      </div>
    </div>
  );
}
