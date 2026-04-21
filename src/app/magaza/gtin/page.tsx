"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MagazaPageShell from "@/components/MagazaPageShell";
import GtinSearch from "./GtinSearch";

function GtinSearchLoader() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("code") ?? searchParams.get("gtin") ?? "";
  return <GtinSearch key={initial} initialCode={initial} />;
}

export default function GtinPage() {
  return (
    <MagazaPageShell>
      <Suspense
        fallback={
          <div className="flex min-h-[30vh] items-center justify-center text-lg text-slate-500">
            Yüklənir…
          </div>
        }
      >
        <GtinSearchLoader />
      </Suspense>
    </MagazaPageShell>
  );
}
