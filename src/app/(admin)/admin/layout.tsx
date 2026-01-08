import Link from "next/link";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import { AdminUserMenu } from "@/components/admin/user-menu";

const navItems = [
  { href: "/admin/solutions", label: "Solutions" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/partners", label: "Partners" }
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const userEmail =
    session.user.email ||
    (typeof session.user.user_metadata?.email === "string" ? session.user.user_metadata.email : null);

  return (
    <div className="min-h-screen bg-surface-light">
      <header className="flex items-center justify-between border-b border-surface-border bg-white px-8 py-4">
        <Link href="/" className="text-sm font-semibold text-brand-blue">
          AGRITEC Admin
        </Link>
        <AdminUserMenu email={userEmail} />
      </header>
      <div className="grid gap-6 px-6 py-6 md:grid-cols-[260px,1fr]">
        <aside className="rounded-2xl border border-surface-border bg-white p-4 shadow-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quản trị</p>
          <nav className="mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-surface-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft">{children}</main>
      </div>
    </div>
  );
}
