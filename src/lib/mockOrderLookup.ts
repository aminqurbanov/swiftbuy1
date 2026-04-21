import type { MockOrderRow } from "@/lib/mockMagazaData";
import { mergedOrdersNewestFirst } from "@/lib/distributorInbox";

function tailDigits(id: string): string {
  const m = id.match(/(\d+)$/);
  return m ? m[1]! : "";
}

/**
 * Sifariş nömrəsi: SB-1042, sb1042, 1042 və s.
 * Bu sessiyada göndərilən sifarişlər əvvəlcə yoxlanır.
 */
export function orderByReference(raw: string): MockOrderRow | undefined {
  const t = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!t) return undefined;
  const ref = t.startsWith("SB") ? t.replace(/^SB-?/, "") : t;
  if (!/^\d+$/.test(ref)) return undefined;
  return mergedOrdersNewestFirst().find((o) => tailDigits(o.id) === ref);
}

/** «Son sifarişlər» cədvəli — sessiya + nümunə */
export function ordersForDashboard(): MockOrderRow[] {
  return mergedOrdersNewestFirst();
}
