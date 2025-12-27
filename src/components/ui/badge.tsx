import { cn } from "@/lib/utils";
import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "accent" | "outline";
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-tight";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-brand-blue text-white",
    accent: "bg-brand-orange text-slate-900",
    outline: "border border-surface-border text-brand-blue"
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
};
