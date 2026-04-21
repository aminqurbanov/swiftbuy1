import DemoButton from "@/components/DemoButton";
import { LeadRole } from "@/types/lead";

const roles: {
  tag:         string;
  tagColor:    string;
  accent:      string;
  borderHover: string;
  title:       string;
  subtitle:    string;
  items:       string[];
  checkColor:  string;
  ctaLabel:    string;
  ctaStyle:    string;
  role:        LeadRole;
}[] = [
  {
    tag:         "Mağaza sahibi",
    tagColor:    "text-blue-400 bg-blue-400/10",
    accent:      "from-blue-600 to-blue-400",
    borderHover: "hover:border-blue-500/50",
    title:       "Ekspeditorsuz sifariş ver",
    subtitle:    "Kataloqdan seç, göndər, izlə. İstədiyin vaxt, istədiyin yerdən.",
    items: [
      "Ekspeditor gözləmə yoxdur",
      "Sifarişin statusu hər an görünür",
      "Kuryer adı və nömrəsi platformada",
      "Kuratora birbaşa müraciət imkanı",
    ],
    checkColor: "text-blue-400 bg-blue-400/10",
    ctaLabel:   "Mağaza olaraq başla",
    ctaStyle:   "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-700/25 focus-visible:ring-blue-500",
    role:       "store",
  },
  {
    tag:         "Distribütor",
    tagColor:    "text-orange-400 bg-orange-400/10",
    accent:      "from-orange-500 to-orange-400",
    borderHover: "hover:border-orange-500/50",
    title:       "Bütün sifarişlər bir yerdə",
    subtitle:    "Kağız yoxdur, telefon yoxdur. Sifarişi al, təsdiqlə, göndər.",
    items: [
      "Sifarişlər real vaxtda daxil olur",
      "Manual iş yükü azalır",
      "Stok və qiymət idarəsi platformada",
      "Qaytarılmalar sistemdə izlənilir",
    ],
    checkColor: "text-orange-400 bg-orange-400/10",
    ctaLabel:   "Distribütor olaraq başla",
    ctaStyle:   "bg-white/8 hover:bg-white/14 text-white border border-white/12 focus-visible:ring-white/30",
    role:       "distributor",
  },
];

export default function ForWho() {
  return (
    <section id="forwho" className="bg-[#080D1A] py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-700/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-6 h-0.5 bg-blue-400 rounded" />
            Kim üçündür
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Hər iki tərəf<br />qazanır.
          </h2>
          <p className="text-slate-400 text-base max-w-sm leading-relaxed">
            Mağaza sahibi vaxt qazanır. Distribütor nəzarət qazanır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roles.map((r) => (
            <div
              key={r.tag}
              className={`relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 flex flex-col transition-all duration-300 ${r.borderHover} hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${r.accent}`} />

              <span className={`inline-block text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-5 self-start ${r.tagColor}`}>
                {r.tag}
              </span>

              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-7">
                {r.subtitle}
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {r.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${r.checkColor}`}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <DemoButton
                intent="start"
                role={r.role}
                label={`${r.ctaLabel} →`}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1828] ${r.ctaStyle}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
