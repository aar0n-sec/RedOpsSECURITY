-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  website     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'not_tested' CHECK (status IN ('not_tested', 'tested')),
  remarks     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_status ON leads (status);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- For now, we allow public read for leads as per the pattern in migration.sql
CREATE POLICY "Public read leads" ON leads FOR SELECT USING (true);

-- Re-use the existing update_updated_at function
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
