"use client";

import { useState } from "react";
import type { CompanyDashboardBundle } from "@/lib/companyDashboardData";
import { formatAzn } from "@/lib/formatAzn";
import { companyKindLabel } from "@/lib/mockDistributorAccounts";
import { tradeBrandLabel } from "@/lib/mockMagazaData";
import CompanyOrdersTable from "./CompanyOrdersTable";

const PLAN_ROWS = [
  { t: "Partnyor mağazalar", d: "Rayon və limit üzrə siyahı" },
  { t: "Avtomatik təsdiq", d: "Minimal məbləğ, SKU limiti" },
  { t: "Çatdırılma SLA", d: "Kuryer təyinatı və izləmə" },
];

type Tab = "overview" | "orders" | "products" | "addresses" | "roadmap";

type Props = { bundle: CompanyDashboardBundle };

export default function CompanyDistributorDashboard({ bundle }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const { account, stats, orders, products, addresses, analytics } = bundle;
  const accent = account.accent === "blue" ? "bg-blue-600" : "bg-orange-600";
  const accentSoft =
    account.accent === "blue"
      ? "border-blue-200 bg-blue-50/80"
      : "border-orange-200 bg-orange-50/80";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-full max-w-[220px] items-center justify-center rounded-xl border border-slate-100 bg-white px-4 py-3 sm:h-16 sm:w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={account.logoSrc}
              alt={account.displayName}
              className="max-h-14 w-auto object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 gap-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                {account.legalName}
              </p>
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                  account.accent === "blue"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-orange-100 text-orange-900"
                }`}
              >
                {companyKindLabel(account.companyKind)}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {account.displayName} — panel
            </h1>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              {account.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {(
          [
            ["overview", "İcmal"],
            ["orders", "Sifarişlər"],
            ["products", "Məhsullar"],
            ["addresses", "Ünvanlar"],
            ["roadmap", "Plan"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-[48px] min-w-[88px] flex-1 rounded-xl px-3 text-sm font-bold transition sm:min-h-[52px] sm:text-base ${
              tab === id
                ? `${accent} text-white shadow-md`
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className={`rounded-2xl border p-5 shadow-sm ${accentSoft}`}>
              <p className="text-sm font-semibold text-slate-600">Bu gün</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-slate-900">
                {stats.ordersToday}
              </p>
              <p className="mt-1 text-sm text-slate-500">qeyd olunan sifariş</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">SKU / kataloq</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-slate-900">
                {bundle.productCount}
              </p>
              <p className="mt-1 text-sm text-slate-500">aktiv mövqe</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">Gözləyir</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-amber-700">
                {stats.byStatus.gözləyir}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-500">Aktiv axın</p>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-slate-900">
                {formatAzn(stats.pipelineTotalAzn)}
              </p>
            </div>
          </section>

          <section
            className={`rounded-2xl border p-6 shadow-sm md:p-8 ${accentSoft}`}
          >
            <h2 className="text-lg font-bold text-slate-900">Satış (nümunə)</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-600">Son 30 gün (₼)</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">
                  {formatAzn(analytics.monthSalesAzn)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Sifariş sayı</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">
                  {analytics.ordersMonth}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Orta səbət + artım*</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums text-emerald-800">
                  {formatAzn(analytics.avgBasketAzn)}{" "}
                  <span className="text-base font-semibold text-emerald-600">
                    (+{analytics.growthVsLastMonth}%)
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              *Demo göstərici; real analitika API ilə bağlanacaq.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Status bölgüsü</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center"
                >
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {stats.byStatus[key]}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {tab === "orders" && (
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {account.displayName} — sifarişlər
              </h2>
              <p className="text-base text-slate-500">
                Sətir: <strong>{stats.totalOrders}</strong> · tamamlanan üzrə{" "}
                <span className="font-semibold text-emerald-800">
                  {formatAzn(stats.completedTotalAzn)}
                </span>
              </p>
            </div>
          </div>
          <CompanyOrdersTable rows={orders} />
        </section>
      )}

      {tab === "products" && (
        <section className="space-y-4">
          <p className="text-sm text-slate-600">
            Kataloqda təqdim olunan markalar və SKU-lar nümayiş xarakterlidir; real
            müqaviləyə görə fərqlənə bilər.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                {tradeBrandLabel(p)}
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{p.category}</p>
              <p className="mt-2 text-sm text-slate-600">{p.packLabel}</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatAzn(p.price)}
                  </span>
                  <p className="mt-1 text-sm text-slate-500">
                    Hazırda:{" "}
                    <span className="font-semibold text-slate-700">
                      {p.stockPacks} qutu/kaset
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  title="Gələn mərhələdə partnyor portalı ilə stok yeniləməsi"
                  className="cursor-not-allowed rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-400"
                >
                  Stok artır (tezliklə)
                </button>
              </div>
            </article>
          ))}
          </div>
        </section>
      )}

      {tab === "addresses" && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Tədarük / qəbul ünvanları
          </h2>
          <ul className="flex flex-col gap-3">
            {addresses.map((a) => (
              <li
                key={a.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-bold text-slate-900">{a.label}</p>
                <p className="text-sm text-slate-500">{a.city}</p>
                <p className="mt-2 text-base text-slate-700">{a.line}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "roadmap" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-bold text-slate-900">Növbəti modullar</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {PLAN_ROWS.map((x) => (
              <li
                key={x.t}
                className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-semibold text-slate-800">{x.t}</span>
                <span className="text-sm text-slate-500">{x.d}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
