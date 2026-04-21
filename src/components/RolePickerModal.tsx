"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
  onPick: (role: "store" | "distributor") => void;
}

export default function RolePickerModal({ open, onClose, onPick }: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-picker-title"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0E1525] shadow-2xl">
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-orange-500" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/8 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 2l12 12M14 2L2 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="px-6 pb-8 pt-10">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-blue-400">
            Prototip girişi
          </p>
          <h2 id="role-picker-title" className="mb-2 text-2xl font-extrabold tracking-tight text-white">
            Kim kimi daxil olursunuz?
          </h2>
          <p className="mb-8 text-sm text-white/45">
            Mağaza üçün dərhal panelə keçir. Distribütor üçün əvvəlcə e-poçt və
            parol ilə giriş səhifəsi açılacaq (nümayiş hesabları).
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                onPick("store");
                onClose();
              }}
              className="flex flex-col items-start rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-blue-500/40 hover:bg-white/[0.07]"
            >
              <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-blue-400">
                Mağaza
              </span>
              <span className="text-lg font-bold text-white">Mağaza sahibiyəm</span>
              <span className="mt-1 text-xs text-white/40">
                Kataloq, səbət, sifarişlər (tezliklə)
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onPick("distributor");
                onClose();
              }}
              className="flex flex-col items-start rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-orange-500/40 hover:bg-white/[0.07]"
            >
              <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-orange-400">
                Distribütor
              </span>
              <span className="text-lg font-bold text-white">Distribütoram</span>
              <span className="mt-1 text-xs text-white/40">
                Şirkət hesabı (e-poçt / parol) ilə panel
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-white/25">
            Demo üçün məlumat formu yenə də &quot;Demo istə&quot; düyməsindədir.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/magaza"
              onClick={onClose}
              className="text-blue-400/90 hover:text-blue-300"
            >
              Birbaşa mağaza paneli →
            </Link>
            <span className="text-white/15">|</span>
            <Link
              href="/distributor"
              onClick={onClose}
              className="text-orange-400/90 hover:text-orange-300"
            >
              Birbaşa distribütor paneli →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
