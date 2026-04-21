"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMockSession } from "@/context/MockSessionContext";
import DistributorLoginForm from "@/components/DistributorLoginForm";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0f4fc]";

export default function DistributorPage() {
  const { role, ready, distributorCompanyId, loginDistributorCompany } =
    useMockSession();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (role === "distributor" && distributorCompanyId) {
      router.replace(`/distributor/${distributorCompanyId}`);
    }
  }, [ready, role, distributorCompanyId, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Yüklənir…
      </div>
    );
  }

  if (role === "store") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 text-lg text-slate-600">
          Bu bölmə yalnız distribütor / istehsalçı hesabları üçündür.
        </p>
        <h1 className="mb-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
          Mağaza ilə daxil olmusunuz
        </h1>
        <p className="mb-8 max-w-md text-base text-slate-600">
          Mağaza panelinə keçin və ya çıxıb distribütor üçün e-poçt ilə daxil olun.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/magaza"
            className={`min-h-[52px] rounded-2xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-500 ${FOCUS}`}
          >
            Mağaza paneli
          </Link>
          <Link
            href="/"
            className={`min-h-[52px] rounded-2xl border border-slate-300 bg-white px-8 py-3 text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 ${FOCUS}`}
          >
            Əsas səhifə
          </Link>
        </div>
      </div>
    );
  }

  if (role === "distributor" && distributorCompanyId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Yönləndirilir…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4fc] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-lg">
        <p className="mb-6 text-center text-sm text-slate-600">
          <Link
            href="/"
            className="font-semibold text-blue-700 underline-offset-2 hover:underline"
          >
            ← SwiftBuy əsas səhifə
          </Link>
        </p>
        <DistributorLoginForm
          onSuccess={(companyId) => {
            loginDistributorCompany(companyId);
            router.push(`/distributor/${companyId}`);
          }}
        />
      </div>
    </div>
  );
}
