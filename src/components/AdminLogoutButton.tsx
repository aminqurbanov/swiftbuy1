"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={loading}
      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 disabled:opacity-50"
    >
      {loading ? "…" : "Çıxış"}
    </button>
  );
}
