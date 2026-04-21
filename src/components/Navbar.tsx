"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMockSession } from "@/context/MockSessionContext";
import DemoButton from "./DemoButton";
import RolePickerModal from "./RolePickerModal";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Necə işləyir", href: "#howworks" },
  { label: "Kim üçündür", href: "#forwho" },
  { label: "Əlaqə", href: "#contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { role, ready, loginAsStore, logout, distributorCompanyId } =
    useMockSession();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  const handlePickRole = (r: "store" | "distributor") => {
    if (r === "store") {
      loginAsStore();
      router.push("/magaza");
      return;
    }
    router.push("/distributor");
  };

  const distributorPanelHref =
    role === "distributor" && distributorCompanyId
      ? `/distributor/${distributorCompanyId}`
      : "/distributor";

  const roleLabel =
    role === "store"
      ? "Mağaza"
      : role === "distributor"
        ? "Distribütor"
        : null;

  return (
    <>
      <RolePickerModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onPick={handlePickRole}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 md:px-12 ${
          scrolled || open
            ? "border-b border-white/6 bg-[#080D1A]/95 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          onClick={close}
          className="z-10 text-[19px] font-extrabold tracking-tight text-white"
        >
          Swift<span className="text-blue-400">Buy</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-white/45 transition-colors duration-200 hover:text-white focus:text-white focus:outline-none"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-stretch gap-2 md:flex">
          {ready && roleLabel ? (
            <>
              <span
                className="inline-flex min-h-[40px] select-none items-center justify-center whitespace-nowrap rounded-xl border border-white/18 bg-white/[0.07] px-3.5 text-sm font-semibold text-white/90"
                title="Cari rol"
              >
                {roleLabel}
              </span>
              <Link
                href={
                  role === "store" ? "/magaza" : distributorPanelHref
                }
                className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl border border-white/22 bg-white/[0.06] px-4 text-sm font-medium text-white/95 shadow-sm transition hover:border-white/35 hover:bg-white/[0.12]"
              >
                Panel
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl border border-white/14 bg-transparent px-4 text-sm font-medium text-white/80 transition hover:border-white/28 hover:bg-white/[0.06] hover:text-white"
              >
                Çıxış
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl border border-white/20 bg-white/[0.06] px-4 text-sm font-medium text-white/95 transition hover:border-white/32 hover:bg-white/[0.11]"
            >
              Daxil ol
            </button>
          )}
          <DemoButton
            intent="demo"
            role="general"
            label="Demo istə"
            className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-md shadow-blue-900/30 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080D1A]"
          />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="z-10 flex h-8 w-8 flex-col justify-center gap-1.5 md:hidden"
          aria-label="Menyunu aç"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 rounded bg-white transition-all duration-300 origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 rounded bg-white transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 rounded bg-white transition-all duration-300 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#080D1A]/98 px-8 backdrop-blur-lg transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="mb-10 flex flex-col gap-2">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className="block py-3 text-3xl font-extrabold tracking-tight text-white/60 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2.5">
          {ready && roleLabel ? (
            <span className="inline-flex w-fit items-center rounded-xl border border-white/18 bg-white/[0.08] px-3.5 py-2 text-sm font-semibold text-white/90">
              {roleLabel}
            </span>
          ) : null}
          <div className="flex flex-col gap-2">
            {ready && roleLabel ? (
              <>
                <Link
                  href={
                    role === "store" ? "/magaza" : distributorPanelHref
                  }
                  onClick={close}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/22 bg-white/[0.06] text-base font-semibold text-white shadow-sm transition hover:border-white/35 hover:bg-white/[0.11]"
                >
                  Panel
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    close();
                    router.push("/");
                  }}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/14 bg-transparent text-base font-medium text-white/85 transition hover:border-white/26 hover:bg-white/[0.06] hover:text-white"
                >
                  Çıxış
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen(true);
                  close();
                }}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.1]"
              >
                Daxil ol (Mağaza / Distribütor)
              </button>
            )}
            <DemoButton
              intent="demo"
              role="general"
              label="Demo istə"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-lg shadow-blue-900/35 transition hover:bg-blue-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
