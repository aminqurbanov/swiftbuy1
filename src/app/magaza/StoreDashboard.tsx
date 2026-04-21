"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import AvroraBrandsPanel from "@/components/AvroraBrandsPanel";
import VeyselogluBrandsPanel from "@/components/VeyselogluBrandsPanel";
import DistributorLogoMark from "@/components/DistributorLogoMark";
import { formatAzn } from "@/lib/formatAzn";
import { ordersForDashboard } from "@/lib/mockOrderLookup";
import { appendPlacedOrder, nextOrderId } from "@/lib/mockOrderSession";
import {
  DASHBOARD_STATS,
  DEMO_DEPOT_AVRORA,
  DEMO_STORE_DEFAULT,
  MOCK_DISTRIBUTORS,
  MOCK_PRODUCTS,
  distributorById,
  manufacturerById,
  tradeBrandLabel,
  type MockDistributor,
  type MockOrderRow,
  type MockProduct,
} from "@/lib/mockMagazaData";

type CartLine = { product: MockProduct; qty: number };

const STATUS_STYLE: Record<string, string> = {
  gözləyir:
    "border border-amber-300 bg-amber-50 text-amber-900",
  hazırlanır:
    "border border-blue-300 bg-blue-50 text-blue-900",
  yoldadır:
    "border border-orange-300 bg-orange-50 text-orange-900",
  tamamlandı:
    "border border-emerald-300 bg-emerald-50 text-emerald-900",
};

const IDLE_BTN: Record<MockDistributor["accent"], string> = {
  blue:
    "border-2 border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/80",
  orange:
    "border-2 border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/80",
  emerald:
    "border-2 border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/80",
};

const ACTIVE_BTN: Record<MockDistributor["accent"], string> = {
  blue: "border-2 border-blue-500 bg-blue-50 ring-4 ring-blue-100 shadow-md",
  orange:
    "border-2 border-orange-500 bg-orange-50 ring-4 ring-orange-100 shadow-md",
  emerald:
    "border-2 border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100 shadow-md",
};

