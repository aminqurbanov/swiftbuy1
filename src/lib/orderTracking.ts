import type { MockOrderRow } from "@/lib/mockMagazaData";
import { DEMO_DEPOT_AVRORA, DEMO_STORE_DEFAULT } from "@/lib/mockMagazaData";

/** B2B üçün status izahı (demo) */
export function statusDescriptionAz(
  status: MockOrderRow["status"]
): string {
  switch (status) {
    case "gözləyir":
      return "Sifariş qəbul gözləyir; partnyor növbəsinə düşüb.";
    case "hazırlanır":
      return "Anbarda yığılır və ya çatışdırılmaya hazırlanır.";
    case "yoldadır":
      return "Mağazaya yönləndirilib; təxmini çatdırma pəncərəsi aktivdir.";
    case "tamamlandı":
      return "Təhvil verilib; partnyor təsdiq edə bilər.";
    default:
      return "";
  }
}

/** Nümayiş: sifariş vaxtından +2–6 saat təxmini çatım (demo) */
export function etaWindowLabel(placedAtIso: string, status: MockOrderRow["status"]): string {
  const t = new Date(placedAtIso).getTime();
  if (Number.isNaN(t)) return "—";
  const start = new Date(t + 2 * 60 * 60 * 1000);
  const end = new Date(t + 6 * 60 * 60 * 1000);
  if (status === "tamamlandı") {
    return "Çatdırılıb (arxiv)";
  }
  if (status === "yoldadır") {
    return `${start.toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" })} – ${end.toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" })} aralığı (demo)`;
  }
  return `Plan: ${start.toLocaleString("az-AZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })} – ${end.toLocaleString("az-AZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })} (demo)`;
}

/** Status üzrə marşrutda mövqe (0–1), simulyasiya üçün */
export function routeProgressForStatus(
  status: MockOrderRow["status"]
): number {
  switch (status) {
    case "gözləyir":
      return 0.08;
    case "hazırlanır":
      return 0.28;
    case "yoldadır":
      return 0.72;
    case "tamamlandı":
      return 1;
    default:
      return 0;
  }
}

export function resolveOrderGeo(row: MockOrderRow): {
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
} {
  return {
    originLat: row.originLat ?? DEMO_DEPOT_AVRORA.originLat,
    originLng: row.originLng ?? DEMO_DEPOT_AVRORA.originLng,
    destLat: row.destLat ?? DEMO_STORE_DEFAULT.lat,
    destLng: row.destLng ?? DEMO_STORE_DEFAULT.lng,
  };
}

export function resolveStoreLabel(row: MockOrderRow): {
  name: string;
  address: string;
} {
  return {
    name: row.storeName ?? "Partnyor mağaza",
    address: row.storeAddress ?? "Ünvan təsdiqlənəndə göstəriləcək",
  };
}
