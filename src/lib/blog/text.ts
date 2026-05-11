import type { TableOfContentsItem } from '@/types/blog';

/**
 * Estimate reading time from markdown text.
 */
export function estimateReadingTime(input: {
  title?: string;
  excerpt?: string;
  body?: string;
}) {
  const text = [input.title, input.excerpt, input.body].filter(Boolean).join(' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min`;
}

/**
 * Create a URL-safe heading ID from heading text.
 */
export function createHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Extract table of contents from markdown headings (## and ###).
 */
export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  if (!markdown) return [];

  const usedIds = new Map<string, number>();
  const items: TableOfContentsItem[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`~[\]]/g, '').trim();
    if (!text) continue;

    const baseId = createHeadingId(text);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);

    items.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      text,
      level,
    });
  }

  return items;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function normalizeSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0]?.trim() || '';
  return value?.trim() || '';
}

export function normalizePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw || '1', 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
}
