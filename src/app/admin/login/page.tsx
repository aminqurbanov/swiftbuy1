import { Suspense } from "react";
import LoginForm from "./LoginForm";

function LoginFallback() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1525] p-8 shadow-2xl">
      <p className="text-sm text-white/40">Yüklənir…</p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080D1A] px-6 py-12">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
