import { TelegramResult } from "@/types/telegram";

export interface ScanHistory {
  brand: string;
  timestamp: number;
  results: TelegramResult[];
}

const KEY = "scan_history";

export function saveScan(brand: string, results: TelegramResult[]) {
  const existing = loadHistory();
  const newEntry: ScanHistory = { brand, timestamp: Date.now(), results };
  localStorage.setItem(KEY, JSON.stringify([newEntry, ...existing]));
}

export function loadHistory(): ScanHistory[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}