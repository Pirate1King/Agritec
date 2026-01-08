"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPublicUrl, getServiceSupabase } from "@/lib/supabase/service";
import { Database } from "@/lib/supabase/types";
import { randomUUID } from "crypto";

type OrderStatus = Database["public"]["Tables"]["orders"]["Row"]["status"];
type ActionResult = { success: boolean; message: string };

const slugifyText = (val: string) =>
  val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export async function upsertSolution(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();

  const solutionId = formData.get("solution_id")?.toString() || null;
  const title = formData.get("title")?.toString().trim() || "";
  const slugInput = formData.get("slug")?.toString().trim() || "";
  const slug = slugInput || slugifyText(title);
  const excerpt = formData.get("excerpt")?.toString().trim() || "";
  const heroUrlInput = formData.get("hero_url")?.toString().trim() || null;
  const heroFile = formData.get("hero_upload") as File | null;
  const pdfFile = formData.get("pdf") as File | null;
  const problem = formData.get("problem")?.toString().trim() || null;
  const solution = formData.get("solution")?.toString().trim() || null;
  const productIds = formData.getAll("productIds").map((id) => id.toString()).filter(Boolean);
  const combosRaw = formData.get("combos_json")?.toString();

  let combosPayload:
    | {
        id?: string;
        name: string;
        description?: string | null;
        items: { product_id: string; quantity: number }[];
      }[]
    | [] = [];
  if (combosRaw) {
    try {
      combosPayload = JSON.parse(combosRaw);
    } catch {
      return { success: false, message: "Combo không hợp lệ" };
    }
  }

  if (!title || !excerpt) return { success: false, message: "Thiếu thông tin bắt buộc" };

  // slug uniqueness
  if (!solutionId) {
    const { data: existing } = await supabase.from("solutions").select("id").eq("slug", slug).maybeSingle();
    if (existing) return { success: false, message: "Slug đã tồn tại, chọn tên khác" };
  } else {
    const { data: existing } = await supabase.from("solutions").select("id").eq("slug", slug).neq("id", solutionId);
    if (existing && existing.length > 0) return { success: false, message: "Slug đã tồn tại, chọn tên khác" };
  }

  let idToUse = solutionId;
  let heroUrlToUse: string | null = heroUrlInput;

  // create first so we have id for uploads
  if (!idToUse) {
    const { data, error } = await supabase
      .from("solutions")
      .insert({ title, slug, excerpt, hero_url: heroUrlToUse, problem, solution, is_published: true })
      .select("id")
      .single();
    if (error || !data) return { success: false, message: error?.message || "Không thêm được giải pháp" };
    idToUse = data.id;
  }

  let pdf_url: string | undefined;
  if (pdfFile && pdfFile.size > 0) {
    const ext = pdfFile.name.split(".").pop();
    const filePath = `${idToUse}/${randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("solutions").upload(filePath, pdfFile, {
      cacheControl: "3600",
      contentType: pdfFile.type,
      upsert: true
    });
    if (uploadError) return { success: false, message: uploadError.message };
    pdf_url = getPublicUrl("solutions", filePath);
  }

  if (heroFile && heroFile.size > 0) {
    const ext = heroFile.name.split(".").pop();
    const filePath = `${idToUse}/hero-${randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("solutions").upload(filePath, heroFile, {
      cacheControl: "3600",
      contentType: heroFile.type,
      upsert: true
    });
    if (uploadError) return { success: false, message: uploadError.message };
    heroUrlToUse = getPublicUrl("solutions", filePath);
  }

  const updatePayload: Partial<Database["public"]["Tables"]["solutions"]["Insert"]> = {
    title,
    slug,
    excerpt,
    hero_url: heroUrlToUse,
    problem,
    solution,
    is_published: true
  };
  if (pdf_url !== undefined) updatePayload.pdf_url = pdf_url;

  const { error: updErr } = await supabase.from("solutions").update(updatePayload).eq("id", idToUse);
  if (updErr) return { success: false, message: updErr.message };

  // sync solution_products if provided (legacy)
  if (productIds.length > 0) {
    await supabase.from("solution_products").delete().eq("solution_id", idToUse);
    const links = productIds.map((pid) => {
      const qtyRaw = formData.get(`quantity_${pid}`);
      const qty = qtyRaw ? Number(qtyRaw) : 1;
      return { solution_id: idToUse!, product_id: pid, quantity: qty > 0 ? qty : 1 };
    });
    const { error } = await supabase.from("solution_products").insert(links);
    if (error) return { success: false, message: error.message };
  }

  // handle combos inline
  if (combosPayload && combosPayload.length >= 0) {
    const keepIds = combosPayload.filter((c) => c.id).map((c) => c.id!) as string[];
    if (keepIds.length > 0) {
      await supabase.from("solution_combos").delete().eq("solution_id", idToUse).not("id", "in", `(${keepIds.join(",")})`);
    } else {
      await supabase.from("solution_combos").delete().eq("solution_id", idToUse);
    }

    for (const combo of combosPayload) {
      if (!combo.name || !combo.items || combo.items.length === 0) continue;
      const name = combo.name.trim();
      const description = combo.description?.toString() || null;
      const comboSlug = slugifyText(name);

      if (combo.id) {
        await supabase.from("solution_combos").update({ name, description, slug: comboSlug, is_active: true }).eq("id", combo.id);
        await supabase.from("combo_items").delete().eq("combo_id", combo.id);
        const items = combo.items
          .filter((i) => i.quantity > 0)
          .map((i) => ({ combo_id: combo.id!, product_id: i.product_id, quantity: i.quantity || 1 }));
        if (items.length > 0) {
          await supabase.from("combo_items").insert(items);
        }
      } else {
        const { data: comboInsert } = await supabase
          .from("solution_combos")
          .insert({ solution_id: idToUse, name, description, slug: comboSlug, is_active: true })
          .select("id")
          .single();
        if (comboInsert?.id) {
          const items = combo.items
            .filter((i) => i.quantity > 0)
            .map((i) => ({ combo_id: comboInsert.id, product_id: i.product_id, quantity: i.quantity || 1 }));
          if (items.length > 0) await supabase.from("combo_items").insert(items);
        }
      }
    }

    // Sync solution_products as union of all combo items
    const { data: comboProducts } = await supabase
      .from("solution_combos")
      .select("combo_items(product_id, quantity)")
      .eq("solution_id", idToUse);
    const merged = new Map<string, number>();
    comboProducts?.forEach((c: any) =>
      c.combo_items?.forEach((item: any) => {
        const cur = merged.get(item.product_id) || 0;
        merged.set(item.product_id, Math.max(cur, item.quantity || 1));
      })
    );
    await supabase.from("solution_products").delete().eq("solution_id", idToUse);
    const linkRows = Array.from(merged.entries()).map(([pid, qty]) => ({
      solution_id: idToUse!,
      product_id: pid,
      quantity: qty || 1
    }));
    if (linkRows.length > 0) await supabase.from("solution_products").insert(linkRows);
  }

  revalidatePath("/admin/solutions");
  revalidatePath(`/admin/solutions/${idToUse}`);
  return { success: true, message: "Đã lưu giải pháp" };
}

export async function upsertProduct(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();

  const productId = formData.get("product_id")?.toString() || null;
  const name = formData.get("name")?.toString().trim() || "";
  const slugInput = formData.get("slug")?.toString().trim() || "";
  const slug = slugInput || slugifyText(name);
  const unit = formData.get("unit")?.toString().trim() || "";
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const description = formData.get("description")?.toString().trim() || null;
  const excerpt = formData.get("excerpt")?.toString().trim() || null;
  const solutionIds = formData.getAll("solutionIds").map((id) => id.toString()).filter(Boolean);
  const primaryImageId = formData.get("primaryImage")?.toString() || null;
  const uploadFiles = formData.getAll("images").filter((file) => file instanceof File && file.size > 0) as File[];

  if (!name) return { success: false, message: "Thiếu thông tin bắt buộc" };

  // slug uniqueness
  if (!productId) {
    const { data: existing } = await supabase.from("products").select("id").eq("slug", slug).maybeSingle();
    if (existing) return { success: false, message: "Slug đã tồn tại, chọn tên khác" };
  } else {
    const { data: existing } = await supabase.from("products").select("id").eq("slug", slug).neq("id", productId);
    if (existing && existing.length > 0) return { success: false, message: "Slug đã tồn tại, chọn tên khác" };
  }

  let idToUse = productId;
  if (productId) {
    const { error } = await supabase
      .from("products")
      .update({ name, slug, unit, price, description, excerpt, is_published: true })
      .eq("id", productId);
    if (error) return { success: false, message: error.message };
  } else {
    const { data, error } = await supabase
      .from("products")
      .insert({ name, slug, unit, price, description, excerpt, is_published: true })
      .select("id")
      .single();
    if (error || !data) return { success: false, message: error?.message || "Không thêm được sản phẩm" };
    idToUse = data.id;
  }

  if (!idToUse) return { success: false, message: "Thiếu product id" };

  // link solutions
  await supabase.from("solution_products").delete().eq("product_id", idToUse);
  if (solutionIds.length > 0) {
    const links = solutionIds.map((sid) => ({ solution_id: sid, product_id: idToUse! }));
    const { error } = await supabase.from("solution_products").insert(links);
    if (error) return { success: false, message: error.message };
  }

  const uploadedImageIds: string[] = [];
  if (uploadFiles.length > 0) {
    for (const file of uploadFiles) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${idToUse}/${randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("products").upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false
      });
      if (uploadError) return { success: false, message: uploadError.message };

      const publicUrl = getPublicUrl("products", filePath);
      const { data, error: insertError } = await supabase
        .from("product_images")
        .insert({ product_id: idToUse, url: publicUrl, is_primary: false })
        .select("id")
        .single();
      if (insertError || !data) return { success: false, message: insertError?.message || "Image insert failed" };
      uploadedImageIds.push(data.id);
    }
  }

  let primaryId = primaryImageId;
  if (!primaryId && uploadedImageIds.length > 0) {
    primaryId = uploadedImageIds[0];
  }

  if (primaryId) {
    await supabase.from("product_images").update({ is_primary: false }).eq("product_id", idToUse);
    const { error } = await supabase.from("product_images").update({ is_primary: true }).eq("id", primaryId);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/admin/products");
  if (idToUse) revalidatePath(`/admin/products/${idToUse}`);
  return { success: true, message: "Đã lưu sản phẩm" };
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true, message: "Updated order" };
}

