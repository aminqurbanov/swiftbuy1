import { isMockPrototypeMode } from "@/lib/config";

export default function MockModeBanner() {
  if (!isMockPrototypeMode()) return null;

  return (
    <div
      className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-center text-xs sm:text-sm text-amber-100/95"
      role="status"
    >
      Prototip rejimi — form məlumatları verilənlər bazasına yazılmır; nümayiş üçün yalandan
      görünüş.
    </div>
  );
}
