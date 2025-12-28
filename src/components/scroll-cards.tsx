"use client";

import { useEffect, useState } from "react";
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
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: "prev" | "next") => {
    setIndex((prev) => {
      if (dir === "prev") return prev === 0 ? items.length - 1 : prev - 1;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  };

  const sideShift = width >= 1200 ? 240 : width >= 900 ? 200 : 150;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute right-0 top-0 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => go("prev")} aria-label="Trượt trái">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => go("next")} aria-label="Trượt phải">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative mt-12 h-[300px] overflow-hidden">
        {items.map((item, idx) => {
          const offset = (idx - index + items.length) % items.length;
          const isCenter = offset === 0;
          const isRight = offset === 1;
          const isLeft = offset === items.length - 1;
          if (!isCenter && !isRight && !isLeft) return null;

          const translate = isCenter ? 0 : isRight ? sideShift : -sideShift;
          const opacity = isCenter ? 1 : 0.5;
          const scale = isCenter ? 1 : 0.9;
          const z = isCenter ? 20 : 5;

          return (
            <div
              key={item.title}
              className="absolute left-1/2 top-0 w-[92%] max-w-[460px] -translate-x-1/2 rounded-2xl border border-surface-border bg-gradient-to-br from-white to-surface-light p-5 shadow-soft transition-all duration-300"
              style={{
                transform: `translateX(${translate}px) scale(${scale})`,
                opacity,
                zIndex: z,
                boxShadow: isCenter ? "0 18px 40px rgba(36,60,155,0.18)" : "0 12px 24px rgba(15,23,42,0.08)"
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
      </div>

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
  );
}
