import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SolutionCard } from "@/components/solution-card";
import { Button } from "@/components/ui/button";
import { getSolutions, getProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function HomePage() {
  const [solutions, products] = await Promise.all([getSolutions(), getProducts()]);

  const featuredProducts = products.slice(0, 3);

  const processSteps = [
    { title: "Khảo sát nhanh", detail: "Phân tích hệ thống tưới, điện, nguồn nước và hiện trạng vận hành." },
    { title: "Thiết kế giải pháp", detail: "Đề xuất cấu hình thiết bị, lưu đồ vận hành, chi phí và ROI dự kiến." },
    { title: "Triển khai & kiểm thử", detail: "Lắp đặt, hiệu chỉnh áp lực, tích hợp cảm biến và dashboard." },
    { title: "Đào tạo & vận hành", detail: "Bàn giao quy trình, hướng dẫn kỹ thuật, hỗ trợ 24/7 qua Zalo." }
  ];

  return (
    <div className="space-y-20">
      <div className="container">
        <Hero
          title="Nền tảng giải pháp nông nghiệp dành cho doanh nghiệp"
          subtitle="Agritec thiết kế và triển khai hệ thống tưới, giám sát vi khí hậu và dinh dưỡng chính xác cho trang trại và nhà phân phối."
          videoUrl="https://cdn.coverr.co/videos/coverr-green-leaves-1543/1080p.mp4"
          primaryCta={{ label: "Xem giải pháp", href: "/giai-phap" }}
          secondaryCta={{ label: "Đặt hàng", href: "/dat-hang" }}
        />
      </div>

      <section className="container" id="solutions">
        <SectionHeader
          eyebrow="Solutions"
          title="Giải pháp cốt lõi của Agritec"
          description="Thiết kế để giải quyết các vấn đề vận hành thực tế: thiếu nhân công, dữ liệu rời rạc, chi phí nước điện tăng cao."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>

      <section className="container" id="why">
        <div className="rounded-[32px] border border-surface-border bg-surface-light px-8 py-12 shadow-soft">
          <SectionHeader
            eyebrow="Why Agritec"
            title="Thiết kế cho vận hành doanh nghiệp"
            description="Được sử dụng bởi các trang trại quy mô 5-200ha và nhà phân phối khu vực."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Chuẩn B2B", desc: "Hợp đồng rõ ràng, SLA hỗ trợ, dashboard cho nhiều nông trường." },
              { title: "Tích hợp IoT", desc: "Kết nối cảm biến, camera, bộ điều khiển tưới trong một nền tảng." },
              { title: "Hạ tầng Supabase", desc: "Bảo mật, lưu trữ hình ảnh, realtime, sẵn sàng mở rộng." }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold text-brand-orange">Trust</p>
                <h3 className="mt-2 font-heading text-xl text-brand-blue">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <SectionHeader
          eyebrow="Sản phẩm nổi bật"
          title="Thiết bị và vật tư sẵn sàng giao ngay"
          description="Đồng bộ với giải pháp Agritec, có thể đặt riêng lẻ hoặc theo combo giải pháp."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
              <h3 className="mt-2 font-heading text-xl text-brand-blue">{product.name}</h3>
              <p className="mt-2 text-slate-600">{product.excerpt}</p>
              <div className="mt-4 text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</div>
              <div className="mt-4 flex gap-3">
                <Button variant="primary" size="sm" asChild>
                  <Link href={`/san-pham/${product.slug}`}>Chi tiết</Link>
                </Button>
                <Button variant="accent" size="sm" asChild>
                  <Link href={`/dat-hang?product=${product.slug}`}>Đặt hàng</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" id="process">
        <div className="rounded-[28px] border border-surface-border bg-white px-8 py-12 shadow-soft">
          <SectionHeader
            eyebrow="Process"
            title="Quy trình triển khai 4 bước"
            description="Thiết kế lean, rõ ràng, ưu tiên thời gian đưa vào vận hành."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-surface-light p-5 transition hover:-translate-y-1 hover:shadow-soft"
                style={{ transitionDuration: "250ms" }}
              >
                <span className="text-sm font-semibold text-brand-orange">0{index + 1}</span>
                <h4 className="font-heading text-lg text-brand-blue">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-brand-blue bg-brand-blue px-8 py-10 text-white shadow-soft md:flex-row md:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">Ready to deploy</p>
            <h3 className="font-heading text-3xl font-semibold">Triển khai giải pháp Agritec cho vụ mùa tiếp theo</h3>
            <p className="text-slate-100">
              Đặt lịch tư vấn hoặc chọn ngay combo phù hợp. Đội ngũ kỹ thuật sẽ chuẩn bị cấu hình và báo giá trong 24h.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/dat-hang">Đặt hàng</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="https://zalo.me" target="_blank">
                Tư vấn Zalo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
