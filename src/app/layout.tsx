import type { Metadata } from "next";
import { Inter, Sora, Manrope } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Agritec | Giải pháp nông nghiệp B2B hiện đại",
  description: "Nền tảng giải pháp nông nghiệp chuyên nghiệp cho trang trại và nhà phân phối."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${sora.variable} ${manrope.variable} bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
