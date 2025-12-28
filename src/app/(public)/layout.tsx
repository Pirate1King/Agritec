import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Revalidate public pages periodically to improve first-byte speed while keeping content relatively fresh
export const revalidate = 180;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}
