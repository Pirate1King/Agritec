import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SolutionCard } from "@/components/solution-card";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ScrollCards } from "@/components/scroll-cards";
import { getSolutions, getProducts } from "@/lib/queries";

export default async function LivestockPage() {
  const [solutions, products] = await Promise.all([getSolutions(), getProducts()]);
  const featuredProducts = products.slice(0, 3);

  const heGiaiPhap = [
    {
      title: "Kiểm soát tiêu chảy kháng thuốc",
      points: [
        "Ứng dụng cho tiêu chảy do vi khuẩn, virus, độc tố",
        "Giảm lệ thuộc kháng sinh",
        "Giải pháp sinh học thay thế",
        "Phù hợp mọi giai đoạn nuôi"
      ]
    },
    {
      title: "Hỗ trợ tiêu hóa & đường ruột",
      points: [
        "Cân bằng hệ vi sinh",
        "Giảm phân lỏng, ổn định phân",
        "Tăng hấp thu dinh dưỡng",
        "Ổn định tăng trưởng"
      ]
    },
    {
      title: "Giảm kháng sinh theo chuẩn EU",
      points: [
        "Không dùng kháng sinh tăng trưởng",
        "Phù hợp Farm to Fork, One Health",
        "Giảm nguy cơ kháng kháng sinh",
        "Hướng đến chăn nuôi bền vững"
      ]
    },
    {
      title: "An toàn sinh học & môi trường",
      points: [
        "Sát trùng chuồng trại, thiết bị",
        "Giảm mầm bệnh tồn lưu",
        "Giảm mùi hôi, ẩm chuồng",
        "Hạn chế tái nhiễm chéo"
      ]
    }
  ];

  const moHinh = [
    {
      title: "Bước 01: Xác định vấn đề",
      points: ["Tiêu chảy kéo dài", "Đàn kém đồng đều", "Lệ thuộc kháng sinh", "Môi trường trại chưa ổn"]
    },
    {
      title: "Bước 02: Chọn nhóm giải pháp",
      points: ["Acid hữu cơ", "Butyrate", "Tannin", "Sát trùng môi trường", "Combo phù hợp"]
    },
    {
      title: "Bước 03: Xây dựng phác đồ",
      points: ["Pha vào nước uống", "Trộn vào thức ăn", "Phun sát trùng", "Theo giai đoạn nuôi"]
    },
    {
      title: "Bước 04: Theo dõi & điều chỉnh",
      points: ["Tối ưu liều lượng", "Điều chỉnh combo", "Hỗ trợ kỹ thuật xuyên suốt"]
    }
  ];

  return (
    <div className="space-y-20">
      <div className="container">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-blue"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Link>
        <Hero
          title="Giải pháp vận hành trang trại chăn nuôi B2B"
          subtitle="Mỗi giải pháp là một bộ triển khai hoàn chỉnh: sản phẩm + quy trình + thiết bị + combo ứng dụng thực tế."
          imageUrl="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80"
          primaryCta={{ label: "Xem giải pháp", href: "/giai-phap" }}
          secondaryCta={{ label: "Sản phẩm", href: "/san-pham" }}
        />
      </div>

      <section className="container" id="solutions">
        <SectionHeader
          eyebrow="Solutions"
          title="Giải pháp trọng tâm của Agritec"
          description="Từ tiêu chảy, vi khuẩn - virus, sát trùng nước uống đến dinh dưỡng chính xác."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeader
          eyebrow="Sản phẩm nổi bật"
          title="Thiết bị, hoạt chất, phụ gia đã kiểm chứng"
          description="Acidex/Globacid, Mixtron, cảm biến và thiết bị điều khiển."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container" id="he-giai-phap">
        <SectionHeader
          eyebrow="Hệ giải pháp"
          title="Hệ giải pháp chăn nuôi Agritec"
          description="Tổng hợp các nhóm giải pháp sinh học theo từng mục tiêu vận hành."
        />
        <div className="mt-4">
          <ScrollCards items={heGiaiPhap} />
        </div>
      </section>

      <section className="container" id="mo-hinh-trien-khai">
        <SectionHeader
          eyebrow="Mô hình triển khai"
          title="Mô hình triển khai giải pháp tại trang trại"
          description="Đánh giá hiện trạng, xây dựng phác đồ và theo dõi hiệu quả."
        />
        <div className="mt-4">
          <ScrollCards items={moHinh} />
        </div>
      </section>

      <section className="container">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-brand-blue bg-brand-blue px-8 py-10 text-white shadow-soft md:flex-row md:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">Ready to deploy</p>
            <h3 className="font-heading text-3xl font-semibold">Sẵn sàng triển khai giải pháp cho trang trại của bạn</h3>
            <p className="text-slate-100">Đặt lịch tư vấn để Agritec đề xuất combo phù hợp.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/dat-hang">Đặt hàng</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="https://zalo.me/0977791412" target="_blank">
                Tư vấn
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
