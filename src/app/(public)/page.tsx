import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SolutionCard } from "@/components/solution-card";
import { Button } from "@/components/ui/button";
import { getSolutions, getProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ScrollCards } from "@/components/scroll-cards";

export default async function HomePage() {
  const [solutions, products] = await Promise.all([getSolutions(), getProducts()]);
  const featuredProducts = products.slice(0, 3);

  const heGiaiPhap = [
    {
      title: "Kiểm soát tiêu chảy kháng thuốc hiệu quả",
      points: [
        "Áp dụng cho tiêu chảy do vi khuẩn, virus, độc tố, nấm mốc, rong tảo, stress",
        "Không phụ thuộc kháng sinh, giảm nguy cơ nhờn thuốc",
        "Giải pháp sinh học thay thế kháng sinh",
        "Phù hợp mọi giai đoạn nuôi"
      ]
    },
    {
      title: "Hỗ trợ tiêu hoá & đường ruột",
      points: [
        "Cân bằng hệ vi sinh đường ruột",
        "Giảm phân lỏng, phân kháng định hình",
        "Tăng hấp thu dinh dưỡng",
        "Giúp đàn ăn ổn định và đồng đều hơn"
      ]
    },
    {
      title: "Giảm kháng sinh theo định hướng EU",
      points: [
        "Không dùng kháng sinh tăng trưởng",
        "Phù hợp xu hướng chăn nuôi Farm to Fork, One Health",
        "Giảm nguy cơ kháng kháng sinh",
        "Hướng tới chăn nuôi an toàn, bền vững"
      ]
    },
    {
      title: "An toàn sinh học & môi trường chăn nuôi",
      points: [
        "Sát trùng chuồng trại, thiết bị, phương tiện",
        "Giảm mầm bệnh tồn lưu trong môi trường",
        "Giảm mùi hại, ẩm chuồng",
        "Hạn chế tái nhiễm chéo trong đàn"
      ]
    }
  ];

  const moHinh = [
    {
      title: "Bước 01 · Xác định vấn đề & mục tiêu",
      points: ["Tiêu chảy kéo dài", "Đàn kém đồng đều", "Phụ thuộc kháng sinh", "Môi trường trại mất an toàn sinh học"]
    },
    {
      title: "Bước 02 · Chọn nhóm giải pháp phù hợp",
      points: ["Acid hữu cơ", "Butyrate", "Tannin", "Sát trùng môi trường", "Các thể dạng đến từ loạt combo"]
    },
    {
      title: "Bước 03 · Xây dựng phác đồ sử dụng",
      points: ["Pha vào nước uống", "Trộn vào thức ăn", "Phun sát trùng chuồng", "Áp dụng theo từng giai đoạn nuôi"]
    },
    {
      title: "Bước 04 · Theo dõi & điều chỉnh",
      points: [
        "Điều chỉnh liều lượng và thời điểm",
        "Thay đổi combo khi điều kiện trại thay đổi",
        "Hỗ trợ kỹ thuật xuyên suốt quá trình"
      ]
    }
  ];

  return (
    <div className="space-y-20">
      <div className="container">
        <Hero
          title="Giải pháp vận hành trang trại chăn nuôi B2B"
          subtitle="Mỗi giải pháp là một bộ triển khai hoàn chỉnh: sản phẩm + quy trình + thiết bị + combo ứng dụng thực tế."
          imageUrl="https://www.spireenergy.com/sites/default/files/styles/hero_image/public/2020-03/rsz_gettyimages-177750786.jpg?itok=zyV3xtCw"
          primaryCta={{ label: "Xem giải pháp", href: "/giai-phap" }}
          secondaryCta={{ label: "Sản phẩm", href: "/san-pham" }}
        />
      </div>

      <section className="container" id="solutions">
        <SectionHeader
          eyebrow="Solutions"
          title="Giải pháp trọng tâm của Agritec"
          description="Từ bệnh tiêu chảy, giám sát vi khuẩn - virus, sát trùng đường nước, kiểm soát tiêu chảy và dinh dưỡng chính xác."
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
          title="Thiết bị, hoá chất, phụ gia được kiểm chứng"
          description="Acidex/Globacid sát trùng đường nước, Mixtron pha trộn, cảm biến & điều khiển tới; đặt lẻ hoặc combo."
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

      <section className="container" id="he-giai-phap">
        <SectionHeader
          eyebrow="Hệ giải pháp"
          title="Hệ giải pháp chăn nuôi Agritec"
          description="Agritec triển khai nhiều nhóm giải pháp sinh học, dùng lẻ hoặc kết hợp thành combo để giải quyết bài toán thực tế."
        />
        <div className="mt-4">
          <ScrollCards items={heGiaiPhap} />
        </div>
      </section>

      <section className="container" id="mo-hinh-trien-khai">
        <SectionHeader
          eyebrow="Mô hình triển khai"
          title="Mô hình triển khai giải pháp tại trang trại"
          description="Không chỉ bán sản phẩm, Agritec xây dựng phác đồ dựa trên mục tiêu và hiện trạng trang trại."
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
            <p className="text-slate-100">
              Đừng tự vân vơ, để Agritec đánh giá mô hình, đề xuất giải pháp và cấu hình combo phù hợp.
            </p>
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
