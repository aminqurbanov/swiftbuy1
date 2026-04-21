/**
 * Avrora «Brendlər»: yalnız `public/brands/` üçün şəkil göndərilmiş brendlər.
 * Yeni brend: şəkli əlavə et + BRAND_LOGOS + uyğun kateqoriya siyahısı.
 */

export const AVRORA_CATEGORIES = [
  { id: "hamisi", label: "Hamısı" },
  { id: "serin", label: "Sərinləşdirici içkilər" },
  { id: "biskvit", label: "Biskvit" },
  { id: "un", label: "Un məmulatları" },
  { id: "sud", label: "Süd məhsulları" },
  { id: "makaron", label: "Makaron məmulatları" },
] as const;

export type AvroraCategoryId = (typeof AVRORA_CATEGORIES)[number]["id"];

export interface AvroraBrandEntry {
  id: string;
  name: string;
  categoryId: AvroraCategoryId;
  logoSrc: string;
}

function pack(
  names: string[],
  categoryId: AvroraCategoryId,
  prefix: string
): AvroraBrandEntry[] {
  return names.map((name, i) => ({
    id: `${prefix}-${i}`,
    name,
    categoryId,
    logoSrc: BRAND_LOGOS[name]!,
  }));
}

/** Brend adı siyahıdakı mətn ilə düz istənməlidir */
const BRAND_LOGOS: Record<string, string> = {
  BIZON: "/brands/bizon.png",
  "GO!": "/brands/go.png",
  JAGUAR: "/brands/jaguar.png",
  "МИРДАРИ": "/brands/mirdari.png",
  KREKI: "/brands/kreki.png",
  "Günaydın": "/brands/gunaydin.png",
  Danone: "/brands/danone.png",
  Atena: "/brands/atena.png",
  Rollton: "/brands/rollton.png",
  "Big Bon": "/brands/big-bon.png",
};

const SERIN = ["BIZON", "GO!", "JAGUAR", "МИРДАРИ"] as const;
const BISKVIT = ["KREKI"] as const;
const UN = ["Günaydın"] as const;
const SUD = ["Danone", "Atena"] as const;
const MAKARON = ["Rollton", "Big Bon"] as const;

export const MOCK_AVRORA_BRANDS: AvroraBrandEntry[] = [
  ...pack([...SERIN], "serin", "avr-serin"),
  ...pack([...BISKVIT], "biskvit", "avr-biskvit"),
  ...pack([...UN], "un", "avr-un"),
  ...pack([...SUD], "sud", "avr-sud"),
  ...pack([...MAKARON], "makaron", "avr-makaron"),
];

export function brandsForCategory(
  categoryId: AvroraCategoryId
): AvroraBrandEntry[] {
  if (categoryId === "hamisi") return [...MOCK_AVRORA_BRANDS];
  return MOCK_AVRORA_BRANDS.filter((b) => b.categoryId === categoryId);
}

export function monogramFromName(name: string): string {
  const chars = [...name.replace(/\s+/g, "")];
  const a = chars[0];
  const b = chars[1] ?? chars[0];
  if (!a) return "?";
  return (String(a) + String(b ?? "")).toUpperCase().slice(0, 2);
}
