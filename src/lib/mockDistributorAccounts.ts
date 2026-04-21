/**
 * Nümayiş distribütor hesabları — real auth əvəzi.
 * Giriş: e-poçt + parol; uyğun gələndə `companyId` təyin olunur.
 */

/** Partnyorun platformada əsas rolu (UI etiketi və gələcək hüquqlar üçün) */
export type CompanyKind = "distributor" | "manufacturer" | "both";

export interface DistributorAccount {
  email: string;
  password: string;
  companyId: string;
  /** UI üçün qısa ad */
  displayName: string;
  /** Header üçün rəsmi / ticarət adı */
  legalName: string;
  logoSrc: string;
  /** Tailwind vurğu */
  accent: "blue" | "orange";
  /** Yalnız distribütor, yalnız istehsalçı, və ya hər ikisi */
  companyKind: CompanyKind;
  /** Hero üçün bir sətirlik təsvir */
  tagline: string;
}

/** Şirkət növü — qısa mətn (badge / filtr) */
export function companyKindLabel(kind: CompanyKind): string {
  if (kind === "manufacturer") return "İstehsalçı";
  if (kind === "both") return "İstehsalçı və distribütor";
  return "Distribütor";
}

export const MOCK_DISTRIBUTOR_ACCOUNTS: DistributorAccount[] = [
  {
    email: "avrora@demo.swiftbuy.az",
    password: "Avrora2026!",
    companyId: "avrora",
    displayName: "Avrora",
    legalName: "«Avrora» MMC",
    logoSrc: "/distributors/avrora-logo.png",
    accent: "blue",
    companyKind: "distributor",
    tagline:
      "İçki və FMCG üzrə topdan tədarük; Bakı və ətraf regionlara partnyor mağazalardan qəbul olunan sifarişlər (demo).",
  },
];

export function findDistributorAccount(
  email: string,
  password: string
): DistributorAccount | undefined {
  const e = email.trim().toLowerCase();
  return MOCK_DISTRIBUTOR_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === e && a.password === password
  );
}

export function accountByCompanyId(id: string): DistributorAccount | undefined {
  return MOCK_DISTRIBUTOR_ACCOUNTS.find((a) => a.companyId === id);
}
