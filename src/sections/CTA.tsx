import DemoButton from "@/components/DemoButton";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #080D1A 0%, #1B4FD8 100%)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-white/40 text-xs font-semibold tracking-widest uppercase mb-5">
          <span className="w-6 h-0.5 bg-white/25 rounded" />
          Başlamaq üçün
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
          Qeydiyyatdan keç.
        </h2>

        <p className="text-white/50 text-base leading-relaxed max-w-sm mx-auto mb-10">
          İlk sifarişini ekspeditorsuz idarə et.
          Qeydiyyat pulsuzdur.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
          <DemoButton
            intent="start"
            role="general"
            label="Pulsuz başla"
            className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
          />
          <DemoButton
            intent="demo"
            role="general"
            label="Demo istə"
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium text-[15px] transition-all duration-200 hover:bg-white/8 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
        </div>

        <p className="text-white/25 text-sm">
          Kredit kartı tələb olunmur · Qurulum lazım deyil
        </p>
      </div>
    </section>
  );
}
