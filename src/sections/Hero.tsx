import DemoButton    from "@/components/DemoButton";
import Link          from "next/link";

const orders = [
  { initials: "AM", name: "Araz Market — Bakıxanov",  time: "5 dəq əvvəl",  status: "Yeni",       statusStyle: "text-blue-300 bg-blue-700/15"     },
  { initials: "GM", name: "Günəş Market — Zabrat",    time: "23 dəq əvvəl", status: "Yoldadır",   statusStyle: "text-orange-300 bg-orange-700/15"  },
  { initials: "NM", name: "Nicat Market — Maştağa",   time: "1 saat əvvəl", status: "Çatdırıldı", statusStyle: "text-emerald-300 bg-emerald-700/15" },
];

const sidebarItems = ["Sifarişlər", "Kataloq", "İzləmə", "Analitika", "Dəstək"];

const stats = [
  { num: "47", label: "Yeni sifariş"  },
  { num: "12", label: "Yoldadır"      },
  { num: "28", label: "Çatdırıldı"   },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-[#080D1A] overflow-hidden">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27,79,216,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,79,216,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute -top-32 -left-32 w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full bg-blue-700/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-24 -right-20 w-[300px] md:w-[350px] h-[300px] md:h-[350px] rounded-full bg-orange-600/10 blur-[90px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl w-full">
        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/30 text-blue-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
          Azərbaycanın B2B topdan platforması
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
          Topdan sifarişi{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            ekspeditorsuz
          </span>{" "}
          idarə et.
        </h1>

        <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
          Mağaza sifarişi platformada verir. Distribütor dərhal görür.
          Çatdırılma izlənilir. Sifariş prosesi daha sürətli, daha şəffaf olur.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <DemoButton
            intent="start"
            role="general"
            label="Pulsuz başla"
            className="px-6 md:px-7 py-3 md:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#080D1A] focus:outline-none text-white font-semibold text-sm md:text-[15px] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-700/30"
          />
          <Link
            href="#howworks"
            className="px-6 md:px-7 py-3 md:py-3.5 rounded-xl bg-white/7 hover:bg-white/12 focus:ring-2 focus:ring-white/20 focus:outline-none border border-white/10 text-white font-medium text-sm md:text-[15px] transition-all duration-200 hover:-translate-y-0.5"
          >
            Necə işləyir
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/45">
          <Link
            href="/magaza"
            className="font-medium text-blue-400/95 underline decoration-blue-500/50 underline-offset-[6px] transition hover:text-blue-300 hover:decoration-blue-400"
          >
            Mağaza panelini sınayın
          </Link>
          <span className="text-white/35"> — daxil olun, sonra «Mağaza sahibiyəm»</span>
        </p>
      </div>

      {/* Mockup */}
      <div className="relative z-10 mt-14 md:mt-16 w-full max-w-4xl">
        <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 bg-white/4 border-b border-white/6">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-[11px] md:text-xs text-white/25 font-mono truncate">
              app.swiftbuy.az/dashboard
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
            <div className="hidden md:flex border-r border-white/5 p-4 flex-col gap-1 bg-white/2">
              <p className="text-sm font-bold text-white/80 px-2 py-2 mb-2">SwiftBuy</p>
              {sidebarItems.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium ${
                    i === 0 ? "bg-blue-700/20 text-blue-300" : "text-white/30"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {item}
                </div>
              ))}
            </div>

            <div className="p-4 md:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white/85">Bu günün sifarişləri</p>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Canlı
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/4 border border-white/6 rounded-xl p-2.5 md:p-3">
                    <p className="text-lg md:text-xl font-extrabold text-white/90">{s.num}</p>
                    <p className="text-[10px] md:text-[11px] text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                {orders.map((o) => (
                  <div key={o.name} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-lg px-3 md:px-3.5 py-2 md:py-2.5">
                    <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                      <div className="hidden sm:flex w-6 h-6 rounded-md bg-blue-700/30 items-center justify-center text-[10px] font-bold text-blue-300 flex-shrink-0">
                        {o.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] md:text-xs font-medium text-white/70 truncate">{o.name}</p>
                        <p className="text-[10px] md:text-[11px] text-white/25">{o.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] md:text-[11px] font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-md flex-shrink-0 ml-2 ${o.statusStyle}`}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}