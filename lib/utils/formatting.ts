export const formatPrice = (price: number, currency: string, locale: string = 'es-ES'): string => {
  const currencyMap: { [key: string]: string } = {
    MXN: 'MX',
    COP: 'CO',
    USD: 'US',
    PEN: 'PE',
    CLP: 'CL',
    ARS: 'AR',
  };

  const countryCode = currencyMap[currency] || 'US';

  return new Intl.NumberFormat(`${locale}-${countryCode}`, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: Date, locale: string = 'es-ES'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatRelativeTime = (date: Date, locale: string = 'es-ES'): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Hace poco';
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)}w`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)}mo`;
  return `Hace ${Math.floor(diffDays / 365)}y`;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
