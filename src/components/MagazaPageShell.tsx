"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMockSession } from "@/context/MockSessionContext";
import MagazaSubnav from "@/components/MagazaSubnav";

type Props = { children: ReactNode };

export default function MagazaPageShell({ children }: Props) {
  const { role, ready, logout } = useMockSession();
  const router = useRouter();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-slate-500">
        Yüklənir…
      </div>
    );
  }

  if (role !== "store") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 text-lg text-slate-600">Bu bölməyə giriş üçün</p>
        <h1 className="mb-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
          Mağaza rolu seçin
        </h1>
        <p className="mb-8 max-w-md text-base leading-relaxed text-slate-600">
          Əsas səhifədə «Daxil ol» → «Mağaza sahibiyəm». Əlavə təsdiq yoxdur.
        </p>
        <Link
          href="/"
          className="min-h-[52px] rounded-2xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-blue-700"
        >
          Əsas səhifəyə qayıt
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/magaza"
              className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl"
            >
              Swift<span className="text-blue-600">Buy</span>
            </Link>
            <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-800">
              Mağaza paneli
            </span>
          </div>
          <div className="flex shrink-0 items-stretch gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50/90 px-4 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            >
              Əsas səhifə
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 text-base font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Çıxış
            </button>
          </div>
        </div>
      </header>

      <MagazaSubnav />
      {children}
    </>
  );
}
