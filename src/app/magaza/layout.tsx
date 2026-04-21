import type { ReactNode } from "react";

/**
 * Mağaza bölməsi: açıq ton, böyük mətn — oxunaqlı, qoca istifadəçi üçün rahat.
 */
export default function MagazaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-[#f0f4fc] to-[#e8eef9] text-slate-900 antialiased selection:bg-blue-200/80">
      {children}
    </div>
  );
}
