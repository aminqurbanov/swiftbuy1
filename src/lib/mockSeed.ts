import type { Lead } from "@/types/lead";

/** Yalnız mock rejimdə admin / siyahılarda prototip görünüşü üçün */
export const DEMO_LEADS_SEED: Lead[] = [
  {
    id: "demo-seed-1",
    name: "Nümunə — Araz",
    phone: "+994501112233",
    businessName: "Araz Market (demo)",
    city: "Bakı",
    salesArea: undefined,
    intent: "demo",
    role: "store",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  },
  {
    id: "demo-seed-2",
    name: "Nümunə — Distribütor",
    phone: "+994551112233",
    businessName: "Veysəloğlu (demo)",
    city: "Bakı",
    salesArea: "Bakı, Abşeron",
    intent: "start",
    role: "distributor",
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
  },
];
