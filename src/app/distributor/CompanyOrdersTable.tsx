"use client";

import { useState } from "react";
import { formatAzn } from "@/lib/formatAzn";
import type { MockOrderRow } from "@/lib/mockMagazaData";
import { ordersToCsv } from "@/lib/exportOrdersCsv";
import { resolveStoreLabel } from "@/lib/orderTracking";
import OrderTrackingSimulation from "./OrderTrackingSimulation";

const STATUS_STYLE: Record<MockOrderRow["status"], string> = {
  gözləyir:
    "border border-amber-300 bg-amber-50 text-amber-900",
  hazırlanır:
    "border border-blue-300 bg-blue-50 text-blue-900",
  yoldadır:
    "border border-orange-300 bg-orange-50 text-orange-900",
  tamamlandı:
    "border border-emerald-300 bg-emerald-50 text-emerald-900",
};

type Props = { rows: MockOrderRow[] };

export default function CompanyOrdersTable({ rows }: Props) {
  const [trackOrder, setTrackOrder] = useState<MockOrderRow | null>(null);

  function downloadCsv() {
    const csv = ordersToCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `swiftbuy-partnyor-sifarisler-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-14 text-center text-slate-600">
        Bu şirkət üçün sifariş sətri yoxdur (nümunə).
      </div>
    );
  }

  return (
    <>
      {trackOrder && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Sifariş izləmə"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTrackOrder(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold text-slate-500">
                  {trackOrder.id}
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {formatAzn(trackOrder.total)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTrackOrder(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Bağla
              </button>
            </div>
            <OrderTrackingSimulation order={trackOrder} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-600">
            Mağaza və ünvan məlumatı cədvəldə; Excel üçün CSV yükləyə bilərsiniz.
          </p>
          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            CSV yüklə
          </button>
        </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Sifariş
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Mağaza
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Ünvan
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Tarix
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Cəmi
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                  İzləmə
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => {
                const { name, address } = resolveStoreLabel(o);
                return (
                  <tr
                    key={o.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 font-mono text-sm font-medium text-slate-900">
                      {o.id}
                    </td>
                    <td className="max-w-[160px] px-4 py-3 text-sm font-medium text-slate-800">
                      {name}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-sm text-slate-600">
                      <span className="line-clamp-2">{address}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {new Date(o.placedAt).toLocaleString("az-AZ", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-slate-900">
                      {formatAzn(o.total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => setTrackOrder(o)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-500"
                      >
                        İzlə
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}
