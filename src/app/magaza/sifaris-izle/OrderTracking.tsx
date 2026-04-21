"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatAzn } from "@/lib/formatAzn";
import { orderByReference } from "@/lib/mockOrderLookup";

const STATUS_STYLE: Record<string, string> = {
  gözləyir:
    "border border-amber-300 bg-amber-50 text-amber-900",
  hazırlanır:
    "border border-blue-300 bg-blue-50 text-blue-900",
  yoldadır:
    "border border-orange-300 bg-orange-50 text-orange-900",
  tamamlandı:
    "border border-emerald-300 bg-emerald-50 text-emerald-900",
};

type Props = { initialRef?: string };

export default function OrderTracking({ initialRef = "" }: Props) {
  const [value, setValue] = useState(initialRef.trim());
  const [searched, setSearched] = useState(Boolean(initialRef.trim()));

  const order = useMemo(() => {
    if (!searched || !value.trim()) return null;
    return orderByReference(value) ?? undefined;
  }, [searched, value]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  const examples = ["SB-1042", "1041", "1038"];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Sifariş izlə
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Sifariş nömrəsini daxil edin — status və məbləğ nümunə məlumatdır.
      </p>
      <p className="mt-3 flex flex-wrap gap-2 text-base text-slate-600">
        Nümunə:
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-slate-50"
            onClick={() => {
              setValue(ex);
              setSearched(true);
            }}
          >
            {ex}
          </button>
        ))}
      </p>

      <form onSubmit={submit} className="mt-8">
        <label className="block">
          <span className="mb-2 block text-base font-semibold text-slate-700">
            Sifariş nömrəsi
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              autoComplete="off"
              placeholder="Məs: SB-1042"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSearched(false);
              }}
              className="min-h-[56px] w-full rounded-2xl border-2 border-slate-200 bg-white px-5 text-xl text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
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

      {searched && value.trim() && (
        <div className="mt-10">
          {order ? (
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
              <p className="font-mono text-lg font-bold text-slate-900">{order.id}</p>
              <p className="mt-1 text-lg text-slate-600">
                Partnyor:{" "}
                <span className="font-semibold text-slate-800">
                  {order.distributorName}
                </span>
              </p>
              <p className="mt-3 text-lg text-slate-600">
                Tarix:{" "}
                {new Date(order.placedAt).toLocaleString("az-AZ", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-2 text-lg text-slate-600">
                Cəmi:{" "}
                <span className="font-bold tabular-nums text-slate-900">
                  {formatAzn(order.total)}
                </span>{" "}
                · {order.itemCount} mövqe
              </p>
              <p className="mt-4">
                <span
                  className={`inline-block rounded-xl px-4 py-2 text-lg font-bold capitalize ${STATUS_STYLE[order.status]}`}
                >
                  {order.status}
                </span>
              </p>
              <Link
                href="/magaza"
                className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-slate-100 px-6 text-lg font-semibold text-slate-800 transition hover:bg-slate-200"
              >
                Kataloqa qayıt
              </Link>
            </div>
          ) : (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-lg text-amber-950">
              Bu nömrə üzrə sifariş tapılmadı. Format: SB-1042 və ya yalnız{" "}
              <span className="font-mono font-semibold">1042</span>.
            </p>
          )}
        </div>
      )}

      {searched && !value.trim() && (
        <p className="mt-8 text-lg text-slate-500">Nömrə daxil edilməyib.</p>
      )}
    </div>
  );
}
