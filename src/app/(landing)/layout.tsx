export const revalidate = 180;

import { Footer } from "@/components/layout/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <Footer />
    </div>
  );
}
