import { getComboBySlug, getProductBySlug } from "@/lib/queries";
import { type CartItem } from "@/store/cart-store";
import OrderForm from "./order-form";
import { getSolutionBySlug } from "@/lib/queries";

type OrderPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const comboSlug = typeof searchParams.combo === "string" ? searchParams.combo : undefined;
  const productSlug = typeof searchParams.product === "string" ? searchParams.product : undefined;
  const solutionSlug = typeof searchParams.solution === "string" ? searchParams.solution : undefined;

  let prefill: CartItem[] = [];

  if (comboSlug) {
    const combo = await getComboBySlug(comboSlug);
    if (combo?.items) {
      prefill = combo.items.map((item) => ({
        productId: item.product_id,
        name: item.product?.name || "Sản phẩm combo",
        quantity: item.quantity,
        price: item.product?.price,
        unit: item.product?.unit
      }));
    }
  } else if (solutionSlug) {
    const solution = await getSolutionBySlug(solutionSlug);
    if (solution?.products) {
      prefill = solution.products.map((p) => ({
        productId: p.id,
        name: p.name,
        quantity: p.linkQuantity || 1,
        price: p.price,
        unit: p.unit
      }));
    }
  } else if (productSlug) {
    const product = await getProductBySlug(productSlug);
    if (product) {
      prefill = [
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          unit: product.unit
        }
      ];
    }
  }

  return (
    <section className="container space-y-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">Đặt hàng</p>
        <h1 className="font-heading text-3xl text-brand-blue">Thanh toán nhanh cho trang trại & đại lý</h1>
        <p className="text-slate-600">Giỏ hàng có thể tự động điền từ combo giải pháp hoặc sản phẩm đơn lẻ.</p>
      </div>
      <OrderForm prefillItems={prefill} />
    </section>
  );
}
