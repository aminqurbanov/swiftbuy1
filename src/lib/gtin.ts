import {
  MOCK_PRODUCTS,
  distributorById,
  tradeBrandLabel,
  type MockProduct,
} from "@/lib/mockMagazaData";

/** Yalnız rəqəmlər */
export function normalizeGtinInput(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** GS1 EAN-13 yoxlama rəqəmi (ilk 12 rəqəm) */
export function ean13CheckDigit(body12: string): number {
  if (body12.length !== 12 || !/^\d{12}$/.test(body12)) {
    throw new Error("EAN-13 gövdəsi 12 rəqəm olmalıdır");
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const n = body12.charCodeAt(i)! - 48;
    sum += i % 2 === 0 ? n : n * 3;
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Hər məhsul üçün stabil nümunə GTIN (866 Azərbaycan tipli prefiks deyil —
 * yalnız demo üçün daxili kodla əlaqəlidir).
 */
export function mockGtinForProductId(productId: string): string {
  let h = 2166136261;
  for (let i = 0; i < productId.length; i++) {
    h ^= productId.charCodeAt(i)!;
    h = Math.imul(h, 16777619);
  }
  const n = Math.abs(h) % 10 ** 9;
  const body = `866${String(n).padStart(9, "0")}`;
  const check = ean13CheckDigit(body);
  return `${body}${check}`;
}

export function productByGtin(raw: string): MockProduct | undefined {
  const digits = normalizeGtinInput(raw);
  if (digits.length < 12) return undefined;
  for (const p of MOCK_PRODUCTS) {
    const full = mockGtinForProductId(p.id);
    if (full === digits) return p;
    if (digits.length === 12 && full.startsWith(digits)) return p;
  }
  return undefined;
}

export function gtinSearchResult(product: MockProduct): {
  product: MockProduct;
  tradeBrand: string;
  distributorName: string;
  gtin: string;
} {
  const dist = distributorById(product.distributorId);
  return {
    product,
    tradeBrand: tradeBrandLabel(product),
    distributorName: dist?.name ?? "—",
    gtin: mockGtinForProductId(product.id),
  };
}

/** Kömək üçün nümunə (məs. p-v2 Red Bull) */
export const DEMO_GTIN_REDBULL = mockGtinForProductId("p-v2");
