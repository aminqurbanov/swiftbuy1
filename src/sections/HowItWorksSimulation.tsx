"use client";

import { useEffect, useState } from "react";

type Phase = {
  storeLine: string;
  distLine: string;
  distName: string;
  transfer: boolean;
  stepLabel: string;
};

const PHASES: Phase[] = [
  {
    storeLine: "Kataloq və qiymətlərə baxır, məhsul seçir…",
    distLine: "Panel hazırdır — yeni sorğu gözlənilir",
    distName: "Veysəloğlu",
    transfer: false,
    stepLabel: "Addım 1 — Kataloq",
  },
  {
    storeLine: "Sifariş göndərildi — 09:14",
    distLine: "Yeni sifariş bildirişi",
    distName: "Veysəloğlu",
    transfer: true,
    stepLabel: "Addım 2 — Göndərmə",
  },
  {
    storeLine: "Gözləyir: distribütor təsdiqi",
    distLine: "Sifariş qəbul edildi — 09:15",
    distName: "Veysəloğlu",
    transfer: false,
    stepLabel: "Addım 3 — Qəbul və hazırlıq",
  },
  {
    storeLine: "Status: hazırlanır (anbarda)",
    distLine: "Sifariş toplanır, çatdırılma planı",
    distName: "Veysəloğlu",
    transfer: false,
    stepLabel: "Addım 3 — Davam",
  },
  {
    storeLine: "İzlə: yoldadır — 11:40",
    distLine: "Kuryer təyin edildi — çıxış",
    distName: "Veysəloğlu",
    transfer: false,
    stepLabel: "Addım 4 — İzləmə",
  },
  {
    storeLine: "Çatdırıldı — qəbul təsdiqləndi",
    distLine: "Sifariş tamamlandı",
    distName: "Veysəloğlu",
    transfer: false,
    stepLabel: "Son",
  },
];

const INTERVAL_MS = 3800;

export default function HowItWorksSimulation() {
  const [i, setI] = useState(0);
  const phase = PHASES[i]!;

  useEffect(() => {
    const t = setInterval(() => {
      setI((x) => (x + 1) % PHASES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="mt-14 grid grid-cols-1 items-stretch gap-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-2xl md:grid-cols-[1fr_auto_1fr] md:p-8"
      aria-live="polite"
    >
      <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-500">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          Mağaza sahibi
        </p>
        <p className="mb-4 text-lg font-bold text-white">Araz Market</p>
        <div className="mt-auto flex min-h-[4rem] items-start gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5">
          <span
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
            aria-hidden
          />
          <p className="text-sm leading-snug text-white/75">{phase.storeLine}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 py-2 md:min-w-[72px] md:py-0">
        <div
          className="hidden h-4 w-px bg-gradient-to-b from-blue-500/40 to-blue-500/10 md:block"
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-1.5">
          <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300/95">
            SwiftBuy
          </span>
          {phase.transfer && (
            <span className="absolute -inset-3 -z-10 animate-ping rounded-full bg-blue-500/20 blur-md motion-reduce:hidden" />
          )}
          <p
            className={`max-w-[9rem] text-center text-[9px] font-medium uppercase leading-tight tracking-wider text-white/30 ${
              phase.transfer ? "text-blue-300/80" : ""
            }`}
          >
            {phase.transfer ? "Ötürülür…" : "Sinxron"}
          </p>
        </div>
        <div
          className="hidden h-4 w-px bg-gradient-to-b from-blue-500/10 to-blue-500/40 md:block"
          aria-hidden
        />
        <p className="mt-2 max-w-[10rem] text-center text-[10px] text-white/25 md:mt-0">
          {phase.stepLabel}
        </p>
      </div>

      <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-500">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          Distribütor
        </p>
        <p className="mb-4 text-lg font-bold text-white">{phase.distName}</p>
        <div className="mt-auto flex min-h-[4rem] items-start gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)] motion-reduce:animate-none ${
              phase.transfer ? "animate-pulse bg-amber-400" : "bg-blue-400"
            }`}
            aria-hidden
          />
          <p className="text-sm leading-snug text-white/75">{phase.distLine}</p>
        </div>
      </div>

      <p className="col-span-full text-center text-[11px] text-white/25">
        Nümayiş avtomatik təkrarlanır · real məlumat deyil
      </p>
    </div>
  );
}
