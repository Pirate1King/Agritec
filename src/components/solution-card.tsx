"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Solution } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  solution: Solution;
};

export function SolutionCard({ solution }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-col overflow-hidden rounded-3xl border border-surface-border bg-white shadow-soft"
    >
      <Link href={`/giai-phap/${solution.slug}`} className="group">
        <div className="relative h-56 overflow-hidden">
          <img
            src={solution.hero_url || "/placeholder.jpg"}
            alt={solution.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Badge variant="outline">Giải pháp</Badge>
        <Link href={`/giai-phap/${solution.slug}`} className="group">
          <h3 className="font-heading text-2xl text-brand-blue group-hover:text-brand-ink">{solution.title}</h3>
          <p className="mt-2 text-slate-600">{solution.excerpt}</p>
        </Link>
        <div className="mt-auto flex flex-wrap gap-3">
          <Button variant="primary" size="sm" asChild>
            <Link href={`/giai-phap/${solution.slug}`}>Chi tiết</Link>
          </Button>
          <AddToCartButton
            variant="secondary"
            item={{
              productId: `solution-${solution.id}`,
              name: solution.title,
              quantity: 1,
              price: null,
              unit: null,
              image: solution.hero_url || undefined
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