export async function updateOrderStatusAction(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const orderId = formData.get("order_id")?.toString();
  const status = formData.get("status")?.toString() as OrderStatus;
  if (!orderId) return { success: false, message: "Thiếu ID đơn hàng" };
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true, message: "Đã cập nhật trạng thái" };
}

export async function deleteSolution(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const id = formData.get("solution_id")?.toString();
  if (!id) return { success: false, message: "Thiếu ID giải pháp" };
  const { error } = await supabase.from("solutions").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/solutions");
  redirect("/admin/solutions");
}

export async function deleteProduct(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const id = formData.get("product_id")?.toString();
  if (!id) return { success: false, message: "Thiếu ID sản phẩm" };
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// Legacy combo actions (kept for compatibility, though combos now managed inside solution form)
export async function upsertCombo(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const comboId = formData.get("combo_id")?.toString() || null;
  const solution_id = formData.get("solution_id")?.toString() || "";
  const name = formData.get("name")?.toString().trim() || "";
  const slugInput = formData.get("slug")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || null;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const is_active = true;

  const slug = slugInput || slugifyText(name);

  if (!solution_id || !name) return { success: false, message: "Thiếu thông tin combo" };

  let comboIdToUse = comboId;
  if (comboId) {
    const { error } = await supabase
      .from("solution_combos")
      .update({ name, slug, description, price, is_active })
      .eq("id", comboId);
    if (error) return { success: false, message: error.message };
  } else {
    const { data, error } = await supabase
      .from("solution_combos")
      .insert({ solution_id, name, slug, description, price, is_active })
      .select("id")
      .single();
    if (error || !data) return { success: false, message: error?.message || "Không tạo được combo" };
    comboIdToUse = data.id;
  }

  if (!comboIdToUse) return { success: false, message: "Thiếu combo id" };
  await supabase.from("combo_items").delete().eq("combo_id", comboIdToUse);
  const items: { combo_id: string; product_id: string; quantity: number }[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith("combo_qty_")) {
      const product_id = key.replace("combo_qty_", "");
      const qty = Number(value);
      if (!isNaN(qty) && qty > 0) {
        items.push({ combo_id: comboIdToUse!, product_id, quantity: qty });
      }
    }
  });
  if (items.length > 0) {
    const { error } = await supabase.from("combo_items").insert(items);
    if (error) return { success: false, message: error.message };
  }

  const { data: comboProducts, error: comboItemsErr } = await supabase
    .from("solution_combos")
    .select("combo_items(product_id, quantity)")
    .eq("solution_id", solution_id);
  if (!comboItemsErr) {
    const merged = new Map<string, number>();
    comboProducts?.forEach((c) => {
      c.combo_items?.forEach((item: any) => {
        const cur = merged.get(item.product_id) || 0;
        merged.set(item.product_id, Math.max(cur, item.quantity || 1));
      });
    });
    const linkRows = Array.from(merged.entries()).map(([pid, qty]) => ({
      solution_id,
      product_id: pid,
      quantity: qty || 1
    }));
    await supabase.from("solution_products").delete().eq("solution_id", solution_id);
    if (linkRows.length > 0) {
      await supabase.from("solution_products").insert(linkRows);
    }
  }

  revalidatePath(`/admin/solutions/${solution_id}`);
  revalidatePath("/admin/solutions");
  return { success: true, message: "Đã lưu combo" };
}

