import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const images = product.images || [];
  const primaryImage = images.find((img) => img.is_primary) || images[0];

  return (
    <div className="container space-y-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr,1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-surface-border bg-surface-light shadow-soft">
            {primaryImage ? (
              <img src={primaryImage.url} alt={product.name} className="h-[420px] w-full object-contain" />
            ) : (
              <div className="flex h-[420px] items-center justify-center bg-surface-light text-slate-500">
                Đang cập nhật hình ảnh
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-xl border border-surface-border">
                  <img src={img.url} alt="" className="h-28 w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6 rounded-3xl border border-surface-border bg-white p-8 shadow-soft">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">{product.category}</p>
            <h1 className="font-heading text-3xl text-brand-blue">{product.name}</h1>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</p>
          </div>
          <p className="text-slate-700">{product.description}</p>
          <div className="rounded-2xl bg-surface-light p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-800">Hướng dẫn sử dụng</p>
            <p className="mt-2">{product.usage}</p>
          </div>
          <div className="flex gap-3">
            <AddToCartButton
              size="lg"
              variant="accent"
              label="Thêm vào giỏ"
              item={{
                productId: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                unit: product.unit,
                image: primaryImage?.url || null
              }}
            />
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/dat-hang?product=${product.slug}`}>Mua nhanh</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="https://zalo.me" target="_blank">
                Tư vấn Zalo
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {product.solutions && product.solutions.length > 0 && (
        <section>
          <SectionHeader eyebrow="Solutions" title="Sản phẩm dùng trong" />
          <div className="mt-6 flex flex-wrap gap-3">
            {product.solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/giai-phap/${solution.slug}`}
                className="rounded-full border border-surface-border px-4 py-2 text-sm font-semibold text-brand-blue hover:border-brand-blue"
              >
                {solution.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
