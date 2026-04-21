"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEMO_GTIN_REDBULL,
  gtinSearchResult,
  normalizeGtinInput,
  productByGtin,
} from "@/lib/gtin";

type Props = { initialCode?: string };

export default function GtinSearch({ initialCode = "" }: Props) {
  const [value, setValue] = useState(initialCode);
  const [searched, setSearched] = useState(Boolean(initialCode.trim()));

  const result = useMemo(() => {
    if (!searched) return null;
    const p = productByGtin(value);
    return p ? gtinSearchResult(p) : null;
  }, [searched, value]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
        GTIN axtarışı
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Barkod və ya 8–13 rəqəmli kodu daxil edin — kataloqdan uyğun məhsul
        göstərilir (nümunə məlumat).
      </p>
      <p className="mt-2 rounded-xl border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-base text-slate-600">
        <span className="font-semibold text-slate-800">Nümunə kod:</span>{" "}
        <button
          type="button"
          className="font-mono text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900"
          onClick={() => {
            setValue(DEMO_GTIN_REDBULL);
            setSearched(true);
          }}
        >
          {DEMO_GTIN_REDBULL}
        </button>{" "}
        (Red Bull)
      </p>

      <form onSubmit={submit} className="mt-8">
        <label className="block">
          <span className="mb-2 block text-base font-semibold text-slate-700">
            GTIN / EAN kodu
          </span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              type="search"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Məs: 866…"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSearched(false);
              }}
              className="min-h-[56px] w-full flex-1 rounded-2xl border-2 border-slate-200 bg-white px-5 font-mono text-xl text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="min-h-[56px] shrink-0 rounded-2xl bg-blue-600 px-8 text-lg font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Axtar
            </button>
          </div>
        </label>
      </form>

      {searched && (
        <div className="mt-10">
          {result ? (
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Tapıldı
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                {result.product.name}
              </h2>
              <dl className="mt-4 space-y-2 text-lg">
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold text-slate-600">Brend:</dt>
                  <dd>{result.tradeBrand}</dd>
                </div>
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold text-slate-600">
                    Distribütor:
                  </dt>
                  <dd>{result.distributorName}</dd>
                </div>
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold text-slate-600">Kateqoriya:</dt>
                  <dd>{result.product.category}</dd>
                </div>
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold text-slate-600">GTIN:</dt>
                  <dd className="font-mono">{result.gtin}</dd>
                </div>
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold text-slate-600">Ölçü:</dt>
                  <dd>{result.product.packLabel}</dd>
                </div>
              </dl>
              <Link
                href="/magaza"
                className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-slate-100 px-6 text-lg font-semibold text-slate-800 transition hover:bg-slate-200"
              >
                Topdan kataloqa keç →
              </Link>
            </div>
          ) : (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-lg text-amber-950">
              Bu koda uyğun məhsul tapılmadı — rəqəmləri yoxlayın (əsasən{" "}
              <span className="font-mono font-semibold">12–13</span> rəqəm).
              Daxil edilən:{" "}
              <span className="font-mono">
                {normalizeGtinInput(value) || "(boş)"}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
