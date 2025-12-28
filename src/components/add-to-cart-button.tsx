'use client';

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/cart-store";

type Props = {
  item: CartItem;
  label?: string | React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary" | "ghost" | "muted";
  className?: string;
};

export function AddToCartButton({
  item,
  label = <ShoppingCart className="h-4 w-4" aria-hidden />,
  size = "sm",
  variant = "accent",
  className
}: Props) {
  const { addItem, open } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <Button onClick={handleAdd} size={size} variant={variant} type="button" className={className}>
      {added ? <Check className="h-4 w-4" aria-hidden /> : label}
    </Button>
  );
}
