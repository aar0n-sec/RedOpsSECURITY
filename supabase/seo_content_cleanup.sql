-- RedOps SEO/content cleanup for existing CMS rows.
-- Run in Supabase SQL Editor after the base schema is installed.

INSERT INTO tags (title, slug)
VALUES ('Supply Chain Security', 'supply-chain-security')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

UPDATE posts
SET body = regexp_replace(body, '"{3}[[:space:]]*$', '')
WHERE slug = 'european-commission-cyber-attack-2026-event-impact-and-key-lessons';

INSERT INTO post_seo (post_id, canonical_path)
SELECT id, '/blog/european-commission-cyber-attack-2026-event-impact-and-key-lessons'
FROM posts
WHERE slug = 'european-commission-cyber-attack-2026-event-impact-and-key-lessons'
ON CONFLICT (post_id) DO UPDATE SET canonical_path = EXCLUDED.canonical_path;

DELETE FROM post_tags
WHERE post_id = (
  SELECT id
  FROM posts
  WHERE slug = 'european-commission-cyber-attack-2026-event-impact-and-key-lessons'
)
AND tag_id IN (
  SELECT id
  FROM tags
  WHERE lower(title) = 'wordpress'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT posts.id, tags.id
FROM posts
CROSS JOIN tags
WHERE posts.slug = 'european-commission-cyber-attack-2026-event-impact-and-key-lessons'
  AND tags.slug = 'supply-chain-security'
ON CONFLICT DO NOTHING;

UPDATE posts
SET title = 'WordPress xmlrpc.php -common vulnerabilities & how to exploit them'
WHERE slug = 'wordpress-xmlrpcphp-common-vulnerabilites-how-to-exploit-them';

UPDATE post_seo
SET meta_title = replace(replace(meta_title, 'Wordpress', 'WordPress'), 'vulnerabilites', 'vulnerabilities')
WHERE post_id = (
  SELECT id
  FROM posts
  WHERE slug = 'wordpress-xmlrpcphp-common-vulnerabilites-how-to-exploit-them'
);

UPDATE tags
SET title = 'WordPress'
WHERE lower(title) = 'wordpress';
