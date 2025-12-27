"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CartButton from "../nav/cart-button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/giai-phap", label: "Giải pháp" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/#why", label: "Tại sao Agritec" },
  { href: "/#process", label: "Quy trình" }
];

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const setFromLocation = () => setHash(window.location.hash);
    setFromLocation();
    window.addEventListener("hashchange", setFromLocation);
    return () => window.removeEventListener("hashchange", setFromLocation);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
    }
  }, [pathname]);

  const isActive = (href: string) => {
    const currentHash = hash || (typeof window !== "undefined" ? window.location.hash : "");
    if (href.startsWith("/#")) {
      const targetHash = href.replace("/", "");
      return pathname === "/" && currentHash === targetHash;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("/#")) {
      setHash(href.replace("/", ""));
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Agritec" width={36} height={36} className="rounded-lg" />
          <div>
            <p className="font-heading text-lg text-brand-blue leading-tight">AGRITEC</p>
            <p className="text-[12px] uppercase tracking-[0.2em] text-slate-500">Agriculture Solutions</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-semibold text-slate-700 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleAnchorClick(link.href)}
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  active ? "bg-surface-light text-brand-blue shadow-soft" : "hover:text-brand-blue"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <CartButton />
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://zalo.me" target="_blank">
              Tư vấn Zalo
            </Link>
          </Button>
          <motion.div whileHover={{ y: -1 }}>
            <Button variant="accent" size="sm" asChild>
              <Link href="/dat-hang">Đặt hàng</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
