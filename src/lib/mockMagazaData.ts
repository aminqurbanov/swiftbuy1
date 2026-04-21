/** Mağaza panelində nümayiş: bir neçə distribütor, hər birinin öz kataloqu (topdan vahidlər). */

export type { MockManufacturer } from "./mockManufacturers";
export {
  manufacturerById,
  MOCK_MANUFACTURERS,
  RAYON_AZ_LIST,
} from "./mockManufacturers";

export interface MockDistributor {
  id: string;
  name: string;
  /** Qısa ad (tab/chip) */
  shortLabel: string;
  city: string;
  blurb: string;
  /** Ticarət logosu əvəzinə prototip monogram (1–2 simvol) */
  logoMark: string;
  /** Tailwind: chip üçün border/accent */
  accent: "blue" | "orange" | "emerald";
}

export interface MockBrand {
  id: string;
  name: string;
}

export interface MockProduct {
  id: string;
  distributorId: string;
  /** Portal istehsalçası (İstehsalçılar siyahısı ilə əlaqə) */
  manufacturerId: string;
  brandId: string;
  /**
   * Kataloqda göstəriləcək satış brendi.
   * Boşdursa `MOCK_BRANDS` içindəki `brandId` adı istifadə olunur.
   */
  tradeBrand?: string;
  name: string;
  category: string;
  /**
   * Topdan satış vahidi — kaset, bağlama, qutu blok və s.
   * Qiymət bu vahid üçün (məs: 1 kasetin qiyməti).
   */
  packLabel: string;
  /** Ətraflı: növbə sayı */
  piecesInPack: number;
  price: number;
  stockPacks: number;
}

export interface MockOrderRow {
  id: string;
  distributorName: string;
  placedAt: string;
  status: "gözləyir" | "hazırlanır" | "yoldadır" | "tamamlandı";
  total: number;
  itemCount: number;
  /** Sifarişi verən mağaza (partnyor) */
  storeName?: string;
  storeAddress?: string;
  /** İzləmə nümayişi: distribütor anbarı (WGS84) */
  originLat?: number;
  originLng?: number;
  /** Çatdırılma hədəfi — mağaza */
  destLat?: number;
  destLng?: number;
}

/** Mağaza səbətindən göndərilən sifarişlər üçün standart demo ünvan */
export const DEMO_STORE_DEFAULT = {
  name: "Araz Market — Bakıxanov",
  address: "Bakıxanov qəs., Əlif Ələsgər küç. 14",
  lat: 40.4172,
  lng: 49.9678,
} as const;

/** Nümayiş anbar nöqtəsi (məs. Avrora əsas pay) — koordinatlar yuvarlaq Bakı */
export const DEMO_DEPOT_AVRORA = {
  originLat: 40.395,
  originLng: 49.882,
} as const;

export const MOCK_DISTRIBUTORS: MockDistributor[] = [
  {
    id: "dist-veyseloglu",
    name: "Veysəloğlu",
    shortLabel: "Veysəloğlu",
    city: "Bakı",
    blurb: "Qida, içki, gigiyena — geniş SKU. Topdan kaset və bağlama ilə.",
    logoMark: "V",
    accent: "blue",
  },
  {
    id: "dist-avrora",
    name: "Avrora",
    shortLabel: "Avrora",
    city: "Bakı",
    blurb: "Çörək, qənnadı, dondurulmuş. Əksər məhsullar topdan bağlama/qutu ilə.",
    logoMark: "A",
    accent: "orange",
  },
  {
    id: "dist-gunesh",
    name: "Günəş Distribution",
    shortLabel: "Günəş Dist.",
    city: "Sumqayıt / Bakı",
    blurb: "Regional içki və qida. Kiçik həcmli toplu qutu və kaset.",
    logoMark: "G",
    accent: "emerald",
  },
];

