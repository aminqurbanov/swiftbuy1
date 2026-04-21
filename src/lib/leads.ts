import { Lead, DemoFormData } from "@/types/lead";
import { randomUUID } from "crypto";
import { isMockPrototypeMode } from "@/lib/config";
import { DEMO_LEADS_SEED } from "@/lib/mockSeed";
import { getSupabaseServer } from "@/lib/supabase";

const localLeads: Lead[] = [];

/** PostgREST/pg often returns lowercase keys for unquoted identifiers. */
function mapLeadRow(row: Record<string, unknown>): Lead {
  const r = row as Record<string, string | undefined>;
  return {
    id: String(r.id),
    name: String(r.name ?? ""),
    phone: String(r.phone ?? ""),
    businessName: String(r.businessName ?? r.businessname ?? ""),
    city: String(r.city ?? ""),
    salesArea: r.salesArea ?? r.salesarea ?? undefined,
    intent: String(r.intent ?? ""),
    role: String(r.role ?? ""),
    createdAt: String(r.createdAt ?? r.createdat ?? new Date().toISOString()),
  };
}

export async function saveLead(data: DemoFormData): Promise<Lead> {
  const supabase = getSupabaseServer();

  if (supabase) {
    try {
      // Lowercase keys match default PG column names from unquoted migration DDL
      const { data: row, error } = await supabase
        .from("leads")
        .insert({
          name: data.name,
          phone: data.phone,
          businessName: data.businessName,
          city: data.city,
          salesArea: data.salesArea ?? null,
          intent: data.intent,
          role: data.role,
        })
        .select()
        .single();

      if (error) throw error;
      return mapLeadRow(row as Record<string, unknown>);
    } catch (err) {
      console.error("[leads] Supabase insert error:", err);
    }
  }

  const lead: Lead = {
    id: randomUUID(),
    name: data.name,
    phone: data.phone,
    businessName: data.businessName,
    city: data.city,
    salesArea: data.salesArea,
    intent: data.intent,
    role: data.role,
    createdAt: new Date().toISOString(),
  };

  localLeads.push(lead);
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = getSupabaseServer();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) throw error;
      return (data ?? []).map((row) =>
        mapLeadRow(row as Record<string, unknown>)
      );
    } catch (err) {
      console.error("[leads] Supabase fetch error:", err);
    }
  }

  const merged = isMockPrototypeMode()
    ? [...DEMO_LEADS_SEED, ...localLeads]
    : [...localLeads];

  return merged.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
