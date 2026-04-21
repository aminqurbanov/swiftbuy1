"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get("next") || "/admin/leads";

  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setErr("Parol səhvdir və ya giriş mümkün deyil.");
        setLoading(false);
        return;
      }
      router.push(nextPath.startsWith("/") ? nextPath : "/admin/leads");
      router.refresh();
    } catch {
      setErr("Şəbəkə xətası.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1525] p-8 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
        SwiftBuy admin
      </p>
      <h1 className="mt-2 text-2xl font-extrabold text-white">Giriş</h1>
      <p className="mt-2 text-sm text-white/40">
        Demo müraciətləri cədvəli üçün parol — mühitdə təyin olunmuş{" "}
        <code className="text-white/60">ADMIN_SECRET</code>.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="admin-pw"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45"
          >
            Parol
          </label>
          <input
            id="admin-pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="••••••••"
            required
          />
        </div>
        {err && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="min-h-[52px] w-full rounded-xl bg-blue-600 py-3 text-base font-bold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Yüklənir…" : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}
