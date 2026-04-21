import { DemoFormData, ApiError, LeadRole } from "@/types/lead";

const PHONE_REGEX = /^\+994(50|51|55|60|70|77|99)\d{7}$/;

export function validateDemoForm(data: Partial<DemoFormData>): ApiError[] {
  const errors: ApiError[] = [];
  const role = (data.role ?? "general") as LeadRole;

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Ad tələb olunur" });
  }

  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Telefon nömrəsi tələb olunur" });
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.push({
      field:   "phone",
      message: "+994 ilə başlayan düzgün nömrə daxil edin (məs: +994501234567)",
    });
  }

  if (!data.businessName?.trim()) {
    errors.push({
      field:   "businessName",
      message: role === "distributor" ? "Şirkət adı tələb olunur" : "Mağaza adı tələb olunur",
    });
  }

  if (!data.city?.trim()) {
    errors.push({ field: "city", message: "Şəhər tələb olunur" });
  }

  // distributor-specific
  if (role === "distributor" && !data.salesArea?.trim()) {
    errors.push({ field: "salesArea", message: "Satış əhatəsi tələb olunur" });
  }

  return errors;
}
