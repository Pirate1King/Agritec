"use client";

import { useRouter } from "next/navigation";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Props = {
  email?: string | null;
};

export function AdminUserMenu({ email }: Props) {
  const router = useRouter();
  const supabase = getBrowserSupabaseClient();

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.replace("/admin/login");
  };

  return (
    <div className="flex items-center gap-3">
      {email && <span className="text-sm text-slate-600">{email}</span>}
      <Button variant="secondary" size="sm" onClick={handleSignOut}>
        Đăng xuất
      </Button>
    </div>
  );
}
