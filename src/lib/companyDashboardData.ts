import { mergedOrdersNewestFirst } from "@/lib/distributorInbox";
import {
  MOCK_PRODUCTS,
  type MockOrderRow,
  type MockProduct,
} from "@/lib/mockMagazaData";
import { computeDistributorStats } from "@/lib/distributorMetrics";
import {
  accountByCompanyId,
  type DistributorAccount,
} from "@/lib/mockDistributorAccounts";

/** Mağaza / anbar tədarük nöqtələri (nümunə) */
export interface SupplyAddressMock {
  id: string;
  label: string;
  city: string;
  line: string;
}

const AVRORA_ADDRESSES: SupplyAddressMock[] = [
  {
    id: "adr-1",
    label: "Əsas anbar",
    city: "Bakı",
    line: "H. Zərdabi pr., Anbar №2",
  },
  {
    id: "adr-2",
    label: "Regional pay",
    city: "Sumqayıt",
    line: "Küçə 4, konteyner meydançası",
  },
];

/** MOCK sifarişlər üzrə distribütor göstərici adı */
const ORDER_FILTER_NAME: Record<string, string> = {
  avrora: "Avrora",
};

/** dist-avrora SKU-lar */
function productsForCompany(companyId: string): MockProduct[] {
  if (companyId !== "avrora") return [];
  return MOCK_PRODUCTS.filter((p) => p.distributorId === "dist-avrora");
}

function ordersForCompany(companyId: string): MockOrderRow[] {
  const label = ORDER_FILTER_NAME[companyId];
  if (!label) return [];
  return mergedOrdersNewestFirst().filter(
    (o) => o.distributorName === label
  );
}

export interface CompanyAnalyticsMock {
  monthSalesAzn: number;
  ordersMonth: number;
  avgBasketAzn: number;
  /** demo faiz */
  growthVsLastMonth: number;
}

function analyticsFromRows(rows: MockOrderRow[]): CompanyAnalyticsMock {
  const monthMs = 30 * 24 * 60 * 60 * 1000;
  const cutoff = Date.now() - monthMs;
  const recent = rows.filter((o) => new Date(o.placedAt).getTime() >= cutoff);
  const total = recent.reduce((s, o) => s + o.total, 0);
  const count = recent.length;
  return {
    monthSalesAzn: total > 0 ? total : 8420.5,
    ordersMonth: count > 0 ? count : 24,
    avgBasketAzn: count > 0 ? total / count : 350.85,
    growthVsLastMonth: 8.2,
  };
}

export interface CompanyDashboardBundle {
  account: DistributorAccount;
  products: MockProduct[];
  productCount: number;
  orders: MockOrderRow[];
  addresses: SupplyAddressMock[];
  analytics: CompanyAnalyticsMock;
  stats: ReturnType<typeof computeDistributorStats>;
}

export function getCompanyDashboard(companyId: string): CompanyDashboardBundle | null {
  const account = accountByCompanyId(companyId);
  if (!account) return null;

  const products = productsForCompany(companyId);
  const orders = ordersForCompany(companyId);
  const addresses = companyId === "avrora" ? AVRORA_ADDRESSES : [];
  const analytics = analyticsFromRows(orders);
  const stats = computeDistributorStats(orders);

  return {
    account,
    products,
    productCount: products.length,
    orders,
    addresses,
    analytics,
    stats,
  };
}
