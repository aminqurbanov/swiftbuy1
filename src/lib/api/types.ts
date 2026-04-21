/**
 * Gələcək REST/JSON API üçün tip izləri — hazırda mock ilə uyğunlaşdırılıb.
 * Backend əlavə olunanda bu fayl mənbə və ya codegen ilə sinxron saxlanıla bilər.
 */

export type OrderStatusAz =
  | "gözləyir"
  | "hazırlanır"
  | "yoldadır"
  | "tamamlandı";

export interface OrderSummaryDto {
  id: string;
  distributorName: string;
  placedAt: string;
  status: OrderStatusAz;
  total: number;
  itemCount: number;
}

export interface ProductCatalogItemDto {
  id: string;
  name: string;
  category: string;
  /** Topdan satış vahidi üçün qiymət */
  pricePerPack: number;
  stockPacks: number;
  tradeBrand?: string;
}
