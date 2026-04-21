import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin girişi",
  robots: { index: false, follow: false },
};

export default function AdminLoginRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
