"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items: {
  href: string;
  label: string;
  match: (path: string) => boolean;
}[] = [
  {
    href: "/magaza",
    label: "Topdan sifariş",
    match: (p) => p === "/magaza",
  },
  {
    href: "/magaza/istehsalchilar",
    label: "İstehsalçılar",
    match: (p) => p.startsWith("/magaza/istehsalchilar"),
  },
  {
    href: "/magaza/gtin",
    label: "GTIN axtarışı",
    match: (p) => p.startsWith("/magaza/gtin"),
  },
  {
    href: "/magaza/sifaris-izle",
    label: "Sifariş izlə",
    match: (p) => p.startsWith("/magaza/sifaris-izle"),
  },
];

export default function MagazaSubnav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className="border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md"
      aria-label="Mağaza bölməsi"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6">
        <ul className="flex flex-wrap items-center gap-2">
          {items.map((item) => {
            const active = item.match(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl px-4 py-2.5 text-base font-semibold transition sm:px-5 ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
