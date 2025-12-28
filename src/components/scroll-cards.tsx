"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = {
  title: string;
  points: string[];
};

type Props = {
  items: Item[];
};

export function ScrollCards({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: "prev" | "next") => {
    if (isMobile) {
      const el = listRef.current;
      if (!el) return;
      const shift = el.clientWidth * 0.8;
      el.scrollBy({ left: dir === "prev" ? -shift : shift, behavior: "smooth" });
      // optimistic index update for dots
      setIndex((prev) => {
        if (dir === "prev") return prev === 0 ? items.length - 1 : prev - 1;
        return prev === items.length - 1 ? 0 : prev + 1;
      });
      return;
    }
    setIndex((prev) => {
      if (dir === "prev") return prev === 0 ? items.length - 1 : prev - 1;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => go("prev")} aria-label="Trượt trái">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => go("next")} aria-label="Trượt phải">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {isMobile ? (
        <div className="mt-12">
          <div
            ref={listRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
            onScroll={() => {
              const el = listRef.current;
              if (!el) return;
              const cardWidth = el.clientWidth * 0.86;
              const current = Math.round(el.scrollLeft / (cardWidth + 16));
              setIndex((current + items.length) % items.length);
            }}
          >
            {items.map((item) => (
              <div
                key={item.title}
                className="min-w-[86%] snap-center rounded-2xl border border-surface-border bg-gradient-to-br from-white to-surface-light p-5 shadow-soft"
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-brand-orange" />
                <h4 className="font-heading text-lg text-brand-blue">{item.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-brand-orange">●</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {items.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 w-2.5 rounded-full transition ${idx === index ? "bg-brand-blue" : "bg-surface-border"}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-12 h-[280px] overflow-hidden">
          {items.map((item, idx) => {
            const offset = (idx - index + items.length) % items.length;
            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === items.length - 1;
            if (!isCenter && !isRight && !isLeft) return null;

            const sideShift = 240;
            const translate = isCenter ? 0 : isRight ? sideShift : -sideShift;
            const opacity = isCenter ? 1 : 0.35;
            const scale = isCenter ? 1 : 0.9;
            const z = isCenter ? 30 : 10;

            return (
              <div
                key={item.title}
                className="absolute left-1/2 top-0 w-[92%] max-w-[440px] -translate-x-1/2 rounded-2xl border border-surface-border bg-gradient-to-br from-white to-surface-light p-5 shadow-soft transition-all duration-300"
                style={{
                  transform: `translateX(${translate}px) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  boxShadow: isCenter ? "0 20px 45px rgba(36,60,155,0.18)" : "0 12px 24px rgba(15,23,42,0.08)"
                }}
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-brand-orange" />
                <h4 className="font-heading text-lg text-brand-blue">{item.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-brand-orange">●</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="mt-3 flex justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${idx === index ? "bg-brand-blue" : "bg-surface-border"}`}
                aria-label={`Chọn thẻ ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
