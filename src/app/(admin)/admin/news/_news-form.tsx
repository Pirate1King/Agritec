"use client";

import { upsertNews } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

declare global {
  interface Window {
    CKEDITOR?: any;
  }
}

type NewsFormProps = {
  news?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    image_url: string | null;
    link_url: string | null;
    sort_order: number | null;
    is_published: boolean;
  };
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? "Đang lưu..." : label}
    </Button>
  );
}

export function NewsForm({ news }: NewsFormProps) {
  const [state, formAction] = useFormState(upsertNews, { success: false, message: "" });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const loadEditor = () =>
      new Promise<void>((resolve) => {
        if (window.CKEDITOR) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });

    loadEditor().then(() => {
      if (cancelled || !textareaRef.current || !window.CKEDITOR) return;
      if (editorRef.current) return;
      editorRef.current = window.CKEDITOR.replace(textareaRef.current, {
        height: 220,
        removeButtons: "PasteFromWord"
      });
      if (news?.content) {
        editorRef.current.setData(news.content);
      }
      editorRef.current.on("change", () => {
        if (textareaRef.current) {
          textareaRef.current.value = editorRef.current.getData();
        }
      });
    });

    return () => {
      cancelled = true;
      if (editorRef.current) {
        editorRef.current.destroy(true);
        editorRef.current = null;
      }
    };
  }, [news?.content]);

  const handleSubmit = () => {
    if (editorRef.current && textareaRef.current) {
      textareaRef.current.value = editorRef.current.getData();
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-surface-border bg-surface-light p-6"
    >
      <input type="hidden" name="news_id" value={news?.id || ""} />

      <div>
        <label className="text-sm font-semibold text-slate-800">Tiêu đề</label>
        <input
          name="title"
          defaultValue={news?.title}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Tóm tắt</label>
        <textarea
          name="excerpt"
          defaultValue={news?.excerpt || ""}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Nội dung</label>
        <textarea
          id="news-content"
          name="content"
          ref={textareaRef}
          defaultValue={news?.content || ""}
          className="mt-2 w-full rounded-xl border border-surface-border px-3 py-3"
        />
        <p className="mt-2 text-xs text-slate-500">Trình soạn thảo CKEditor 4 sẽ được tải tự động.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-slate-800">Ảnh (URL)</label>
          <input name="image_url" defaultValue={news?.image_url || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Link</label>
          <input name="link_url" defaultValue={news?.link_url || ""} className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Thứ tự</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={news?.sort_order ?? 0}
            className="mt-2 w-full rounded-xl border border-surface-border px-3 py-2"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3 py-2">
        <input type="checkbox" name="is_published" defaultChecked={news?.is_published ?? true} className="h-4 w-4" />
        <span className="text-sm text-slate-700">Hiển thị tin tức</span>
      </label>

      {state.message && (
        <div className={`rounded-xl px-3 py-2 text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      )}

      <div className="flex justify-end">
        <SubmitButton label="Lưu tin tức" />
      </div>
    </form>
  );
}
