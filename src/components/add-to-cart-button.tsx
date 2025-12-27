'use client';

import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/cart-store";
import { useState } from "react";

type Props = {
  item: CartItem;
  label?: string | React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary" | "ghost" | "muted";
  className?: string;
};

export function AddToCartButton({ item, label = "Thêm vào giỏ", size = "sm", variant = "accent", className }: Props) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button onClick={handleAdd} size={size} variant={variant} type="button" className={className}>
      {added ? "Đã thêm" : label}
    </Button>
  );
}
