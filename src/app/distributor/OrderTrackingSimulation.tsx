"use client";

import { useEffect, useMemo, useState } from "react";
import type { MockOrderRow } from "@/lib/mockMagazaData";
import {
  etaWindowLabel,
  resolveOrderGeo,
  resolveStoreLabel,
  routeProgressForStatus,
  statusDescriptionAz,
} from "@/lib/orderTracking";

type Props = { order: MockOrderRow };

/** Sadə xəritə tipli panel: anbar → mağaza, status üzrə hərəkət nöqtəsi */
export default function OrderTrackingSimulation({ order }: Props) {
  const { originLat, originLng, destLat, destLng } = resolveOrderGeo(order);
  const store = resolveStoreLabel(order);
  const baseProgress = routeProgressForStatus(order.status);

  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPulse((p) => (p + 0.02) % 1);
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  const liveProgress = useMemo(() => {
    if (order.status !== "yoldadır") return baseProgress;
    const wobble = Math.sin(pulse * Math.PI * 2) * 0.02;
    return Math.min(0.98, baseProgress + wobble);
  }, [baseProgress, order.status, pulse]);

  const curLat = originLat + (destLat - originLat) * liveProgress;
  const curLng = originLng + (destLng - originLng) * liveProgress;

  const toXY = (lat: number, lng: number) => {
    const minLat = Math.min(originLat, destLat) - 0.02;
    const maxLat = Math.max(originLat, destLat) + 0.02;
    const minLng = Math.min(originLng, destLng) - 0.02;
    const maxLng = Math.max(originLng, destLng) + 0.02;
    const x = ((lng - minLng) / (maxLng - minLng || 1)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat || 1)) * 100;
    return { x, y };
  };

  const oPx = toXY(originLat, originLng);
  const dPx = toXY(destLat, destLng);
  const cPx = toXY(curLat, curLng);

  const steps = [
    { key: "gözləyir", label: "Gözləyir", active: order.status === "gözləyir" },
    { key: "hazırlanır", label: "Anbarda", active: order.status === "hazırlanır" },
    { key: "yoldadır", label: "Yoldadır", active: order.status === "yoldadır" },
    { key: "tamamlandı", label: "Çatıb", active: order.status === "tamamlandı" },
  ];
  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.active)
  );

  const placedFull = new Date(order.placedAt).toLocaleString("az-AZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const eta = etaWindowLabel(order.placedAt, order.status);
  const statusNote = statusDescriptionAz(order.status);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-4 py-3 text-sm text-slate-700">
        <p>
          <span className="font-semibold text-slate-800">Sifariş vaxtı:</span> {placedFull}
        </p>
        <p className="mt-2">
          <span className="font-semibold text-slate-800">Təxmini çatım (demo):</span> {eta}
        </p>
        <p className="mt-2 text-slate-600">{statusNote}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Partnyor mağaza
        </p>
        <p className="text-lg font-bold text-slate-900">{store.name}</p>
        <p className="mt-1 text-sm text-slate-600">{store.address}</p>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Marşrut (nümayiş)
        </p>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-blue-50/80 to-slate-100 shadow-inner">
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="rgb(234 88 12)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <line
              x1={oPx.x}
              y1={oPx.y}
              x2={dPx.x}
              y2={dPx.y}
              stroke="url(#routeLine)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-[11px] font-bold text-blue-700 shadow-md"
            style={{ left: `${oPx.x}%`, top: `${oPx.y}%` }}
            title="Anbar"
          >
            A
          </div>
          <div
            className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-orange-500 bg-white text-[11px] font-bold text-orange-700 shadow-md"
            style={{ left: `${dPx.x}%`, top: `${dPx.y}%` }}
            title="Mağaza"
          >
            M
          </div>
          <div
            className="absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-500 bg-emerald-400 shadow-lg shadow-emerald-500/40"
            style={{ left: `${cPx.x}%`, top: `${cPx.y}%` }}
            title="Təxmini mövqe"
          />

          <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-medium text-slate-500/90">
            <span>Anbar</span>
            <span>Mağaza</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Koordinatlar yuvarlaq nümunədir; real inteqrasiyada xəritə API ilə əvəz
          olunacaq.
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Mərhələ
        </p>
        <ul className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li
              key={s.key}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                i <= activeIndex
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      {order.status === "yoldadır" && (
        <p className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900">
          Kuryer marşrutdadır — təxmini mövqe yuxarıda yenilənir (simulyasiya).
        </p>
      )}
    </div>
  );
}
