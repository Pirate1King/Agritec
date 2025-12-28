"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="flex flex-col overflow-hidden rounded-3xl border border-surface-border bg-white shadow-soft"
    >
      <Link href={`/san-pham/${product.slug}`} className="group">
        <div className="relative h-48 overflow-hidden bg-surface-light">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={product.name}
              className="h-full w-full object-contain transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-light text-slate-500">Đang cập nhật hình</div>
          )}
          <div className="absolute left-4 top-4">
            <Badge variant="accent">{product.category || "Thiết bị"}</Badge>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Link href={`/san-pham/${product.slug}`} className="group">
          <h3 className="font-heading text-xl text-brand-blue group-hover:text-brand-ink">{product.name}</h3>
          <p className="mt-1 text-slate-600">{product.excerpt}</p>
        </Link>
        <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</p>
        <div className="mt-auto flex items-center justify-between">
          <Button variant="primary" size="sm" asChild className="flex-1">
            <Link href={`/san-pham/${product.slug}`}>Chi tiết</Link>
          </Button>
          <div className="pl-3">
            <AddToCartButton
              variant="secondary"
              label={<ShoppingCart className="h-4 w-4" aria-hidden />}
              item={{
                productId: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                unit: product.unit,
                image: primaryImage?.url || null
              }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
