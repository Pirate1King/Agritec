"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/supabase/types";
import { OrderPayload } from "@/lib/types";

export async function submitOrder(payload: OrderPayload) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.warn("Supabase env not configured. Skipping insert, returning stub response.");
    return { success: true, message: "Đã ghi nhận yêu cầu. Vui lòng cấu hình Supabase để lưu đơn hàng." };
  }

  const supabase = createClient<Database>(supabaseUrl, serviceKey);

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      note: payload.note || "",
      payment_method: payload.payment_method,
      status: "pending"
    })
    .select()
    .single();

  if (error || !order) {
    console.error("Failed to insert order", error);
    return { success: false, message: "Không lưu được đơn hàng. Kiểm tra cấu hình Supabase." };
  }

  const items = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price ?? null
  }));

  const { error: itemError } = await supabase.from("order_items").insert(items);
  if (itemError) {
    console.error("Failed to insert order items", itemError);
    return { success: false, message: "Không lưu được chi tiết đơn hàng." };
  }

  revalidatePath("/admin/orders");
  return { success: true, message: "Đặt hàng thành công", orderId: order.id };
}
