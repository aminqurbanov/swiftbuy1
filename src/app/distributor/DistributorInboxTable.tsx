"use client";

import { mergedOrdersNewestFirst } from "@/lib/distributorInbox";
import CompanyOrdersTable from "./CompanyOrdersTable";

/** Bütün nümunə sifarişlər (üniversal inbox) */
export default function DistributorInboxTable() {
  const rows = mergedOrdersNewestFirst();
  return <CompanyOrdersTable rows={rows} />;
}
