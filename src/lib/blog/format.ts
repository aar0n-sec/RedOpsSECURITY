export function formatPostDate(value?: string) {
  if (!value) return 'Draft';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Draft';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}
