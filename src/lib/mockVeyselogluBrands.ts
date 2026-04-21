/**
 * Veysəloğlu «Brendlər»: veysehoglu.az strukturuna yaxın — distribusiya və şəxsi markalar.
 * Şəkillər: `public/brands/` (fayl əlavə olunandan sonra BRAND_LOGOS-a yazın).
 */

export const VEYSELOGLU_CATEGORIES = [
  { id: "hamisi", label: "Hamısı" },
  {
    id: "distribusiya",
    label: "Distribusiya markaları",
  },
  { id: "sexsi", label: "Şəxsi markalar" },
] as const;

export type VeyselogluCategoryId =
  (typeof VEYSELOGLU_CATEGORIES)[number]["id"];

export interface VeyselogluBrandEntry {
  id: string;
  name: string;
  categoryId: VeyselogluCategoryId;
  logoSrc: string;
}

function pack(
  names: string[],
  categoryId: VeyselogluCategoryId,
  prefix: string
): VeyselogluBrandEntry[] {
  return names.map((name, i) => ({
    id: `${prefix}-${i}`,
    name,
    categoryId,
    logoSrc: BRAND_LOGOS[name]!,
  }));
}

/** Brend adı BRAND_LOGOS açarları ilə eyni olmalıdır */
const BRAND_LOGOS: Record<string, string> = {
  "Nestlé": "/brands/nestle.png",
  MARS: "/brands/mars.png",
  "Red Bull": "/brands/red-bull.png",
  Eti: "/brands/eti.png",
  Haribo: "/brands/haribo.png",
  Badamlı: "/brands/badamli.png",
  Qidam: "/brands/qidam.png",
};

const DISTRIBUSIYA = [
  "Nestlé",
  "MARS",
  "Red Bull",
  "Eti",
  "Haribo",
] as const;
const SEXSI = ["Badamlı", "Qidam"] as const;

export const MOCK_VEYSELOGLU_BRANDS: VeyselogluBrandEntry[] = [
  ...pack([...DISTRIBUSIYA], "distribusiya", "vl-dist"),
  ...pack([...SEXSI], "sexsi", "vl-sexsi"),
];

export function veyselogluBrandsForCategory(
  categoryId: VeyselogluCategoryId
): VeyselogluBrandEntry[] {
  if (categoryId === "hamisi") return [...MOCK_VEYSELOGLU_BRANDS];
  return MOCK_VEYSELOGLU_BRANDS.filter((b) => b.categoryId === categoryId);
}