export default function StoreDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mfgParam = searchParams.get("mfg");
  const mfg = useMemo(
    () => (mfgParam ? manufacturerById(mfgParam) : undefined),
    [mfgParam]
  );

  const [selectedDistId, setSelectedDistId] = useState<string>(
    MOCK_DISTRIBUTORS[0]!.id
  );
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [placedFlash, setPlacedFlash] = useState<MockOrderRow | null>(null);
  const [mainTab, setMainTab] = useState<"catalog" | "brands" | "orders">(
    "catalog"
  );

  const mergedOrders = ordersForDashboard();

  const selectedD = distributorById(selectedDistId);

  const productsForDist = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.distributorId === selectedDistId),
    [selectedDistId]
  );

  const productsForCatalog = useMemo(() => {
    if (!mfg) return productsForDist;
    return productsForDist.filter((p) => p.manufacturerId === mfg.id);
  }, [productsForDist, mfg]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = productsForCatalog;
    if (!q) return list;
    return list.filter((p) => {
      const brand = tradeBrandLabel(p).toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        brand.includes(q)
      );
    });
  }, [query, productsForCatalog]);

  const skuCount = productsForCatalog.length;

  const cartTotal = useMemo(
    () => cart.reduce((s, l) => s + l.product.price * l.qty, 0),
    [cart]
  );

  function showToast(msg: string, ms = 2800) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function pickDistributor(id: string) {
    if (id === selectedDistId) return;
    setSelectedDistId(id);
    setQuery("");
    setMainTab((prev) =>
      id !== "dist-avrora" && id !== "dist-veyseloglu" && prev === "brands"
        ? "catalog"
        : prev
    );
    if (cart.length > 0) {
      setCart([]);
      showToast("Distribütor dəyişdi — səbət təmizləndi", 3200);
    }
  }

  function addLine(p: MockProduct) {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        const nextQty = next[i]!.qty + 1;
        if (nextQty > p.stockPacks) {
          showToast("Stokda bu qədər kaset/bağlama yoxdur (nümunə)");
          return prev;
        }
        next[i] = { ...next[i]!, qty: nextQty };
        return next;
      }
      if (p.stockPacks < 1) {
        showToast("Stokda yoxdur");
        return prev;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  }

  function setQty(pid: string, qty: number) {
    setCart((prev) => {
      const line = prev.find((x) => x.product.id === pid);
      if (!line) return prev;
      if (qty < 1) return prev.filter((x) => x.product.id !== pid);
      if (qty > line.product.stockPacks) {
        showToast("Stok limiti");
        return prev;
      }
      return prev.map((x) => (x.product.id === pid ? { ...x, qty } : x));
    });
  }

  function removeLine(pid: string) {
    setCart((prev) => prev.filter((x) => x.product.id !== pid));
  }

  function submitOrder() {
    if (!selectedD) return;
    if (cart.length === 0) {
      showToast("Səbət boşdur", 2000);
      return;
    }
    const row: MockOrderRow = {
      id: nextOrderId(),
      distributorName: selectedD.name,
      placedAt: new Date().toISOString(),
      status: "gözləyir",
      total: cartTotal,
      itemCount: cart.reduce((s, l) => s + l.qty, 0),
      storeName: DEMO_STORE_DEFAULT.name,
      storeAddress: DEMO_STORE_DEFAULT.address,
      destLat: DEMO_STORE_DEFAULT.lat,
      destLng: DEMO_STORE_DEFAULT.lng,
      ...(selectedD.id === "dist-avrora"
        ? {
            originLat: DEMO_DEPOT_AVRORA.originLat,
            originLng: DEMO_DEPOT_AVRORA.originLng,
          }
        : {
            originLat: 40.38,
            originLng: 49.85,
          }),
    };
    appendPlacedOrder(row);
    setPlacedFlash(row);
    setCart([]);
    setMainTab("orders");
  }

  return (
    <div
      className={`mx-auto max-w-6xl px-4 pt-8 sm:px-6 ${
        cart.length > 0 &&
        (mainTab === "catalog" || mainTab === "brands")
          ? "pb-32 lg:pb-24"
          : "pb-24"
      }`}
    >
      {placedFlash && (
        <div
          className="fixed bottom-6 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-5 py-4 shadow-xl"
          role="status"
        >
          <p className="text-lg font-semibold text-emerald-950">
            Sifariş qeydə alındı:{" "}
            <span className="font-mono tabular-nums">{placedFlash.id}</span>
          </p>
          <p className="mt-1 text-base text-emerald-900/90">
            {formatAzn(placedFlash.total)} · {placedFlash.itemCount} sətir · status:{" "}
            {placedFlash.status}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/magaza/sifaris-izle?no=${encodeURIComponent(placedFlash.id)}`}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-emerald-700 px-4 text-base font-bold text-white transition hover:bg-emerald-800"
            >
              İzlə
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-emerald-400 bg-white px-4 text-base font-semibold text-emerald-900 transition hover:bg-emerald-100/80"
              onClick={() => setPlacedFlash(null)}
            >
              Bağla
            </button>
          </div>
        </div>
      )}

      {toast && !placedFlash && (
        <div
          className="fixed bottom-6 left-1/2 z-50 max-w-lg -translate-x-1/2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-6 py-4 text-center text-lg font-medium text-emerald-900 shadow-xl"
          role="status"
        >
          {toast}
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Topdan sifariş
        </h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-slate-600">
          Partnyor seçin → kataloqdan vahid (kaset, bağlama) əlavə edin → sifarişi
          göndərin.
        </p>
      </header>

      {mfg && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-blue-200 bg-blue-50/90 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-slate-800">
            <span className="text-slate-500">İstehsalçı: </span>
            <span className="font-semibold text-slate-900">{mfg.name}</span>
            {skuCount === 0 && (
              <span className="mt-2 block text-base text-amber-800">
                Bu partnyorda SKU yoxdur —{" "}
                <Link
                  href="/magaza/istehsalchilar"
                  className="font-semibold underline decoration-2 underline-offset-2 hover:text-amber-950"
                >
                  başqa istehsalçı
                </Link>{" "}
                və ya partnyor dəyişin.
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={() => router.push("/magaza")}
            className="min-h-[48px] shrink-0 rounded-xl border-2 border-slate-300 bg-white px-5 text-base font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Filtrı sök
          </button>
        </div>
      )}

      <section className="mb-8">
        <p className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-500">
          Partnyor distribütor
        </p>
        <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
          {MOCK_DISTRIBUTORS.map((d) => {
            const active = d.id === selectedDistId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => pickDistributor(d.id)}
                className={`flex min-w-[220px] shrink-0 items-center gap-4 rounded-2xl px-4 py-4 text-left shadow-sm transition sm:min-w-0 ${
                  active ? ACTIVE_BTN[d.accent] : IDLE_BTN[d.accent]
                }`}
              >
                <DistributorLogoMark distributor={d} size="lg" active={active} />
                <span className="min-w-0">
                  <span className="block truncate text-lg font-bold text-slate-900">
                    {d.shortLabel}
                  </span>
                  <span className="text-base text-slate-500">{d.city}</span>
                </span>
              </button>
            );
          })}
        </div>
        {selectedD && (
          <p className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-600 shadow-sm">
            <span className="font-semibold text-slate-800">{selectedD.name}</span>
            {" — "}
            {selectedD.blurb}
          </p>
        )}
      </section>

      <section
        className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-600 shadow-sm"
        aria-label="Qısa göstəricilər"
      >
        <span>
          Bu gün:{" "}
          <strong className="tabular-nums text-slate-900">
            {DASHBOARD_STATS.ordersToday}
          </strong>
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>
          Gözləyir:{" "}
          <strong className="tabular-nums text-slate-900">
            {DASHBOARD_STATS.pending}
          </strong>
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>
          Ay cəmi:{" "}
          <strong className="tabular-nums text-emerald-700">
            {formatAzn(DASHBOARD_STATS.monthTotalAzn)}
          </strong>
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>
          Partnyor:{" "}
          <strong className="text-slate-900">
            {DASHBOARD_STATS.partnerDistributors}
          </strong>
        </span>
      </section>

      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <button
          type="button"
          onClick={() => setMainTab("catalog")}
          className={`min-h-[52px] min-w-[120px] flex-1 rounded-xl px-4 text-base font-bold transition ${
            mainTab === "catalog"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Kataloq
          {selectedD && (
            <span className="ml-2 tabular-nums text-sm font-normal opacity-90">
              {skuCount} SKU
            </span>
          )}
        </button>
        {(selectedDistId === "dist-avrora" ||
          selectedDistId === "dist-veyseloglu") && (
          <button
            type="button"
            onClick={() => setMainTab("brands")}
            className={`min-h-[52px] min-w-[120px] flex-1 rounded-xl px-4 text-base font-bold transition ${
              mainTab === "brands"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Brendlər
            <span
              className={`ml-1.5 text-sm font-medium ${
                mainTab === "brands"
                  ? selectedDistId === "dist-avrora"
                    ? "text-orange-200"
                    : "text-red-200"
                  : selectedDistId === "dist-avrora"
                    ? "text-orange-600"
                    : "text-red-600"
              }`}
            >
              {selectedDistId === "dist-avrora" ? "Avrora" : "Veysəloğlu"}
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setMainTab("orders")}
          className={`min-h-[52px] min-w-[120px] flex-1 rounded-xl px-4 text-base font-bold transition ${
            mainTab === "orders"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Son sifarişlər
        </button>
      </div>

      <div
        className={
          mainTab === "catalog" || mainTab === "brands"
            ? "grid grid-cols-1 gap-10 lg:grid-cols-[1fr_min(380px,100%)]"
            : ""
        }
      >
        <div>
          {mainTab === "brands" && selectedDistId === "dist-avrora" && (
            <AvroraBrandsPanel
              onBrowseProducts={(brandName) => {
                setQuery(brandName);
                setMainTab("catalog");
                showToast(`Axtarış: ${brandName}`, 2200);
              }}
              onAbout={(b) => {
                showToast(
                  `Nümunə: «${b.name}» brend kartı — ətraflı tezliklə`,
                  3200
                );
              }}
            />
          )}

          {mainTab === "brands" && selectedDistId === "dist-veyseloglu" && (
            <VeyselogluBrandsPanel
              onBrowseProducts={(brandName) => {
                setQuery(brandName);
                setMainTab("catalog");
                showToast(`Axtarış: ${brandName}`, 2200);
              }}
              onAbout={(b) => {
                showToast(
                  `Nümunə: «${b.name}» brend kartı — ətraflı tezliklə`,
                  3200
                );
              }}
            />
          )}

          {mainTab === "catalog" && (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="block w-full sm:max-w-lg">
                  <span className="mb-2 block text-sm font-semibold text-slate-600">
                    Məhsul axtar
                  </span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Brend, məhsul və ya kateqoriya…"
                    className="min-h-[52px] w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-lg text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <Link
                  href="/magaza/istehsalchilar"
                  className="inline-flex min-h-[52px] items-center justify-center text-lg font-semibold text-blue-700 underline decoration-2 underline-offset-4 hover:text-blue-900"
                >
                  İstehsalçılar →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filtered.map((p) => {
                  const mfr = manufacturerById(p.manufacturerId);
                  const tb = tradeBrandLabel(p);
                  const lowStock = p.stockPacks <= 20;
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-start gap-4">
                        {selectedD && (
                          <DistributorLogoMark
                            distributor={selectedD}
                            size="md"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                            Brend
                          </p>
                          <p className="mt-1 text-xl font-extrabold leading-tight text-slate-900">
                            {tb}
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-500">
                            {p.category}
                          </p>
                          <h3 className="mt-2 text-lg font-bold leading-snug text-slate-800">
                            {p.name}
                          </h3>
                          {mfr && (
                            <p className="mt-2 line-clamp-2 text-sm leading-snug text-slate-500">
                              İstehsalçı: {mfr.name}
                            </p>
                          )}
                          <p className="mt-2 text-base leading-snug text-slate-600">
                            {p.packLabel}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold ${
                            lowStock
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {p.stockPacks} stok
                        </span>
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-2xl font-extrabold tabular-nums text-slate-900">
                            {formatAzn(p.price)}
                          </p>
                          <p className="text-sm text-slate-500">1 vahid</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addLine(p)}
                          className="min-h-[52px] min-w-[120px] rounded-xl bg-blue-600 px-6 text-base font-bold text-white shadow-md transition hover:bg-blue-700"
                        >
                          Səbətə
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-16 text-center">
                  <p className="text-lg font-medium text-slate-700">
                    Uyğun məhsul yoxdur
                  </p>
                  <p className="mt-2 text-base text-slate-500">
                    Axtarış sözünü təmizləyin və ya başqa partnyor seçin.
                  </p>
                </div>
              )}
            </>
          )}

          {mainTab === "orders" && (
            <>
              <p className="mb-3 text-sm leading-relaxed text-slate-500">
                Göstərilən sifarişlər: bu brauzer sessiyasında göndərdiyinizlər və
                statik nümunələr. Yalnız demo üçündür; vahid sistemdə API ilə
                sinxron olacaq.
              </p>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Sifariş
                      </th>
                      <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Partnyor
                      </th>
                      <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Tarix
                      </th>
                      <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-bold uppercase tracking-wide text-slate-500">
                        Cəmi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergedOrders.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50/80"
                      >
                        <td className="px-4 py-3 font-mono text-base font-medium text-slate-900">
                          {o.id}
                        </td>
                        <td className="max-w-[140px] truncate px-4 py-3 text-base text-slate-700">
                          {o.distributorName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-base text-slate-600">
                          {new Date(o.placedAt).toLocaleString("az-AZ", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-lg px-3 py-1 text-sm font-semibold capitalize ${STATUS_STYLE[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-slate-900">
                          {formatAzn(o.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </>
          )}
        </div>

        {(mainTab === "catalog" || mainTab === "brands") && (
          <aside
            id="magaza-cart"
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                {selectedD && (
                  <DistributorLogoMark distributor={selectedD} size="md" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Səbət</h2>
                  <p className="text-sm text-slate-600">
                    {selectedD
                      ? `${selectedD.shortLabel} — vahid = kaset/bağlama`
                      : "Partnyor seçin"}
                  </p>
                </div>
              </div>
              {cart.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 py-10 text-center">
                  <p className="text-lg font-medium text-slate-600">
                    Səbət boşdur
                  </p>
                  <p className="mt-2 px-3 text-base text-slate-500">
                    Kataloqdan məhsul seçin — vahid = kaset və ya bağlama.
                  </p>
                </div>
              ) : (
                <ul className="mb-4 flex max-h-[min(48vh,420px)] flex-col gap-3 overflow-y-auto pr-1">
                  {cart.map((line) => (
                    <li
                      key={line.product.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                        {tradeBrandLabel(line.product)}
                      </p>
                      <div className="flex justify-between gap-2">
                        <p className="text-base font-semibold leading-snug text-slate-900">
                          {line.product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeLine(line.product.id)}
                          className="min-h-[44px] min-w-[44px] shrink-0 rounded-lg text-xl leading-none text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Sil"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        {line.product.packLabel}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-700 transition hover:bg-slate-100"
                            onClick={() =>
                              setQty(line.product.id, line.qty - 1)
                            }
                          >
                            −
                          </button>
                          <span className="min-w-[3ch] text-center text-xl font-bold tabular-nums text-slate-900">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-700 transition hover:bg-slate-100"
                            onClick={() =>
                              setQty(line.product.id, line.qty + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold tabular-nums text-slate-900">
                          {formatAzn(line.product.price * line.qty)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mb-4 flex items-center justify-between border-t border-slate-200 pt-4 text-lg">
                <span className="text-slate-600">Cəmi</span>
                <span className="text-2xl font-extrabold tabular-nums text-slate-900">
                  {formatAzn(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={submitOrder}
                disabled={!selectedD}
                className="min-h-[56px] w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sifarişi göndər
              </button>
            </div>
          </aside>
        )}
      </div>

      {(mainTab === "catalog" || mainTab === "brands") && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.1)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500">Səbət cəmi</p>
              <p className="text-lg font-extrabold tabular-nums text-slate-900">
                {formatAzn(cartTotal)}
              </p>
            </div>
            <a
              href="#magaza-cart"
              className="inline-flex min-h-[48px] max-w-[220px] flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 text-base font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Səbətə keç
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
