"use client";

import { useMemo, useState } from "react";
import {
  VEYSELOGLU_CATEGORIES,
  veyselogluBrandsForCategory,
  type VeyselogluBrandEntry,
  type VeyselogluCategoryId,
} from "@/lib/mockVeyselogluBrands";

type Props = {
  onBrowseProducts: (brandName: string) => void;
  onAbout: (brand: VeyselogluBrandEntry) => void;
};

export default function VeyselogluBrandsPanel({
  onBrowseProducts,
  onAbout,
}: Props) {
  const [cat, setCat] = useState<VeyselogluCategoryId>("hamisi");
  const list = useMemo(() => veyselogluBrandsForCategory(cat), [cat]);

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6 sm:py-6">
        <div className="border-l-4 border-red-600 pl-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Brendlər
          </h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            Distribusiya və şəxsi markalar — kateqoriya seçin, sonra kataloqda həmin brendə uyğun
            SKU-lar göstərilir.
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-3 py-2">
        <div
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Brend kateqoriyaları"
        >
          {VEYSELOGLU_CATEGORIES.map((c) => {
            const active = c.id === cat;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCat(c.id)}
                className={`min-h-[48px] shrink-0 whitespace-nowrap rounded-xl border-2 px-4 py-2.5 text-base font-semibold transition sm:text-lg ${
                  active
                    ? "border-red-600 bg-red-50 text-red-900 shadow-md"
                    : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((b) => (
            <article
              key={b.id}
              className="flex flex-col rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-center shadow-sm transition hover:border-red-200 hover:shadow-md"
            >
              <div className="mx-auto mb-3 flex w-full max-w-[140px] flex-col items-center rounded-xl border border-slate-200 bg-white p-2">
                <div className="flex min-h-[5rem] w-full items-center justify-center rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logoSrc}
                    alt={b.name}
                    className="max-h-[5rem] w-full object-contain object-center p-1"
                  />
                </div>
              </div>
              <p className="line-clamp-3 min-h-[3.25rem] text-sm font-bold leading-tight text-slate-900 sm:text-base">
                {b.name}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onBrowseProducts(b.name)}
                  className="min-h-[48px] rounded-xl bg-red-600 text-sm font-bold text-white shadow-md transition hover:bg-red-700 sm:text-base"
                >
                  Kataloqa bax
                </button>
                <button
                  type="button"
                  onClick={() => onAbout(b)}
                  className="min-h-[44px] rounded-xl text-sm font-semibold text-slate-600 transition hover:bg-slate-200 sm:text-base"
                >
                  Haqqında
                </button>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-12 text-center text-lg text-slate-500">
            Bu kateqoriyada brend yoxdur.
          </p>
        )}
      </div>
    </div>
  );
}
