import Link from "next/link";
import Image from "next/image";

import { getNews } from "@/lib/queries";

export default async function HomePage() {
  const [news] = await Promise.all([getNews()]);
  const featuredNews = news[0];

  const serviceAreas = [
    {
      key: "LIVESTOCK",
      title: "Chăn nuôi",
      description: "Giải pháp B2B toàn diện",
      imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80",
      href: "/livestock",
      disabled: false
    },
    {
      key: "FARMING",
      title: "Trồng trọt",
      description: "Nông nghiệp chính xác",
      imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
      href: "#",
      disabled: true
    },
    {
      key: "FEED MILL",
      title: "Thức ăn",
      description: "Sản xuất & tối ưu",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      href: "#",
      disabled: true
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(248,156,62,0.18),_rgba(255,255,255,0)_55%)]">
      <div className="pointer-events-none absolute -left-40 top-12 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="space-y-14 py-16">
        <section className="container">
          <div className="mb-6 flex items-center justify-start gap-3">
            <Image src="/logo.png" alt="Agritec" width={36} height={36} className="rounded-lg" />
            <div className="leading-tight text-left">
              <p className="font-heading text-lg text-brand-blue">AGRITEC</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Agriculture Solutions</p>
            </div>
          </div>
          <div className="mb-10 flex flex-col gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-brand-orange">Agritec</p>
            <h1 className="mx-auto max-w-3xl font-heading text-4xl text-brand-blue md:text-5xl">
              Chọn lĩnh vực giải pháp
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
              Nền tảng triển khai giải pháp nông nghiệp theo từng mảng vận hành.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceAreas.map((area) => {
              const content = (
                <>
                  <div className="absolute inset-0 bg-slate-900/25" />
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url('${area.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-7 text-white">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/70">{area.key}</p>
                    <h3 className="mt-3 font-heading text-2xl">{area.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{area.description}</p>
                    {!area.disabled && (
                      <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/80">
                        Khám phá
                        <span className="text-base leading-none">→</span>
                      </span>
                    )}
                  </div>
                </>
              );

              if (area.disabled) {
                return (
                  <div
                    key={area.key}
                    aria-disabled="true"
                    className="group relative h-[320px] cursor-not-allowed overflow-hidden rounded-[32px] border border-surface-border bg-slate-900 opacity-55 grayscale"
                  >
                    {content}
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                        <svg width="30" height="30" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="12" y="28" width="40" height="28" rx="6" />
                          <path d="M20 28v-6a12 12 0 0 1 24 0v6" />
                          <path d="M32 40c-2.2 0-4 1.8-4 4 0 1.6.9 3 2.2 3.6V52h3.6v-4.4A4.1 4.1 0 0 0 36 44c0-2.2-1.8-4-4-4z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={area.key}
                  href={area.href}
                  className="group relative h-[320px] overflow-hidden rounded-[32px] border border-surface-border bg-slate-900 shadow-soft transition hover:-translate-y-1"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-brand-orange">Tin tức</p>
            <h2 className="mt-3 font-heading text-3xl text-brand-blue md:text-4xl">Cập nhật mới</h2>
          </div>
          <div className="mt-8">
            {featuredNews ? (
              <a
                href={featuredNews.link_url || "#"}
                className="group mx-auto flex max-w-4xl flex-col overflow-hidden rounded-[32px] border border-surface-border bg-white shadow-soft transition hover:-translate-y-1 md:flex-row"
              >
                <div className="h-56 w-full overflow-hidden bg-surface-light md:h-auto md:w-5/12">
                  {featuredNews.image_url ? (
                    <img
                      src={featuredNews.image_url}
                      alt={featuredNews.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-500">No image</div>
                  )}
                </div>
                <div className="flex w-full flex-col justify-center p-6 text-left md:w-7/12">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">News</p>
                  <h3 className="mt-3 font-heading text-2xl text-slate-900">{featuredNews.title}</h3>
                  {featuredNews.excerpt && <p className="mt-3 text-sm text-slate-600">{featuredNews.excerpt}</p>}
                  <span className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">
                    Xem chi tiết
                    <span className="text-base leading-none">→</span>
                  </span>
                </div>
              </a>
            ) : (
              <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-surface-border p-6 text-center text-sm text-slate-500">
                Chưa có tin tức nào.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
