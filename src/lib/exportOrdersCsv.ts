import type { MockOrderRow } from "@/lib/mockMagazaData";
import { resolveStoreLabel } from "@/lib/orderTracking";

function escapeCsvCell(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Partnyor sifariş cədvəli üçün CSV (UTF-8 + BOM excel üçün) */
export function ordersToCsv(rows: MockOrderRow[]): string {
  const headers = [
    "Sifariş ID",
    "Mağaza",
    "Ünvan",
    "Tarix (ISO)",
    "Status",
    "Cəmi (AZN)",
    "Məhsul sətri",
  ];
  const lines = [headers.join(",")];
  for (const o of rows) {
    const { name, address } = resolveStoreLabel(o);
    lines.push(
      [
        escapeCsvCell(o.id),
        escapeCsvCell(name),
        escapeCsvCell(address),
        escapeCsvCell(o.placedAt),
        escapeCsvCell(o.status),
        escapeCsvCell(String(o.total)),
        escapeCsvCell(String(o.itemCount)),
      ].join(",")
    );
  }
  return "\uFEFF" + lines.join("\n");
}
