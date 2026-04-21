import type { MockOrderRow } from "@/lib/mockMagazaData";

const ORDERS_KEY = "swiftbuy_placed_orders";
const SEQ_KEY = "swiftbuy_order_seq";
const START_SEQ = 3100;

function safeParse(raw: string | null): MockOrderRow[] {
  if (!raw) return [];
  try {
    const p = JSON.parse(raw) as unknown;
    return Array.isArray(p) ? (p as MockOrderRow[]) : [];
  } catch {
    return [];
  }
}

/** Yalnız brauzerdə — SSR-da [] */
export function getPlacedOrders(): MockOrderRow[] {
  if (typeof window === "undefined") return [];
  try {
    return safeParse(sessionStorage.getItem(ORDERS_KEY));
  } catch {
    return [];
  }
}

export function appendPlacedOrder(row: MockOrderRow): void {
  if (typeof window === "undefined") return;
  try {
    const prev = getPlacedOrders();
    sessionStorage.setItem(ORDERS_KEY, JSON.stringify([row, ...prev]));
  } catch {
    /* ignore */
  }
}

export function nextOrderId(): string {
  if (typeof window === "undefined") return `SB-${START_SEQ}`;
  try {
    let n = parseInt(sessionStorage.getItem(SEQ_KEY) || String(START_SEQ - 1), 10);
    if (Number.isNaN(n) || n < START_SEQ - 1) n = START_SEQ - 1;
    n += 1;
    sessionStorage.setItem(SEQ_KEY, String(n));
    return `SB-${n}`;
  } catch {
    return `SB-${START_SEQ + Math.floor(Math.random() * 99999)}`;
  }
}
