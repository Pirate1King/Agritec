import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/solutions", label: "Solutions" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-light">
      <header className="flex items-center justify-between border-b border-surface-border bg-white px-8 py-4">
        <Link href="/" className="text-sm font-semibold text-brand-blue">
          AGRITEC Admin
        </Link>
        <Button variant="ghost" size="sm">
          Đăng xuất
        </Button>
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
