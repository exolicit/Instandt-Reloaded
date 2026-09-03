import { afterEach, describe, expect, it, vi } from "vitest";
import { getSupabaseEnv, requireSupabaseEnv } from "./env";

describe("getSupabaseEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("gibt null zurück, wenn nichts konfiguriert ist", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    expect(getSupabaseEnv()).toBeNull();
  });

  it("bevorzugt den Publishable Key", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_123");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon_456");
    expect(getSupabaseEnv()).toEqual({
      url: "https://example.supabase.co",
      publishableKey: "sb_publishable_123",
    });
  });

  it("fällt auf den Anon Key zurück", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon_456");
    expect(getSupabaseEnv()?.publishableKey).toBe("anon_456");
  });

  it("requireSupabaseEnv wirft einen verständlichen Fehler", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    expect(() => requireSupabaseEnv()).toThrow(/nicht konfiguriert/);
  });
});
