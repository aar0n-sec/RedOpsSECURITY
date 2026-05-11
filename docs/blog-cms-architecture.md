# RedOps Blog CMS Architecture

## Overview

The blog system is a Next.js App Router implementation backed by Supabase (PostgreSQL), Clerk-protected admin access, Cloudinary image ingestion, Zod validation, ISR, RSS, sitemap integration, and structured SEO output. This architecture replaces the previous Sanity CMS implementation with a custom admin dashboard and a relational database schema.

## Folder Structure

```txt
src/app/blog/                         Public listing, detail, category, tag routes
src/app/admin/                        Custom admin dashboard (Posts, Categories, Tags, Authors)
src/app/api/admin/                    Clerk-protected admin CRUD and utility APIs
src/app/api/blog/search/              Public validated search endpoint
src/app/sign-in/ and sign-up/         Clerk auth screens for admin access
src/app/rss.xml/                      RSS feed route
src/components/blog/                  Blog cards, filters, article renderer (Markdown)
src/components/admin/                 Admin-only UI components and form helpers
src/lib/db/                           Supabase data access layer (posts, authors, taxonomy, audit)
src/lib/blog/                         Formatting, SEO, reading time, TOC utilities
src/lib/security/                     Clerk RBAC, CSRF, rate limit, validators
src/lib/supabase.ts                   Supabase client configuration
src/types/blog.ts                     Unified blog type definitions
supabase/migration.sql                Database schema and RLS policies
```

## Install Commands

```powershell
npm.cmd install @clerk/nextjs @supabase/supabase-js @hookform/resolvers cloudinary highlight.js lucide-react next react react-dom react-hook-form react-markdown rehype-highlight remark-gfm zod
npm.cmd install -D tailwindcss@^3 postcss autoprefixer typescript
```

## Environment Variables

Use `.env.example` as the source of truth. Required production values:

- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, admin role metadata or `REDOPS_ADMIN_EMAILS`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Optional serverless rate limiting: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Database Schema (Supabase)

The relational schema (defined in `supabase/migration.sql`) includes:

- `posts`: Main content table with markdown body, status workflow, and search vector.
- `authors`: Author profiles with credentials and social links.
- `categories` and `tags`: Many-to-many taxonomy systems.
- `post_seo`: SEO metadata including meta tags and canonical overrides.
- `post_faqs`: Structured FAQ entries per post.
- `audit_logs`: Immutable admin activity trail.

## Next.js Routes

Public routes:

- `/blog`: Search, filters, pagination, ISR (revalidated every 300s).
- `/blog/[slug]`: Dynamic article route, table of contents, related posts, JSON-LD.
- `/blog/category/[slug]` and `/blog/tag/[slug]`: Taxonomy landing pages.
- `/authors/[slug]`: Dynamic author profile support with fallback to static data.
- `/rss.xml`, `/sitemap.xml`, `/robots.txt`.

Admin/API routes:

- `/admin`: Dashboard overview and content management lists.
- `/api/admin/posts`: CRUD for blog articles.
- `/api/admin/images`: Cloudinary upload handler with rate limiting and audit logging.
- `/api/admin/revalidate`: Authenticated manual revalidation.
- `/api/blog/search`: Validated public search JSON endpoint.

## Security Model

- Clerk protects `/admin` and `/api/admin`.
- RBAC accepts Clerk org role `org:admin`, metadata roles `admin`, `redops_admin`, or an allowlisted `REDOPS_ADMIN_EMAILS` address.
- Supabase Row Level Security (RLS) provides public read-only access to published content.
- Admin writes use the Supabase Service Role key in server-side routes, bypassing RLS after Clerk authentication.
- Mutating admin APIs enforce same-origin checks and CSRF protection.
- Content is stored as Markdown and rendered via `react-markdown` with strict sanitization.

## SEO Architecture

- Dynamic metadata is generated for blog listing, category, tag, and article pages.
- Article pages emit BlogPosting JSON-LD, breadcrumb JSON-LD, and FAQ JSON-LD.
- RSS is available at `/rss.xml`.
- Sitemap includes static routes and Supabase blog slugs.

## Verification Status

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

All verification steps pass. The system is fully migrated from Sanity to Supabase.
