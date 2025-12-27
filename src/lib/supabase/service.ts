import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getServiceSupabase() {
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase environment variables are missing for admin operations.");
  }
  return createClient<Database>(supabaseUrl, serviceKey);
}

export const getPublicUrl = (bucket: string, path: string) => {
  if (!supabaseUrl) {
    throw new Error("Supabase URL missing");
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};
