-- Cloudflare D1: ejecutar manualmente al vincular una base de datos llamada DB.
-- No contiene cuentas, contraseñas ni importaciones de terceros.
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('rrpp','dj')),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT NOT NULL,
  experience TEXT,
  style TEXT,
  music_url TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_applications_kind_created ON applications(kind, created_at);
CREATE TABLE IF NOT EXISTS rrpp_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES applications(id)
);
-- Modelo reservado para integrar checkout con proveedor verificado.
-- Las compras solo deben contarse tras verificar webhook firmado y pago aprobado.
CREATE TABLE IF NOT EXISTS ticket_orders (
  id TEXT PRIMARY KEY,
  provider_order_id TEXT UNIQUE,
  referral_code TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'ARS',
  status TEXT NOT NULL DEFAULT 'pending',
  provider_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (referral_code) REFERENCES rrpp_codes(code)
);
