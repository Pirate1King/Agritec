import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={cn("space-y-3", align === "center" ? "text-center mx-auto max-w-3xl" : "")}>
      {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
      <h2 className="font-heading text-3xl font-semibold text-brand-blue md:text-4xl">{title}</h2>
      {description && <p className="text-lg text-slate-600">{description}</p>}
    </div>
  );
}
