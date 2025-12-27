import { SectionHeader } from "@/components/section-header";
import { getProducts, getSolutions } from "@/lib/queries";
import ProductsFilter from "./products-filter";

export default async function ProductsPage() {
  const [products, solutions] = await Promise.all([getProducts(), getSolutions()]);

  return (
    <section className="container space-y-10">
      <SectionHeader
        eyebrow="Products"
        title="Danh mục sản phẩm Agritec"
        description="Thiết bị và vật tư được kiểm định, tương thích với các giải pháp Agritec."
      />
      <ProductsFilter products={products} solutions={solutions} />
    </section>
  );
}
