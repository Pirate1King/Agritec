import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isLoginPage = pathname.startsWith("/admin/login");
  const logPrefix = `[middleware][${pathname}]`;

  // Allow login page through to render the form.
  if (isLoginPage) {
    console.log(`${logPrefix} allow login page`);
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env missing, block access to admin and send to login for visibility
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(`${logPrefix} missing env -> redirect to /admin/login`);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const res = NextResponse.next({
    request: {
      headers: req.headers
    }
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookies: { name: string; value: string; options: CookieOptions }[]) {
        cookies.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    console.log(`${logPrefix} no session -> redirect to /admin/login`);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  console.log(`${logPrefix} authenticated user, allow`);
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"]
};
