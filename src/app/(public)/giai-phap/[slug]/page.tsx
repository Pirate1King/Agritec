import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getSolutionBySlug } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export default async function SolutionDetailPage({ params }: Props) {
  const solution = await getSolutionBySlug(params.slug);
  if (!solution) return notFound();

  const hasCombos = Boolean(solution.combos && solution.combos.length > 0);

  return (
    <div className="space-y-16">
      <div className="container">
        <Hero
          title={solution.title}
          subtitle={solution.excerpt}
          imageUrl={solution.hero_url || undefined}
          primaryCta={{ label: "Đặt combo giải pháp này", href: `/dat-hang?solution=${solution.slug}` }}
          secondaryCta={{ label: "Tư vấn qua Zalo", href: "https://zalo.me" }}
        />
      </div>

      <section className="container grid gap-10 md:grid-cols-[1.6fr,1fr]">
        <div className="space-y-6 rounded-3xl border border-surface-border bg-white p-8 shadow-soft">
          <SectionHeader eyebrow="Problem + Solution" title="Bài toán & cách Agritec xử lý" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-light p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Vấn đề</p>
              <p className="mt-3 text-slate-700">{solution.problem}</p>
            </div>
            <div className="rounded-2xl bg-surface-light p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-blue">Giải pháp</p>
              <p className="mt-3 text-slate-700">{solution.solution}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {solution.benefits?.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-surface-border bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-brand-blue">{benefit.title}</p>
                <p className="mt-2 text-sm text-slate-600">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-brand-blue bg-brand-blue p-8 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-orange">Triển khai</p>
          <h3 className="font-heading text-2xl font-semibold">Đặt lịch demo tại trang trại</h3>
          <p className="text-slate-100">
            Đội ngũ Agritec khảo sát, cấu hình thiết bị, bàn giao checklist triển khai và dự toán trong 24 giờ.
          </p>
          <div className="flex gap-3">
            <Button variant="accent" size="sm" asChild>
              <Link href={`/dat-hang?solution=${solution.slug}`}>Đặt combo</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link href="https://zalo.me" target="_blank">
                Tư vấn qua Zalo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {solution.pdf_url && (
        <section className="container">
          <div className="flex flex-col gap-3 rounded-3xl border border-surface-border bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Tài liệu</p>
              <h3 className="font-heading text-xl text-brand-blue">Brochure giải pháp</h3>
              <p className="text-sm text-slate-600">Tải PDF tổng quan giải pháp, cấu hình và quy trình triển khai.</p>
            </div>
            <Link
              href={solution.pdf_url}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-[#233076]"
            >
              Tải PDF
            </Link>
          </div>
        </section>
      )}

      {hasCombos ? (
        <section className="container space-y-4">
          <SectionHeader
            eyebrow="Combos"
            title="Các combo triển khai"
            description="Chọn combo phù hợp nhu cầu, kiểm soát lượng sản phẩm đề xuất."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {solution.combos?.map((combo) => {
              const total =
                combo.items?.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0) || combo.price || 0;
              return (
                <div key={combo.id} className="space-y-3 rounded-2xl border border-surface-border bg-white p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Combo</p>
                      <h4 className="font-heading text-xl text-brand-blue">{combo.name}</h4>
                      <p className="text-sm text-slate-600">{combo.description}</p>
                    </div>
                    <span className="text-lg font-semibold text-brand-blue">{formatCurrency(total)}</span>
                  </div>
                  <ul className="text-sm text-slate-700">
                    {combo.items?.map((item) => (
                      <li key={item.product_id} className="flex justify-between">
                        <span>{item.product?.name || item.product_id}</span>
                        <span className="text-slate-500">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="accent" size="sm" asChild className="w-full rounded-full">
                    <Link href={`/dat-hang?combo=${combo.slug}&solution=${solution.slug}`}>Đặt combo</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {solution.products && solution.products.length > 0 && (
        <section className="container space-y-6">
          <SectionHeader eyebrow="Products" title="Sản phẩm trong giải pháp" description="Đặt lẻ nếu cần." />
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {solution.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!hasCombos && (
            <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-xl text-brand-blue">Combo mặc định</h4>
                <Button variant="accent" size="sm" asChild>
                  <Link href={`/dat-hang?solution=${solution.slug}`}>Đặt combo này</Link>
                </Button>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {solution.products.map((p) => (
                  <li key={p.id} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="text-slate-500">x{p.linkQuantity || 1}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-4">
                <span className="text-sm font-semibold text-slate-800">Tạm tính</span>
                <span className="text-lg font-semibold text-brand-blue">
                  {formatCurrency(
                    solution.products.reduce((sum, p) => sum + (p.price || 0) * (p.linkQuantity || 1), 0)
                  )}
                </span>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
