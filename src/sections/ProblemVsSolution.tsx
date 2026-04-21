const pairs = [
  {
    problem: {
      title: "Ekspeditor gəlməsə, sifariş dayanır",
      body: "Sifariş vermək üçün gözləyirsən. Gecikmə olduqda mağaza boş qalır, satış itir.",
    },
    solution: {
      title: "İstədiyin vaxt sifariş ver",
      body: "Platformadan sifarişi dərhal göndər. Distribütor anında görür, gözləmə aradan qalxır.",
    },
  },
  {
    problem: {
      title: "Əl ilə sifariş, daha çox yanlışlıq",
      body: "Dəftər, zəng və mesajla verilən sifarişlərdə məhsul unudulur, məbləğ qarışır.",
    },
    solution: {
      title: "Rəqəmsal sifariş, daha aydın proses",
      body: "Sifariş platformadan gedir, eyni formada qarşı tərəfə çatır. Səhv riski azalır.",
    },
  },
  {
    problem: {
      title: "Sifarişin harada olduğu bilinmir",
      body: "Zəng edirsən, cavab gecikir. Sifarişin hansı mərhələdə olduğunu görmürsən.",
    },
    solution: {
      title: "Status və çatdırılma izlənilir",
      body: "Sifarişin mərhələsini platformada izləyirsən. Kuryer və status bir yerdə görünür.",
    },
  },
  {
    problem: {
      title: "Qaytarılmalar nəzarətsiz qalır",
      body: "İtki və qaytarılan məhsullar ayrıca izlənməyəndə proses qarışır.",
    },
    solution: {
      title: "Qaytarılmalar sistemdə qeyd olunur",
      body: "Qaytarılan məhsullar və vəziyyəti sistemdə görünür. Proses daha nəzarətli olur.",
    },
  },
];

export default function ProblemVsSolution() {
  return (
    <section id="problem" className="bg-white px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-9">
          <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-blue-600">
            <span className="h-0.5 w-5 rounded bg-blue-600" />
            Problem və həll
          </div>

          <h2 className="mb-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
            Hər problemin konkret cavabı var.
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 md:text-[15px]">
            Köhnə topdan sifariş prosesi yavaşdır və izlənilməsi çətindir. SwiftBuy
            bunu daha aydın və idarəolunan edir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-x-3 md:gap-y-2.5">
          {pairs.map((pair, index) => (
            <article
              key={index}
              className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-0.5 sm:grid-cols-2 sm:gap-0"
            >
              <div className="relative overflow-hidden rounded-[14px] border border-red-200/90 bg-red-50/95 p-4 sm:rounded-r-none sm:border-r-0">
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400" />
                <span className="mb-2 inline-block rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Problem
                </span>
                <h3 className="mb-1.5 text-sm font-bold leading-snug text-red-950 sm:text-[15px]">
                  {pair.problem.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-red-800/85">
                  {pair.problem.body}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[14px] border border-blue-200/90 bg-blue-50/95 p-4 sm:rounded-l-none sm:border-l-0">
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400" />
                <span className="mb-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Həll
                </span>
                <h3 className="mb-1.5 text-sm font-bold leading-snug text-blue-950 sm:text-[15px]">
                  {pair.solution.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-blue-800/85">
                  {pair.solution.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
