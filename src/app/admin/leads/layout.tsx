import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionToken,
} from "@/lib/adminAuth";

export default async function AdminLeadsProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    notFound();
  }

  const store = await cookies();
  const tok = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (tok !== adminSessionToken(secret)) {
    redirect("/admin/login?next=%2Fadmin%2Fleads");
  }

  return <>{children}</>;
}
