"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MOCK_MANUFACTURERS,
  RAYON_AZ_LIST,
  type ManufacturerLegalType,
} from "@/lib/mockManufacturers";
import { productCountForManufacturer } from "@/lib/mockMagazaData";

const PAGE_SIZE = 8;

type LegalFilter = "hamisi" | ManufacturerLegalType;

export default function ManufacturersBrowse() {
  const [query, setQuery] = useState("");
  const [legal, setLegal] = useState<LegalFilter>("hamisi");
  const [domesticOnly, setDomesticOnly] = useState(false);
  const [rayon, setRayon] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_MANUFACTURERS.filter((m) => {
      if (legal !== "hamisi" && m.legalType !== legal) return false;
      if (domesticOnly && !m.domesticDelivery) return false;
      if (rayon && !m.regions.includes(rayon)) return false;
      if (!q) return true;
      return m.name.toLowerCase().includes(q);
    });
  }, [query, legal, domesticOnly, rayon]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          İstehsalçılar
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          Bir istehsalçı seçin — kataloqda həmin tərəfdaşın SKU-larını süzə
          bilərsiniz.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-5 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-md sm:p-6">
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Hüquqi status">
          {(
            [
              ["hamisi", "Hamısı"],
              ["huquqi", "Hüquqi şəxslər"],
              ["fiziki", "Fiziki şəxslər"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={legal === id}
              onClick={() => {
                setLegal(id);
                setPage(1);
              }}
              className={`min-h-[52px] rounded-xl px-5 text-base font-bold transition ${
                legal === id
                  ? "bg-blue-600 text-white shadow-md"
                  : "border-2 border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-lg text-slate-700">
          <input
            type="checkbox"
            checked={domesticOnly}
            onChange={(e) => {
              setDomesticOnly(e.target.checked);
              setPage(1);
            }}
            className="size-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Ölkədaxili çatdırılma
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-500">
              Rayonlar üzrə
            </span>
            <select
              value={rayon}
              onChange={(e) => {
                setRayon(e.target.value);
                setPage(1);
              }}
              className="min-h-[52px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-lg text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Bütün rayonlar</option>
              {RAYON_AZ_LIST.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-500">
              İstehsalçı adına görə axtar
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Məs: MMC, ASPİ, Gilan…"
              className="min-h-[52px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>
      </div>

      <ul className="space-y-4">
        {slice.map((m) => {
          const n = productCountForManufacturer(m.id);
          return (
            <li key={m.id}>
              <div className="flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    {m.legalType === "huquqi"
                      ? "Hüquqi şəxs"
                      : "Fiziki şəxs"}
                    {m.domesticDelivery ? " · ölkədaxili" : ""}
                  </p>
                  <p className="mt-2 text-lg font-bold leading-snug text-slate-900">
                    {m.name}
                  </p>
                  <p className="mt-1 text-base tabular-nums text-slate-600">
                    {n} məhsul
                  </p>
                  {m.regions.length > 0 && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {m.regions.join(" · ")}
                    </p>
                  )}
                </div>
                <Link
                  href={`/magaza?mfg=${encodeURIComponent(m.id)}`}
                  className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-xl bg-blue-600 px-8 text-base font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  Məhsullara bax
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-lg text-slate-500">
          Bu şərtlə uyğun istehsalçı yoxdur.
        </p>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-6 text-base font-semibold text-slate-700 disabled:opacity-40"
          >
            Əvvəlki
          </button>
          <span className="px-3 text-lg tabular-nums text-slate-600">
            {safePage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-6 text-base font-semibold text-slate-700 disabled:opacity-40"
          >
            Sonrakı
          </button>
        </div>
      )}
    </div>
  );
}
