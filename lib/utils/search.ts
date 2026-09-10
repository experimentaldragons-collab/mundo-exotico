export const normalizeSearchTerm = (term: string): string => {
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const highlightSearchTerm = (text: string, term: string): string => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const buildSearchQuery = (
  searchTerm: string,
  filters: Record<string, any>
): string => {
  const parts: string[] = [];
  
  if (searchTerm) {
    parts.push(`search:${normalizeSearchTerm(searchTerm)}`);
  }
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      parts.push(`${key}:${value}`);
    }
  });
  
  return parts.join(' ');
};
