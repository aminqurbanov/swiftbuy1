import HowItWorksSimulation from "@/sections/HowItWorksSimulation";

const steps = [
  {
    num: "01",
    title: "Kataloqdan seç",
    body: "Məhsulları və qiymətləri platformada gör, lazım olanları seç.",
  },
  {
    num: "02",
    title: "Sifarişi göndər",
    body: "Sifariş birbaşa distribütora ötürülür, əlavə zəng və yazışma olmur.",
  },
  {
    num: "03",
    title: "Təsdiqlə və hazırla",
    body: "Distribütor sifarişi qəbul edir və göndəriş üçün hazırlayır.",
  },
  {
    num: "04",
    title: "İzlə və qəbul et",
    body: "Çatdırılmanı izləyir, sifarişin hansı mərhələdə olduğunu görürsən.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howworks"
      className="relative overflow-hidden bg-slate-950 px-6 py-20 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[620px] -translate-x-1/2 bg-blue-700/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-14 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            <span className="h-0.5 w-6 rounded bg-blue-400" />
            Necə işləyir
          </div>

          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Sifariş 4 addımda
            <br />
            tamamlanır.
          </h2>

          <p className="max-w-md text-base leading-relaxed text-slate-400">
            Ekspeditor, telefon və qarışıq proses olmadan sifariş platforma
            üzərindən idarə olunur.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-[27px] hidden h-px bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800 md:block" />

          {steps.map((step) => (
            <div key={step.num} className="relative z-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-950 text-lg font-extrabold text-blue-400">
                {step.num}
              </div>

              <h3 className="mb-2 text-[15px] font-bold tracking-tight text-white">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-400">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <HowItWorksSimulation />
      </div>
    </section>
  );
}
