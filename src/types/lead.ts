export type LeadIntent = "start" | "demo";
export type LeadRole   = "store" | "distributor" | "general";

export interface DemoFormData {
  name:           string;
  phone:          string;
  businessName:   string;
  city:           string;
  salesArea?:     string;   // distributor only
  intent:         LeadIntent;
  role:           LeadRole;
}

export interface Lead {
  id:           string;
  name:         string;
  phone:        string;
  businessName: string;
  city:         string;
  salesArea?:   string;
  intent:       string;
  role:         string;
  createdAt:    string;
}

export interface ApiError {
  field?:  keyof DemoFormData;
  message: string;
}

export interface ApiResponse {
  success:  boolean;
  errors?:  ApiError[];
  message?: string;
}

export interface ModalConfig {
  intent: LeadIntent;
  role:   LeadRole;
}