export async function deleteCombo(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const comboId = formData.get("combo_id")?.toString();
  const solutionId = formData.get("solution_id")?.toString();
  if (!comboId) return { success: false, message: "Thiếu combo id" };
  const { error } = await supabase.from("solution_combos").delete().eq("id", comboId);
  if (error) return { success: false, message: error.message };
  if (solutionId) {
    revalidatePath(`/admin/solutions/${solutionId}`);
  }
  revalidatePath("/admin/solutions");
  return { success: true, message: "Đã xoá combo" };
}

export async function upsertNews(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const newsId = formData.get("news_id")?.toString() || null;
  const title = formData.get("title")?.toString().trim() || "";
  const excerpt = formData.get("excerpt")?.toString().trim() || null;
  const content = formData.get("content")?.toString().trim() || null;
  const image_url = formData.get("image_url")?.toString().trim() || null;
  const link_url = formData.get("link_url")?.toString().trim() || null;
  const sort_order = formData.get("sort_order") ? Number(formData.get("sort_order")) : 0;
  const is_published = formData.get("is_published") === "on";

  if (!title) return { success: false, message: "Thieu tieu de" };

  if (newsId) {
    const { error } = await supabase
      .from("news")
      .update({ title, excerpt, content, image_url, link_url, sort_order, is_published })
      .eq("id", newsId);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase
      .from("news")
      .insert({ title, excerpt, content, image_url, link_url, sort_order, is_published });
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/admin/news");
  if (newsId) revalidatePath(`/admin/news/${newsId}`);
  revalidatePath("/");
  return { success: true, message: "Da luu tin tuc" };
}

export async function deleteNews(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const id = formData.get("news_id")?.toString();
  if (!id) return { success: false, message: "Thieu ID tin tuc" };
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function upsertPartner(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const partnerId = formData.get("partner_id")?.toString() || null;
  const name = formData.get("name")?.toString().trim() || "";
  const logo_url = formData.get("logo_url")?.toString().trim() || null;
  const website_url = formData.get("website_url")?.toString().trim() || null;
  const sort_order = formData.get("sort_order") ? Number(formData.get("sort_order")) : 0;
  const is_active = formData.get("is_active") === "on";

  if (!name) return { success: false, message: "Thieu ten doi tac" };

  if (partnerId) {
    const { error } = await supabase
      .from("partners")
      .update({ name, logo_url, website_url, sort_order, is_active })
      .eq("id", partnerId);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase.from("partners").insert({ name, logo_url, website_url, sort_order, is_active });
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/admin/partners");
  if (partnerId) revalidatePath(`/admin/partners/${partnerId}`);
  revalidatePath("/");
  return { success: true, message: "Da luu doi tac" };
}

export async function deletePartner(prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = getServiceSupabase();
  const id = formData.get("partner_id")?.toString();
  if (!id) return { success: false, message: "Thieu ID doi tac" };
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners");
}
