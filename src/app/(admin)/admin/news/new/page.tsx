import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsForm } from "../_news-form";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-orange">News</p>
          <h1 className="font-heading text-2xl text-brand-blue">Them tin tuc</h1>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/news">Quay lai</Link>
        </Button>
      </div>
      <NewsForm />
    </div>
  );
}
