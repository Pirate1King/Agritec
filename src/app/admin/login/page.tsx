"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const supabase = getBrowserSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setMessage("Thiếu cấu hình Supabase");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    router.replace("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-surface-border bg-white p-8 shadow-soft">
        <div className="space-y-1 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Agritec Admin</p>
          <h1 className="font-heading text-2xl text-brand-blue">Đăng nhập</h1>
          <p className="text-sm text-slate-600">Đăng nhập bằng tài khoản Supabase đã được cấp quyền.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-800">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-800">Mật khẩu</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2" />
          </div>
          {message && <p className="text-sm text-red-600">{message}</p>}
          <Button type="submit" variant="accent" className="w-full" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}
