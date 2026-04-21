import type { MockOrderRow } from "@/lib/mockMagazaData";
import { MOCK_ORDERS } from "@/lib/mockMagazaData";
import { getPlacedOrders } from "@/lib/mockOrderSession";

function sortNewestFirst(rows: MockOrderRow[]): MockOrderRow[] {
  return [...rows].sort(
    (a, b) =>
      new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}

/**
 * Sessiya + nümunə sifarişlər — mağaza «Son sifarişlər» və distribütor inbox üçün eyni mənbə.
 */
export function mergedOrdersNewestFirst(): MockOrderRow[] {
  const session = getPlacedOrders();
  return sortNewestFirst([...session, ...MOCK_ORDERS]);
}
