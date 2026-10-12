import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

function requireEnvironmentValue(value: string | undefined, name: string) {
  if (!value) throw new Error(`Set ${name} in your environment.`);
  return value;
}

const supabaseUrl = requireEnvironmentValue(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  "EXPO_PUBLIC_SUPABASE_URL",
);
const supabaseAnonKey = requireEnvironmentValue(
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_KEY,
  "EXPO_PUBLIC_SUPABASE_KEY",
);

export function createClerkSupabaseClient(getToken: () => Promise<string | null>) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    accessToken: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Your session has expired. Sign in again before saving your profile.");
      }
      return token;
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
