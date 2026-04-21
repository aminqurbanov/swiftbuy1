import type { MockOrderRow } from "@/lib/mockMagazaData";
import { mergedOrdersNewestFirst } from "@/lib/distributorInbox";

export interface DistributorStatsSnapshot {
  totalOrders: number;
  /** Status üzrə say */
  byStatus: Record<MockOrderRow["status"], number>;
  /** Bu təqvim günü (lokal) */
  ordersToday: number;
  /** Tamamlanmayan sifarişlərin məbləği */
  pipelineTotalAzn: number;
  /** Tamamlananların məbləği (demo) */
  completedTotalAzn: number;
}

function startOfLocalDay(d: Date): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

export function computeDistributorStats(rows: MockOrderRow[]): DistributorStatsSnapshot {
  const byStatus: DistributorStatsSnapshot["byStatus"] = {
    gözləyir: 0,
    hazırlanır: 0,
    yoldadır: 0,
    tamamlandı: 0,
  };

  const dayStart = startOfLocalDay(new Date());
  let ordersToday = 0;
  let pipelineTotalAzn = 0;
  let completedTotalAzn = 0;

  for (const o of rows) {
    byStatus[o.status]++;
    const t = new Date(o.placedAt).getTime();
    if (t >= dayStart) ordersToday++;
    if (o.status === "tamamlandı") {
      completedTotalAzn += o.total;
    } else {
      pipelineTotalAzn += o.total;
    }
  }

  return {
    totalOrders: rows.length,
    byStatus,
    ordersToday,
    pipelineTotalAzn,
    completedTotalAzn,
  };
}

/** Cari birləşdirilmiş sifarişlər üzrə canlı statistik */
export function distributorStatsLive(): DistributorStatsSnapshot {
  return computeDistributorStats(mergedOrdersNewestFirst());
}
