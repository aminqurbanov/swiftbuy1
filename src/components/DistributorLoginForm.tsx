"use client";

import { useState } from "react";
import { findDistributorAccount } from "@/lib/mockDistributorAccounts";

type Props = {
  onSuccess: (companyId: string) => void;
};

export default function DistributorLoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const acc = findDistributorAccount(email, password);
    if (!acc) {
      setError("E-poçt və ya parol səhvdir (nümunə hesabına baxın).");
      return;
    }
    onSuccess(acc.companyId);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
        Distribütor girişi (nümunə)
      </p>
      <h1 className="text-2xl font-extrabold text-slate-900">Şirkət paneli</h1>
      <p className="mt-2 text-base text-slate-600">
        Daxil olduqda yalnız öz şirkətinizin sifariş və məhsul məlumatları
        açılır.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            E-poçt
          </label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[52px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
            placeholder="avrora@demo.swiftbuy.az"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Parol
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-[52px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
            placeholder="••••••••"
            required
          />
        </div>
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="min-h-[56px] w-full rounded-2xl bg-orange-600 text-lg font-bold text-white shadow-lg transition hover:bg-orange-500"
        >
          Daxil ol
        </button>
      </form>

      <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">Demo Avrora hesabı</p>
        <p className="mt-1 font-mono text-xs sm:text-sm">
          avrora@demo.swiftbuy.az
        </p>
        <p className="mt-1 font-mono text-xs sm:text-sm">Avrora2026!</p>
      </div>
    </div>
  );
}
