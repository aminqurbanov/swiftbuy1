"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMockSession } from "@/context/MockSessionContext";
import { getCompanyDashboard } from "@/lib/companyDashboardData";
import { companyKindLabel } from "@/lib/mockDistributorAccounts";
import CompanyDistributorDashboard from "../CompanyDistributorDashboard";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0f4fc]";

export default function CompanyDistributorPage() {
  const params = useParams();
  const router = useRouter();
  const companyId =
    typeof params.companyId === "string" ? params.companyId : "";

  const { role, ready, distributorCompanyId, logout } = useMockSession();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Yüklənir…
      </div>
    );
  }

  if (role === null || role === "store") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-2xl font-extrabold text-slate-900">
          Giriş tələb olunur
        </h1>
        <p className="mb-8 max-w-md text-slate-600">
          Distribütor hesabı ilə daxil olun — yönləndirmə giriş səhifəsinə.
        </p>
        <Link
          href="/distributor"
          className={`min-h-[52px] rounded-2xl bg-orange-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-500 ${FOCUS}`}
        >
          Girişə keç
        </Link>
      </div>
    );
  }

  if (role === "distributor" && distributorCompanyId !== companyId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-2xl font-extrabold text-slate-900">
          Hesab uyğun gəlmir
        </h1>
        <p className="mb-4 max-w-md text-slate-600">
          Bu səhifə başqa şirkət üçündür. Cari sessiya ilə öz panelinizə keçin.
        </p>
        {distributorCompanyId ? (
          <Link
            href={`/distributor/${distributorCompanyId}`}
            className={`min-h-[52px] rounded-2xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-500 ${FOCUS}`}
          >
            Öz panelimə keç
          </Link>
        ) : (
          <Link
            href="/distributor"
            className={`min-h-[52px] rounded-2xl bg-orange-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-500 ${FOCUS}`}
          >
            Yenidən daxil ol
          </Link>
        )}
      </div>
    );
  }

  const bundle = getCompanyDashboard(companyId);
  if (!bundle) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-2xl font-extrabold text-slate-900">
          Şirkət tapılmadı
        </h1>
        <Link href="/distributor" className="text-blue-700 underline">
          Giriş səhifəsinə qayıt
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
              href={`/distributor/${companyId}`}
              className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl"
            >
              Swift<span className="text-blue-600">Buy</span>
            </Link>
            <span
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                bundle.account.accent === "blue"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-orange-100 text-orange-900"
              }`}
            >
              {bundle.account.displayName}
            </span>
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {companyKindLabel(bundle.account.companyKind)}
            </span>
          </div>
          <div className="flex shrink-0 items-stretch gap-2 sm:gap-3">
            <Link
              href="/"
              className={`inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50/90 px-4 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 ${FOCUS}`}
            >
              Əsas səhifə
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className={`inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 text-base font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 ${FOCUS}`}
            >
              Çıxış
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <CompanyDistributorDashboard bundle={bundle} />

        <footer className="mt-14 border-t border-slate-200 pt-8">
          <p className="mb-4 text-sm text-slate-500">
            Biznes üçün demo və əlaqə: əsas səhifədə «Demo istə».
          </p>
          <Link
            href="/"
            className={`inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 ${FOCUS}`}
          >
            Əsas səhifəyə qayıt
          </Link>
        </footer>
      </div>
    </>
  );
}
