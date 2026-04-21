import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin — Müraciətlər", robots: { index: false, follow: false } };

import AdminLogoutButton from "@/components/AdminLogoutButton";
import { getLeads } from "@/lib/leads";
import type { Lead } from "@/types/lead";

export const dynamic = "force-dynamic";

const ROLE_LABEL: Record<string, string> = {
  store:       "Mağaza",
  distributor: "Distribütor",
  general:     "Ümumi",
};

const INTENT_LABEL: Record<string, string> = {
  start: "Qeydiyyat",
  demo:  "Demo",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("az-AZ", {
    day:    "2-digit",
    month:  "2-digit",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  try {
    leads = await getLeads();
  } catch {
    leads = [];
  }

  return (
    <main className="min-h-screen bg-[#080D1A] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              Admin Panel
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Demo Müraciətləri
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-white/70">
                {leads.length} müraciət
              </span>
            </div>
            <AdminLogoutButton />
          </div>
        </div>

        {leads.length === 0 ? (
          <EmptyState />
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>
    </main>
  );
}

/* ── Table ─────────────────────────────────────────────── */
function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/[0.03]">
              {["Ad", "Telefon", "Müəssisə", "Şəhər", "Rol", "Məqsəd", "Tarix"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white/35"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={lead.id}
                className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                  i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                }`}
              >
                <td className="px-5 py-4 text-white/85 font-medium">{lead.name}</td>
                <td className="px-5 py-4 text-white/60 font-mono text-xs">{lead.phone}</td>
                <td className="px-5 py-4 text-white/70">{lead.businessName}</td>
                <td className="px-5 py-4 text-white/60">{lead.city}</td>
                <td className="px-5 py-4">
                  <RoleBadge role={lead.role} />
                </td>
                <td className="px-5 py-4">
                  <IntentBadge intent={lead.intent} />
                </td>
                <td className="px-5 py-4 text-white/35 text-xs whitespace-nowrap">
                  {formatDate(lead.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col divide-y divide-white/5">
        {leads.map((lead) => (
          <div key={lead.id} className="px-5 py-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold">{lead.name}</p>
              <RoleBadge role={lead.role} />
            </div>
            <p className="text-white/50 font-mono text-xs">{lead.phone}</p>
            <p className="text-white/60 text-sm">{lead.businessName} — {lead.city}</p>
            <div className="flex items-center justify-between mt-1">
              <IntentBadge intent={lead.intent} />
              <p className="text-white/25 text-xs">{formatDate(lead.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Badges ─────────────────────────────────────────────── */
function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    store:       "text-blue-300 bg-blue-700/15",
    distributor: "text-orange-300 bg-orange-700/15",
    general:     "text-white/40 bg-white/8",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${styles[role] ?? styles.general}`}>
      {ROLE_LABEL[role] ?? role}
    </span>
  );
}

function IntentBadge({ intent }: { intent: string }) {
  const styles: Record<string, string> = {
    start: "text-emerald-300 bg-emerald-700/15",
    demo:  "text-purple-300 bg-purple-700/15",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${styles[intent] ?? "text-white/40 bg-white/8"}`}>
      {INTENT_LABEL[intent] ?? intent}
    </span>
  );
}

/* ── Empty ──────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-8 py-16 text-center">
      <p className="text-white/20 text-lg font-semibold mb-2">Müraciət yoxdur</p>
      <p className="text-white/15 text-sm">Formdan ilk müraciət gəldikdə burada görünəcək.</p>
    </div>
  );
}
