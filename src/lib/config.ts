/**
 * Prototip rejimi: true olanda verilənlər bazasına yazılmır,
 * yalnız server yaddaşı (in-memory) + demo sətirlər — nümayiş üçün.
 */
export function isMockPrototypeMode(): boolean {
  return process.env.NEXT_PUBLIC_SWIFTBUY_MOCK_MODE === "true";
}
