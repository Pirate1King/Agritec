export type ProductImage = {
  id: string;
  url: string;
  is_primary?: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category?: string;
  excerpt?: string;
  description?: string;
  usage?: string;
  unit?: string;
  price?: number;
  images?: ProductImage[];
  solutions?: (Pick<Solution, "id" | "title" | "slug"> & { quantity?: number })[];
  linkQuantity?: number;
};

export type SolutionComboItem = {
  product_id: string;
  quantity: number;
  product?: Product;
};

export type SolutionCombo = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  items?: SolutionComboItem[];
};

export type Benefit = {
  title: string;
  detail: string;
  icon?: string;
};

export type Solution = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_url?: string;
  pdf_url?: string | null;
  problem?: string;
  solution?: string;
  benefits?: Benefit[];
  products?: Product[];
  combos?: SolutionCombo[];
};

export type OrderItem = {
  product_id: string;
  quantity: number;
  price?: number;
  product?: Product;
};

export type OrderPayload = {
  name: string;
  phone: string;
  address: string;
  note?: string;
  payment_method: "cod" | "bank_transfer";
  items: OrderItem[];
};
