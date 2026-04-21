"use client";

import { useState } from "react";
import { distributorStatsLive } from "@/lib/distributorMetrics";
import { formatAzn } from "@/lib/formatAzn";
import DistributorInboxTable from "./DistributorInboxTable";

const COMING = [
  { t: "Partnyor mağazalar", d: "Rayon və limit üzrə siyahı" },
  { t: "Avtomatik təsdiq qaydaları", d: "Minimal məbləğ, SKU limiti" },
  { t: "Çatdırılma pəncərəsi", d: "Kuryer təyinatı və SLA" },
];

type TabId = "overview" | "orders" | "roadmap";

export default function DistributorDashboard() {
  const [tab, setTab] = useState<TabId>("overview");
  const stats = distributorStatsLive();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Əməliyyat paneli
        </h1>
        <p className="mt-2 max-w-3xl text-lg leading-relaxed text-slate-600">
          Gələn sifarişlər, status və qısa göstəricilər (nümunə məlumat).
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {(
          [
            ["overview", "İcmal"],
            ["orders", "Sifarişlər"],
            ["roadmap", "Plan"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-[52px] min-w-[100px] flex-1 rounded-xl px-4 text-base font-bold transition sm:min-w-[120px] ${
              tab === id
                ? "bg-orange-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Qısa göstəricilər"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">Bu gün</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-slate-900">
                {stats.ordersToday}
              </p>
              <p className="mt-1 text-sm text-slate-500">yeni / ümumi qeyd</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">Gözləyir</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-amber-700">
                {stats.byStatus.gözləyir}
              </p>
              <p className="mt-1 text-sm text-slate-500">təsdiq və ya təhvil</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">
                Hazırlanır + yolda
              </p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-blue-800">
                {stats.byStatus.hazırlanır + stats.byStatus.yoldadır}
              </p>
              <p className="mt-1 text-sm text-slate-500">aktiv emal</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">
                Aktiv axın (₼)
              </p>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-slate-900">
                {formatAzn(stats.pipelineTotalAzn)}
              </p>
              <p className="mt-1 text-sm text-slate-500">tamamlanmayan cəmi</p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Status bölgüsü
              </h2>
              <ul className="mt-4 space-y-3">
                {(
                  [
                    ["gözləyir", "Gözləyir"],
                    ["hazırlanır", "Hazırlanır"],
                    ["yoldadır", "Yoldadır"],
                    ["tamamlandı", "Tamamlandı"],
                  ] as const
                ).map(([key, label]) => (
                  <li
                    key={key}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <span className="text-base font-medium text-slate-700">
                      {label}
                    </span>
                    <span className="text-xl font-bold tabular-nums text-slate-900">
                      {stats.byStatus[key]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Tez əməliyyat
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Növbəti mərhələdə: sifarişi qəbul et, hazırlıq siyahısı, çatdırılma
                  təyinatı.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTab("orders")}
                className="mt-6 min-h-[52px] w-full rounded-xl bg-orange-600 text-base font-bold text-white shadow-md transition hover:bg-orange-500"
              >
                Sifarişlər siyahısı →
              </button>
            </div>
          </div>
        </>
      )}

      {tab === "orders" && (
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Bütün sifarişlər
              </h2>
              <p className="text-base text-slate-500">
                Ümumi: <strong>{stats.totalOrders}</strong> sətir · ən yenilər
                yuxarıdadır
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Tamamlananlar üzrə:{" "}
              <span className="font-semibold text-emerald-800">
                {formatAzn(stats.completedTotalAzn)}
              </span>
            </p>
          </div>
          <DistributorInboxTable />
        </section>
      )}

      {tab === "roadmap" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-bold text-slate-900">
            Modullar — hazırlanır
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {COMING.map((x) => (
              <li
                key={x.t}
                className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-semibold text-slate-800">{x.t}</span>
                <span className="text-sm text-slate-500">{x.d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-500">
            Bu bölmə yalnız yol xəritəsini göstərir; funksionallıq növbəti
            iterasiyalarda əlavə olunacaq.
          </p>
        </section>
      )}
    </div>
  );
}
