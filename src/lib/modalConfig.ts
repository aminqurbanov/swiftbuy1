import { LeadIntent, LeadRole, ModalConfig } from "@/types/lead";

export interface ModalCopy {
  eyebrow:  string;
  title:    string;
  subtitle: string;
  cta:      string;
  fields: {
    businessName: { label: string; placeholder: string };
    showSalesArea: boolean;
  };
}

const CONFIG_MAP: Record<string, ModalCopy> = {
  "store|start": {
    eyebrow:  "Mağaza qeydiyyatı",
    title:    "Mağaza üçün qeydiyyat",
    subtitle: "Məlumatları doldurun, sizi platformaya qoşaq.",
    cta:      "Qeydiyyatdan keç",
    fields: {
      businessName: { label: "Mağaza adı", placeholder: "Mağazanızın adı" },
      showSalesArea: false,
    },
  },
  "distributor|start": {
    eyebrow:  "Distribütor qoşulması",
    title:    "Distribütor üçün qoşulma",
    subtitle: "Məlumatları doldurun, komandamız sizinlə əlaqə saxlayacaq.",
    cta:      "Müraciət et",
    fields: {
      businessName: { label: "Şirkətin adı", placeholder: "Şirkətinizin adı" },
      showSalesArea: true,
    },
  },
  "general|start": {
    eyebrow:  "Pulsuz başla",
    title:    "Platformaya qoşulun.",
    subtitle: "Məlumatları doldurun, tezliklə əlaqə saxlayacağıq.",
    cta:      "Başla",
    fields: {
      businessName: { label: "Müəssisə adı", placeholder: "Müəssisənizin adı" },
      showSalesArea: false,
    },
  },
  "general|demo": {
    eyebrow:  "Demo müraciəti",
    title:    "Platformanı canlı görün.",
    subtitle: "Məlumatları doldurun, sizinlə əlaqə saxlayaq.",
    cta:      "Demo istə",
    fields: {
      businessName: { label: "Müəssisə adı", placeholder: "Müəssisənizin adı" },
      showSalesArea: false,
    },
  },
};

export function getModalCopy(config: ModalConfig): ModalCopy {
  const key = `${config.role}|${config.intent}`;
  return CONFIG_MAP[key] ?? CONFIG_MAP["general|demo"];
}

export function buildDefaultConfig(
  intent: LeadIntent,
  role:   LeadRole
): ModalConfig {
  return { intent, role };
}
