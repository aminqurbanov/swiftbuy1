"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { useDemoModal }                from "@/context/DemoModalContext";
import { getModalCopy }                from "@/lib/modalConfig";
import { DemoFormData, ApiError }      from "@/types/lead";

const WHATSAPP_NUMBER = "994501234567"; // ← öz nömrənlə əvəz et

type FieldErrors = Partial<Record<keyof DemoFormData, string>>;
type Status      = "idle" | "loading" | "success" | "error";

const EMPTY = {
  name:         "",
  phone:        "",
  businessName: "",
  city:         "",
  salesArea:    "",
};

export default function DemoModal() {
  const { isOpen, config, close } = useDemoModal();
  const copy = getModalCopy(config);

  const [fields,      setFields]      = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [status,      setStatus]      = useState<Status>("idle");

  const overlayRef    = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // ModalController bağlı olanda komponent unmount olur — təmiz state avtomatik.
  // Yalnız ilk fokus (effektdə setState yoxdur, lint təmiz)
  useEffect(() => {
    const id = window.setTimeout(() => firstInputRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChange = (id: keyof typeof EMPTY, value: string) => {
    setFields((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id as keyof DemoFormData]) {
      setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    setFieldErrors({});
    setServerError(null);

    const payload: DemoFormData = {
      name:         fields.name,
      phone:        fields.phone,
      businessName: fields.businessName,
      city:         fields.city,
      salesArea:    fields.salesArea || undefined,
      intent:       config.intent,
      role:         config.role,
    };

    try {
      const res  = await fetch("/api/demo", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        return;
      }

      if (res.status === 422 && Array.isArray(data.errors)) {
        const mapped: FieldErrors = {};
        (data.errors as ApiError[]).forEach((err) => {
          if (err.field) mapped[err.field] = err.message;
        });
        setFieldErrors(mapped);
        setStatus("idle");
        return;
      }

      setServerError(
        data.message ?? "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin."
      );
      setStatus("error");
    } catch {
      setServerError("Şəbəkə xətası. İnternet bağlantınızı yoxlayın.");
      setStatus("error");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md bg-[#0E1525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400" />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Bağla"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 z-10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-7 pt-8 pb-8">
          {status === "success" ? (
            <SuccessState
              name={fields.name}
              phone={fields.phone}
              whatsappNumber={WHATSAPP_NUMBER}
              onClose={close}
            />
          ) : (
            <>
              {/* Header */}
              <div className="mb-7">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-400 mb-2">
                  {copy.eyebrow}
                </p>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  {copy.title}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  {copy.subtitle}
                </p>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4">

                <Field
                  ref={firstInputRef}
                  id="name"
                  label="Ad"
                  placeholder="Adınız"
                  value={fields.name}
                  error={fieldErrors.name}
                  disabled={status === "loading"}
                  onChange={(v) => handleChange("name", v)}
                />

                <Field
                  id="phone"
                  label="Telefon nömrəsi"
                  placeholder="+994501234567"
                  type="tel"
                  value={fields.phone}
                  error={fieldErrors.phone}
                  disabled={status === "loading"}
                  onChange={(v) => handleChange("phone", v)}
                />

                <Field
                  id="businessName"
                  label={copy.fields.businessName.label}
                  placeholder={copy.fields.businessName.placeholder}
                  value={fields.businessName}
                  error={fieldErrors.businessName}
                  disabled={status === "loading"}
                  onChange={(v) => handleChange("businessName", v)}
                />

                <Field
                  id="city"
                  label="Şəhər"
                  placeholder="Bakı"
                  value={fields.city}
                  error={fieldErrors.city}
                  disabled={status === "loading"}
                  onChange={(v) => handleChange("city", v)}
                />

                {copy.fields.showSalesArea && (
                  <Field
                    id="salesArea"
                    label="Satış əhatəsi"
                    placeholder="Məs: Bakı, Sumqayıt, Abşeron"
                    value={fields.salesArea}
                    error={fieldErrors.salesArea}
                    disabled={status === "loading"}
                    onChange={(v) => handleChange("salesArea", v)}
                  />
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
                >
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="#F87171" strokeWidth="1.5" />
                    <path d="M7 4v3M7 9.5v.5" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs text-red-400 leading-relaxed">{serverError}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="mt-6 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1525] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Spinner />
                    Göndərilir...
                  </>
                ) : (
                  copy.cta
                )}
              </button>

              <p className="mt-3 text-center text-xs text-white/20">
                Kredit kartı tələb olunmur
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Field ──────────────────────────────────────────────── */

interface FieldProps {
  id:          string;
  label:       string;
  placeholder: string;
  type?:       string;
  value:       string;
  error?:      string;
  disabled?:   boolean;
  onChange:    (v: string) => void;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ id, label, placeholder, type = "text", value, error, disabled, onChange }, ref) => (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${
          error
            ? "border-red-500/60 focus:ring-red-500/40"
            : "border-white/10 focus:ring-blue-500/40 focus:border-blue-500/50"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">{error}</p>
      )}
    </div>
  )
);
Field.displayName = "Field";

/* ── Success ────────────────────────────────────────────── */
function SuccessState({
  name,
  phone,
  whatsappNumber,
  onClose,
}: {
  name:            string;
  phone:           string;
  whatsappNumber:  string;
  onClose:         () => void;
}) {
  const waMessage = encodeURIComponent(
    `Salam! Mən SwiftBuy platformasına müraciət etdim.\nAd: ${name}\nTelefon: ${phone}`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div className="text-center py-4">
      {/* Check icon */}
      <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
        Müraciətiniz alındı.
      </h3>
      <p className="text-sm text-white/40 leading-relaxed mb-2 max-w-xs mx-auto">
        Tezliklə sizinlə əlaqə saxlayacağıq.
      </p>
      <p className="text-xs text-white/25 mb-8">
        Ortalama cavab vaxtı — 1 iş günü
      </p>

      {/* WhatsApp CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-px mb-3"
      >
        <WhatsAppIcon />
        WhatsApp üzərindən əlaqə sax
      </a>

      <button
        onClick={onClose}
        className="w-full py-3 rounded-xl border border-white/10 text-white/45 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Bağla
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ── Spinner ────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
