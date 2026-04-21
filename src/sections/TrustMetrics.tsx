const metrics = [
  {
    value: "140+",
    label: "Mağaza",
  },
  {
    value: "3,200+",
    label: "Sifariş",
  },
  {
    value: "24/7",
    label: "Dəstək",
  },
];

export default function TrustMetrics() {
  return (
    <section className="bg-[#0B1222] py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-white/5 py-8"
          >
            <p className="text-3xl font-extrabold text-white mb-1">
              {m.value}
            </p>
            <p className="text-sm text-white/50">{m.label}</p>
          </div>
        ))}

      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/35">
        Rəqəmlər nümayiş xarakterlidir; real pilot/partnyor müqaviləsinə görə
        yenilənə bilər. Göstəricilər konkret SLA və ya zəmanət deyil.
      </p>
    </section>
  );
}
