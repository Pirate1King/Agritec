'use client';

import { Product, Solution } from "@/lib/types";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import CartSummary from "./cart-summary";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Props = {
  products: Product[];
  solutions: Solution[];
};

export default function ProductsFilter({ products, solutions }: Props) {
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[];
  const [solutionFilter, setSolutionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showComboView, setShowComboView] = useState<boolean>(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchSolution =
        solutionFilter === "all" || product.solutions?.some((s) => s.slug === solutionFilter || s.id === solutionFilter);
      const matchCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchSolution && matchCategory;
    });
  }, [products, solutionFilter, categoryFilter]);

  const solutionsWithCombos = solutions.filter((s) => (s.combos || []).length > 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
          <select
            value={solutionFilter}
            disabled={showComboView}
            onChange={(e) => setSolutionFilter(e.target.value)}
            className="h-11 rounded-xl border border-surface-border px-4 text-sm disabled:opacity-50"
          >
            <option value="all">Tất cả giải pháp</option>
            {solutions.map((solution) => (
              <option key={solution.id} value={solution.slug}>
                {solution.title}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            disabled={showComboView}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-11 rounded-xl border border-surface-border px-4 text-sm disabled:opacity-50"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-2">
            <Button variant={showComboView ? "secondary" : "accent"} size="sm" onClick={() => setShowComboView((v) => !v)}>
              {showComboView ? "Xem sản phẩm" : "Xem combo"}
            </Button>
          </div>
        </div>

        {!showComboView && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-slate-500">Không có sản phẩm phù hợp bộ lọc.</p>}
          </div>
        )}

        {showComboView && (
          <div className="space-y-4">
            {solutionsWithCombos.map((solution) => (
              <div key={solution.id} className="space-y-3 rounded-2xl border border-surface-border bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Combo giải pháp</p>
                    <a href={`/giai-phap/${solution.slug}`} className="font-heading text-lg text-brand-blue hover:underline">
                      {solution.title}
                    </a>
                  </div>
                </div>
                <div className="space-y-3">
                  {(solution.combos || []).map((combo) => {
                    const total =
                      combo.items?.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0) || combo.price || 0;
                    return (
                      <div key={combo.id} className="rounded-xl border border-surface-border bg-surface-light p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-heading text-base text-brand-blue">{combo.name}</p>
                            <p className="text-xs text-slate-500">{combo.description}</p>
                          </div>
                          <span className="text-sm font-semibold text-brand-blue">{formatCurrency(total)}</span>
                        </div>
                        <ul className="mt-2 text-sm text-slate-700">
                          {combo.items?.map((item) => (
                            <li key={item.product_id} className="flex justify-between">
                              <span>{item.product?.name || item.product_id}</span>
                              <span className="text-slate-500">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="accent" size="sm" asChild className="mt-3 w-full rounded-full">
                          <a href={`/dat-hang?combo=${combo.slug}&solution=${solution.slug}`}>Đặt combo</a>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {solutionsWithCombos.length === 0 && <p className="text-sm text-slate-500">Chưa có combo.</p>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <CartSummary />
      </div>
    </div>
  );
}
