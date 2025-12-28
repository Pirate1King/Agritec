import { SolutionCard } from "@/components/solution-card";
import { SectionHeader } from "@/components/section-header";
import { Hero } from "@/components/hero";
import { getSolutions } from "@/lib/queries";

const HERO_IMAGE = "https://www.spireenergy.com/sites/default/files/styles/hero_image/public/2020-03/rsz_gettyimages-177750786.jpg?itok=zyV3xtCw";

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="space-y-16">
      <div className="container">
        <Hero
          title="Giải pháp vận hành trang trại chuẩn B2B"
          subtitle="Mỗi giải pháp được thiết kế với bộ sản phẩm, quy trình và combo cụ thể để triển khai nhanh."
          imageUrl={HERO_IMAGE}
          primaryCta={{ label: "Đặt hàng", href: "/dat-hang" }}
          secondaryCta={{ label: "Tư vấn Zalo", href: "https://zalo.me/0977791412" }}
        />
      </div>

      <section className="container">
        <SectionHeader
          eyebrow="Solutions"
          title="Danh mục giải pháp"
          description="Chọn giải pháp phù hợp, xem sản phẩm và combo đi kèm."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>
    </div>
  );
}
