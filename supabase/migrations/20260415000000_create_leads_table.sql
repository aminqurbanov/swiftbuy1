-- SwiftBuy leads — quoted identifiers match PostgREST / TypeScript camelCase
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  "businessName" TEXT NOT NULL,
  city TEXT NOT NULL,
  "salesArea" TEXT,
  intent TEXT NOT NULL,
  role TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);