export const MOCK_BRANDS: MockBrand[] = [
  { id: "br-pinar", name: "Pınar" },
  { id: "br-redbull", name: "Red Bull" },
  { id: "br-az-ichki", name: "Azəristiləşdirici konsern" },
  { id: "br-unilever", name: "Unilever" },
  { id: "br-milla", name: "Milla" },
  { id: "br-vega", name: "Vega" },
  { id: "br-local", name: "Yerli istehsal" },
  { id: "br-bizon", name: "BIZON" },
  { id: "br-go-brand", name: "GO!" },
  { id: "br-jaguar", name: "JAGUAR" },
  { id: "br-mirdari", name: "МИРДАРИ" },
  { id: "br-kreki", name: "KREKI" },
  { id: "br-gunaydin", name: "Günaydın" },
  { id: "br-danone", name: "Danone" },
  { id: "br-atena", name: "Atena" },
  { id: "br-rollton", name: "Rollton" },
  { id: "br-bigbon", name: "Big Bon" },
  { id: "br-nestle", name: "Nestlé" },
  { id: "br-mars", name: "MARS" },
  { id: "br-eti", name: "Eti" },
  { id: "br-haribo", name: "Haribo" },
  { id: "br-badamli", name: "Badamlı" },
  { id: "br-qidam", name: "Qidam" },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "p-v1",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-gilan-fmcg",
    brandId: "br-pinar",
    tradeBrand: "Pınar",
    name: "Pınar uzunömürlü süd",
    category: "Süd məhsulları",
    packLabel: "1 kaset (12 ədəd × 1 L)",
    piecesInPack: 12,
    price: 28.8,
    stockPacks: 40,
  },
  {
    id: "p-v2",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-orison",
    brandId: "br-redbull",
    tradeBrand: "Red Bull",
    name: "Red Bull enerji içkisi",
    category: "İçkilər",
    packLabel: "1 kaset (24 ədəd × 250 ml)",
    piecesInPack: 24,
    price: 42.0,
    stockPacks: 55,
  },
  {
    id: "p-v3",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-aqro",
    brandId: "br-unilever",
    tradeBrand: "CALVE",
    name: "CALVE mayonez topdan",
    category: "Konserv / ədviyyat",
    packLabel: "1 bağlama (8 qutu × 650 q)",
    piecesInPack: 8,
    price: 36.0,
    stockPacks: 22,
  },
  /** Veysəloğlu brend şəbəkəsi — Brendlər ekranı ilə uyğun (tradeBrand = brend adı) */
  {
    id: "p-vl-nestle",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-iffa",
    brandId: "br-nestle",
    tradeBrand: "Nestlé",
    name: "Nestlé NESQUIK kakao içkisi 180 ml",
    category: "İçkilər",
    packLabel: "1 kaset (24 ədəd)",
    piecesInPack: 24,
    price: 32.4,
    stockPacks: 48,
  },
  {
    id: "p-vl-mars",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-orison",
    brandId: "br-mars",
    tradeBrand: "MARS",
    name: "MARS Snickers mini şokolad topdan",
    category: "Qənnadı",
    packLabel: "1 qutu (50 ədəd × 18 q)",
    piecesInPack: 50,
    price: 88.0,
    stockPacks: 20,
  },
  {
    id: "p-vl-eti",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-orison",
    brandId: "br-eti",
    tradeBrand: "Eti",
    name: "Eti kraker dairəvi tuzlu 150 q",
    category: "Biskvit",
    packLabel: "1 bağlama (12 paket)",
    piecesInPack: 12,
    price: 24.0,
    stockPacks: 60,
  },
  {
    id: "p-vl-haribo",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-orison",
    brandId: "br-haribo",
    tradeBrand: "Haribo",
    name: "Haribo Goldbären 200 q",
    category: "Şirniyyat",
    packLabel: "1 qutu (18 paket)",
    piecesInPack: 18,
    price: 36.0,
    stockPacks: 35,
  },
  {
    id: "p-vl-badamli",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-aqro",
    brandId: "br-badamli",
    tradeBrand: "Badamlı",
    name: "Badamlı təbii mineral su 0,75 L",
    category: "Su",
    packLabel: "1 kaset (12 ədəd)",
    piecesInPack: 12,
    price: 8.4,
    stockPacks: 200,
  },
  {
    id: "p-vl-qidam",
    distributorId: "dist-veyseloglu",
    manufacturerId: "mfg-gilan-fmcg",
    brandId: "br-qidam",
    tradeBrand: "Qidam",
    name: "Qidam süd içkisi 1 L",
    category: "Süd məhsulları",
    packLabel: "1 kaset (6 ədəd)",
    piecesInPack: 6,
    price: 14.4,
    stockPacks: 40,
  },
  {
    id: "p-a1",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-iffa",
    brandId: "br-milla",
    tradeBrand: "Milla",
    name: "Milla qatıq 10% bucket",
    category: "Süd məhsulları",
    packLabel: "1 qutu (4 vedro × 5 kq)",
    piecesInPack: 4,
    price: 120.0,
    stockPacks: 15,
  },
  {
    id: "p-a2",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-aqro",
    brandId: "br-az-ichki",
    tradeBrand: "Qazlı su / limon seriyası",
    name: "Qazlı su limon 0,33 L",
    category: "İçkilər",
    packLabel: "1 kaset (12 ədəd)",
    piecesInPack: 12,
    price: 5.4,
    stockPacks: 200,
  },
  {
    id: "p-a3",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-nadir-toxum",
    brandId: "br-local",
    tradeBrand: "Kündə çörək",
    name: "Kündə çörək topdan",
    category: "Çörək",
    packLabel: "1 bağlama (60 ədəd)",
    piecesInPack: 60,
    price: 18.0,
    stockPacks: 35,
  },
  {
    id: "p-g1",
    distributorId: "dist-gunesh",
    manufacturerId: "mfg-sunbul",
    brandId: "br-vega",
    tradeBrand: "Vega",
    name: "Vega kərə yağı blok",
    category: "Ərzaq",
    packLabel: "1 qutu (20 paket × 200 q)",
    piecesInPack: 20,
    price: 44.0,
    stockPacks: 18,
  },
  {
    id: "p-g2",
    distributorId: "dist-gunesh",
    manufacturerId: "mfg-sabirabad-konserv",
    brandId: "br-local",
    tradeBrand: "Yerli şəkər",
    name: "Şəkər 1 kq paket",
    category: "Ərzaq",
    packLabel: "1 bağlama (10 kq × 10 ədəd)",
    piecesInPack: 10,
    price: 52.0,
    stockPacks: 30,
  },
  /** Avrora brend şəbəkəsi — Brendlər ekranı ilə uyğun (tradeBrand = brend adı) */
  {
    id: "p-avr-bizon",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-orison",
    brandId: "br-bizon",
    tradeBrand: "BIZON",
    name: "BIZON Enrich enerji içkisi 250 ml",
    category: "İçkilər",
    packLabel: "1 kaset (24 ədəd × 250 ml)",
    piecesInPack: 24,
    price: 38.0,
    stockPacks: 80,
  },
  {
    id: "p-avr-go",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-orison",
    brandId: "br-go-brand",
    tradeBrand: "GO!",
    name: "GO! GOLD kokteyl içkisi 250 ml",
    category: "İçkilər",
    packLabel: "1 kaset (24 ədəd)",
    piecesInPack: 24,
    price: 44.0,
    stockPacks: 45,
  },
  {
    id: "p-avr-jaguar",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-orison",
    brandId: "br-jaguar",
    tradeBrand: "JAGUAR",
    name: "Jaguar LIVE enerji içkisi",
    category: "İçkilər",
    packLabel: "1 kaset (12 ədəd × 0,5 L)",
    piecesInPack: 12,
    price: 22.0,
    stockPacks: 60,
  },
  {
    id: "p-avr-mirdari",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-aqro",
    brandId: "br-mirdari",
    tradeBrand: "МИРДАРИ",
    name: "Мирдари Tarxun limonad 0,5 L",
    category: "İçkilər",
    packLabel: "1 kaset (12 ədəd)",
    piecesInPack: 12,
    price: 9.6,
    stockPacks: 120,
  },
  {
    id: "p-avr-kreki",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-student-demo",
    brandId: "br-kreki",
    tradeBrand: "KREKI",
    name: "KREKI stick crackers ədviyyatlı 45 q",
    category: "Biskvit",
    packLabel: "1 qutu (24 paket)",
    piecesInPack: 24,
    price: 28.0,
    stockPacks: 40,
  },
  {
    id: "p-avr-gunaydin",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-nadir-toxum",
    brandId: "br-gunaydin",
    tradeBrand: "Günaydın",
    name: "Günaydın un yüksək keyfiyyət 10 kq",
    category: "Un",
    packLabel: "1 çuval (10 kq)",
    piecesInPack: 1,
    price: 26.0,
    stockPacks: 150,
  },
  {
    id: "p-avr-danone",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-iffa",
    brandId: "br-danone",
    tradeBrand: "Danone",
    name: "Danone yoqurt stəkan (4 ədəd paket)",
    category: "Süd məhsulları",
    packLabel: "1 kaset (8 paket × 4 stəkan)",
    piecesInPack: 8,
    price: 64.0,
    stockPacks: 25,
  },
  {
    id: "p-avr-atena",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-iffa",
    brandId: "br-atena",
    tradeBrand: "Atena",
    name: "Atena dovğa 1 L",
    category: "Süd məhsulları",
    packLabel: "1 kaset (6 ədəd × 1 L)",
    piecesInPack: 6,
    price: 16.8,
    stockPacks: 55,
  },
  {
    id: "p-avr-rollton",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-student-demo",
    brandId: "br-rollton",
    tradeBrand: "Rollton",
    name: "Rollton vermişel toyuq ləzzəti",
    category: "Makaron",
    packLabel: "1 qutu (30 paket)",
    piecesInPack: 30,
    price: 48.0,
    stockPacks: 70,
  },
  {
    id: "p-avr-bigbon",
    distributorId: "dist-avrora",
    manufacturerId: "mfg-student-demo",
    brandId: "br-bigbon",
    tradeBrand: "Big Bon",
    name: "Big Bon əriştə toyuq + salsa",
    category: "Makaron",
    packLabel: "1 qutu (24 paket × 75 q)",
    piecesInPack: 24,
    price: 42.0,
    stockPacks: 50,
  },
];

