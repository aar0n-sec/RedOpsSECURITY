import type { PortableTextBlock, TableOfContentsItem } from '@/types/blog';

const HEADING_STYLES = new Set(['h2', 'h3']);

export function plainTextFromPortableText(blocks: PortableTextBlock[] = []) {
  return blocks
    .map((block) => {
      if (block._type === 'block') {
        return block.children?.map((child) => child.text || '').join('') || '';
      }

      if (block._type === 'code' && typeof block.code === 'string') {
        return block.code;
      }

      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

export function estimateReadingTime(input: {
  title?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
}) {
  const text = [input.title, input.excerpt, plainTextFromPortableText(input.body)]
    .filter(Boolean)
    .join(' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min`;
}

export function createHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function extractTableOfContents(blocks: PortableTextBlock[] = []): TableOfContentsItem[] {
  const usedIds = new Map<string, number>();

  return blocks.flatMap((block) => {
    if (block._type !== 'block' || !block.style || !HEADING_STYLES.has(block.style)) {
      return [];
    }

    const text = block.children?.map((child) => child.text || '').join('').trim();
    if (!text) return [];

    const baseId = createHeadingId(text);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);

    return [
      {
        id: count === 0 ? baseId : `${baseId}-${count + 1}`,
        text,
        level: block.style === 'h2' ? 2 : 3,
      },
    ];
  });
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
