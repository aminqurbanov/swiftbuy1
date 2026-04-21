import Link from "next/link";

const groups = [
  {
    title: "Platforma",
    links: [
      { label: "Problem", href: "#problem" },
      { label: "Necə işləyir", href: "#howworks" },
      { label: "Kim üçündür", href: "#forwho" },
    ],
  },
  {
    title: "Əlaqə",
    links: [
      { label: "Demo istə", href: "#contact" },
      { label: "Başla", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#080D1A] px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <Link href="/" className="mb-3 block text-[20px] font-extrabold tracking-tight text-white">
              Swift<span className="text-blue-400">Buy</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              Azərbaycanın B2B topdan sifariş platforması. Ekspeditorsuz,
              şəffaf və daha sürətli sifariş prosesi.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/25">
                {group.title}
              </p>

              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 md:flex-row">
          <p className="text-xs text-white/20">
            © 2026 SwiftBuy. Bütün hüquqlar qorunur.
          </p>
          <p className="text-xs text-white/15">
            Azərbaycan · B2B topdan sifariş platforması
          </p>
        </div>
      </div>
    </footer>
  );
}
