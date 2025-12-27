import { sampleSolutions, sampleProducts } from "@/data/static";
import { getServerSupabaseClient } from "./supabase/server";
import { Database } from "./supabase/types";
import { Product, Solution, SolutionCombo } from "./types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"] & {
  product_images?: Database["public"]["Tables"]["product_images"]["Row"][];
  solution_products?: {
    solution_id: string;
    quantity: number;
    solutions?: { id: string; slug: string; title: string };
  }[];
};

type SolutionRow = Database["public"]["Tables"]["solutions"]["Row"] & {
  solution_combos?: (Database["public"]["Tables"]["solution_combos"]["Row"] & {
    combo_items?: (Database["public"]["Tables"]["combo_items"]["Row"] & { products?: ProductRow })[];
  })[];
  solution_products?: {
    products?: ProductRow;
    product_id: string;
    quantity: number;
  }[];
};

const mapProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  category: row.category || undefined,
  excerpt: row.excerpt || undefined,
  description: row.description || undefined,
  usage: row.usage || undefined,
  unit: row.unit || undefined,
  price: row.price || undefined,
  images: row.product_images?.map((img) => ({ id: img.id, url: img.url, is_primary: img.is_primary })) || [],
  solutions:
    row.solution_products
      ?.map((sp) =>
        sp.solutions ? { id: sp.solutions.id, slug: sp.solutions.slug, title: sp.solutions.title, quantity: sp.quantity } : undefined
      )
      .filter(Boolean) || []
});

const mapSolution = (row: SolutionRow): Solution => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  hero_url: row.hero_url || undefined,
  pdf_url: row.pdf_url || undefined,
  problem: row.problem || undefined,
  solution: row.solution || undefined,
  benefits: (row.benefits as { title: string; detail: string }[] | null) || [],
  products:
    row.solution_products
      ?.map((sp) => {
        if (!sp.products) return undefined;
        const mapped = mapProduct(sp.products);
        mapped.linkQuantity = sp.quantity;
        return mapped;
      })
      .filter(Boolean) as Product[],
  combos:
    row.solution_combos?.map((combo) => ({
      id: combo.id,
      name: combo.name,
      slug: combo.slug,
      description: combo.description || undefined,
      price: combo.price || undefined,
      items:
        combo.combo_items?.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          product: item.products ? mapProduct(item.products) : undefined
        })) || []
    })) || []
});

export async function getSolutions(): Promise<Solution[]> {
  const supabase = getServerSupabaseClient();
  if (!supabase) return sampleSolutions;

  const { data, error } = await supabase
    .from("solutions")
    .select(
      "*, solution_combos(*, combo_items(*, products(*, product_images(*)))), solution_products(product_id, quantity, products(*, product_images(*)))"
    )
    .eq("is_published", true);

  if (error || !data) return sampleSolutions;

  return data.map(mapSolution);
}

export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  const supabase = getServerSupabaseClient();
  if (!supabase) return sampleSolutions.find((s) => s.slug === slug) || null;

  const { data, error } = await supabase
    .from("solutions")
    .select(
      "*, solution_combos(*, combo_items(*, products(*, product_images(*)))), solution_products(product_id, quantity, products(*, product_images(*)))"
    )
    .eq("slug", slug)
    .single();

  if (error || !data) return sampleSolutions.find((s) => s.slug === slug) || null;

  const mapped = mapSolution(data as SolutionRow);

  // Fallback: nếu combos chưa lấy được, query riêng để tránh supabase join rỗng
  if (!mapped.combos || mapped.combos.length === 0) {
    const { data: combosData } = await supabase
      .from("solution_combos")
      .select("*, combo_items(*, products(*, product_images(*)))")
      .eq("solution_id", mapped.id)
      .eq("is_active", true);
    if (combosData) {
      mapped.combos =
        combosData.map((combo) => ({
          id: combo.id,
          name: combo.name,
          slug: combo.slug,
          description: combo.description || undefined,
          price: combo.price || undefined,
          items:
            (combo as any).combo_items?.map((item: any) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              product: item.products ? mapProduct(item.products as ProductRow) : undefined
            })) || []
        })) || [];
    }
  }

  return mapped;
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getServerSupabaseClient();
  if (!supabase) return sampleProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*), solution_products(quantity, solutions(id, slug, title))")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return sampleProducts;
  return (data as ProductRow[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getServerSupabaseClient();
  if (!supabase) return sampleProducts.find((p) => p.slug === slug) || null;

  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*), solution_products(solution_id, quantity, solutions(id, slug, title))")
    .eq("slug", slug)
    .single();

  if (error || !data) return sampleProducts.find((p) => p.slug === slug) || null;

  const row = data as ProductRow & {
    solution_products?: { solution_id: string; quantity: number; solutions?: { id: string; slug: string; title: string } }[];
  };

  const mapped = mapProduct(row);
  mapped.solutions = row.solution_products
    ?.map((s) =>
      s.solutions ? { id: s.solutions.id, slug: s.solutions.slug, title: s.solutions.title, quantity: s.quantity } : undefined
    )
    .filter(Boolean) as Solution[];
  return mapped;
}

export async function getComboBySlug(slug: string): Promise<SolutionCombo | null> {
  const supabase = getServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("solution_combos")
    .select("*, combo_items(*, products(*, product_images(*))), solutions(slug)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  const row = data as Database["public"]["Tables"]["solution_combos"]["Row"] & {
    combo_items?: (Database["public"]["Tables"]["combo_items"]["Row"] & { products?: ProductRow })[];
    solutions?: { slug: string };
  };
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || undefined,
    price: row.price || undefined,
    items:
      row.combo_items?.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        product: item.products ? mapProduct(item.products) : undefined
      })) || []
  };
}