export const MOCK_ORDERS: MockOrderRow[] = [
  {
    id: "SB-1042",
    distributorName: "Veysəloğlu",
    placedAt: "2026-04-21T09:14:00",
    status: "hazırlanır",
    total: 118.5,
    itemCount: 8,
    storeName: "Nərmin Market — Maştağa",
    storeAddress: "Maştağa, H. Əliyev pr. 112",
    originLat: 40.38,
    originLng: 49.85,
    destLat: 40.57,
    destLng: 49.95,
  },
  {
    id: "SB-1041",
    distributorName: "Avrora",
    placedAt: "2026-04-20T14:32:00",
    status: "yoldadır",
    total: 64.0,
    itemCount: 5,
    storeName: "Günəş Market — Zabrat",
    storeAddress: "Zabrat qəs., Mərkəzi küç. 7",
    originLat: DEMO_DEPOT_AVRORA.originLat,
    originLng: DEMO_DEPOT_AVRORA.originLng,
    destLat: 40.495,
    destLng: 49.92,
  },
  {
    id: "SB-1038",
    distributorName: "Veysəloğlu",
    placedAt: "2026-04-19T11:05:00",
    status: "tamamlandı",
    total: 210.2,
    itemCount: 12,
    storeName: "Araz Market — Yasamal",
    storeAddress: "Yasamal, A. M. Şərifzadə küç. 45",
    originLat: 40.38,
    originLng: 49.85,
    destLat: 40.37,
    destLng: 49.82,
  },
  {
    id: "SB-1035",
    distributorName: "Günəş Distribution",
    placedAt: "2026-04-18T08:40:00",
    status: "tamamlandı",
    total: 44.7,
    itemCount: 3,
    storeName: "Kiwi Mini — Sumqayıt",
    storeAddress: "Sumqayıt, 11-ci mkr., ev 4",
    originLat: 40.59,
    originLng: 49.63,
    destLat: 40.595,
    destLng: 49.65,
  },
  {
    id: "SB-1032",
    distributorName: "Avrora",
    placedAt: "2026-04-17T16:22:00",
    status: "tamamlandı",
    total: 92.0,
    itemCount: 6,
    storeName: DEMO_STORE_DEFAULT.name,
    storeAddress: DEMO_STORE_DEFAULT.address,
    originLat: DEMO_DEPOT_AVRORA.originLat,
    originLng: DEMO_DEPOT_AVRORA.originLng,
    destLat: DEMO_STORE_DEFAULT.lat,
    destLng: DEMO_STORE_DEFAULT.lng,
  },
];

export const DASHBOARD_STATS = {
  ordersToday: 2,
  pending: 1,
  monthTotalAzn: 18420.5,
  partnerDistributors: MOCK_DISTRIBUTORS.length,
};

export function brandById(id: string): MockBrand | undefined {
  return MOCK_BRANDS.find((b) => b.id === id);
}

/** Kart / səbət üçün görünən brend adı */
export function tradeBrandLabel(p: MockProduct): string {
  if (p.tradeBrand?.trim()) return p.tradeBrand.trim();
  return brandById(p.brandId)?.name ?? "—";
}

export function distributorById(id: string): MockDistributor | undefined {
  return MOCK_DISTRIBUTORS.find((d) => d.id === id);
}

/** Portaldakı ümumi SKU sayı (bütün distribütorlar) — istehsalçı kartı üçün */
export function productCountForManufacturer(manufacturerId: string): number {
  return MOCK_PRODUCTS.filter((p) => p.manufacturerId === manufacturerId).length;
}
