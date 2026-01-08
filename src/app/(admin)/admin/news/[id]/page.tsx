import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceSupabase } from "@/lib/supabase/service";
import { NewsForm } from "../_news-form";
import DeleteNews from "../delete-news";

type Props = { params: { id: string } };

export default async function EditNewsPage({ params }: Props) {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("news")
    .select("id, title, excerpt, content, image_url, link_url, sort_order, is_published")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <div className="text-red-600">Khong tim thay tin tuc.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">News</p>
          <h1 className="font-heading text-2xl text-brand-blue">Chinh sua tin tuc</h1>
        </div>
        <div className="flex items-center gap-3">
          <DeleteNews newsId={data.id} />
          <Button variant="ghost" asChild>
            <Link href="/admin/news">Quay lai</Link>
          </Button>
        </div>
      </div>
      <NewsForm news={data} />
    </div>
  );
}
