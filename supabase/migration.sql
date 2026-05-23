-- ============================================================
-- RedOps Security — Supabase Database Schema
-- Run this in the Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- Authors
CREATE TABLE IF NOT EXISTS authors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  role        TEXT,
  bio         TEXT,
  credentials TEXT[] DEFAULT '{}',
  image_url   TEXT,
  linkedin    TEXT,
  github      TEXT,
  twitter     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors (slug);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags (slug);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  excerpt       TEXT NOT NULL,
  body          TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  featured      BOOLEAN NOT NULL DEFAULT false,
  reading_time  TEXT,
  image_url     TEXT,
  image_alt     TEXT,
  author_id     UUID REFERENCES authors(id) ON DELETE SET NULL,
  published_at  TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts (featured, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts (author_id);

-- Post ↔ Categories (many-to-many)
CREATE TABLE IF NOT EXISTS post_categories (
  post_id     UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Post ↔ Tags (many-to-many)
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- SEO metadata per post (1-to-1)
CREATE TABLE IF NOT EXISTS post_seo (
  post_id          UUID PRIMARY KEY REFERENCES posts(id) ON DELETE CASCADE,
  meta_title       TEXT,
  meta_description TEXT,
  canonical_path   TEXT,
  no_index         BOOLEAN NOT NULL DEFAULT false,
  og_image_url     TEXT
);

-- FAQ entries per post
CREATE TABLE IF NOT EXISTS post_faqs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_post_faqs_post ON post_faqs (post_id, sort_order);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id      TEXT,
  actor_email   TEXT,
  action        TEXT NOT NULL,
  resource_type TEXT,
  resource_id   TEXT,
  ip_hash       TEXT,
  metadata      JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs (created_at DESC);

-- ============================================================
-- Row Level Security
-- We use public SELECT for published content.
-- All writes go through Clerk-protected API routes using the
-- service role key, so RLS INSERT/UPDATE/DELETE is not needed.
-- ============================================================

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public read authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (status = 'published' AND published_at <= now());
CREATE POLICY "Public read post_categories" ON post_categories FOR SELECT USING (true);
CREATE POLICY "Public read post_tags" ON post_tags FOR SELECT USING (true);
CREATE POLICY "Public read post_seo" ON post_seo FOR SELECT USING (true);
CREATE POLICY "Public read post_faqs" ON post_faqs FOR SELECT USING (true);

-- Audit logs are never publicly readable
CREATE POLICY "No public read audit_logs" ON audit_logs FOR SELECT USING (false);

-- ============================================================
-- Auto-update updated_at on posts
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Full-text search index on posts
-- ============================================================

ALTER TABLE posts ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'C')
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_posts_search ON posts USING GIN (search_vector);

-- ============================================================
-- Create Supabase Storage bucket for blog images (optional)
-- Run this only if you want to use Supabase Storage for images.
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('blog-images', 'blog-images', true);
