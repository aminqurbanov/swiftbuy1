"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MagazaPageShell from "@/components/MagazaPageShell";
import OrderTracking from "./OrderTracking";

function OrderTrackingLoader() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("no") ?? searchParams.get("id") ?? "";
  return <OrderTracking key={initial} initialRef={initial} />;
}

export default function SifarisIzlePage() {
  return (
    <MagazaPageShell>
      <Suspense
        fallback={
          <div className="flex min-h-[30vh] items-center justify-center text-lg text-slate-500">
            Yüklənir…
          </div>
        }
      >
        <OrderTrackingLoader />
      </Suspense>
    </MagazaPageShell>
  );
}
