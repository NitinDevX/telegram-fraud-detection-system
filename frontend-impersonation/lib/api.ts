import { TelegramResult } from "@/types/telegram";

const API_BASE = "https://telegram-backend-production-d698.up.railway.app";

export async function scanBrand(brand: string): Promise<TelegramResult[]> {
  const res = await fetch(`${API_BASE}/scan/${brand}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch scan results");
  }

  return res.json();
}