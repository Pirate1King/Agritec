"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  videoUrl?: string;
  imageUrl?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function Hero({ title, subtitle, videoUrl, imageUrl, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-slate-900 text-white shadow-soft">
      <div className="absolute inset-0">
        {videoUrl ? (
          <video className="h-full w-full object-cover" src={videoUrl} autoPlay loop muted playsInline />
        ) : (
          imageUrl && <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>
      <div className="relative z-10 px-6 py-20 md:px-12 md:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">
            <span className="badge-dot" />
            Agritec B2B Solutions
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-semibold leading-tight md:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-slate-200 md:text-xl"
          >
            {subtitle}
          </motion.p>
          <div className="flex flex-wrap items-center gap-3">
            {primaryCta && (
              <Button variant="accent" size="lg" asChild>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button variant="primary" size="lg" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
