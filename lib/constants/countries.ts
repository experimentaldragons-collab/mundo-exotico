export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  order: number;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    currency: 'MXN',
    currencySymbol: '$',
    order: 1,
  },
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    currency: 'COP',
    currencySymbol: '$',
    order: 2,
  },
  {
    code: 'VE',
    name: 'Venezuela',
    flag: '🇻🇪',
    currency: 'USD',
    currencySymbol: '$',
    order: 3,
  },
  {
    code: 'EC',
    name: 'Ecuador',
    flag: '🇪🇨',
    currency: 'USD',
    currencySymbol: '$',
    order: 4,
  },
  {
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    currency: 'PEN',
    currencySymbol: 'S/',
    order: 5,
  },
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    currency: 'CLP',
    currencySymbol: '$',
    order: 6,
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    currency: 'ARS',
    currencySymbol: '$',
    order: 7,
  },
];

export const getCountryByCode = (code: string): CountryConfig | undefined => {
  return COUNTRIES.find((country) => country.code === code);
};

export const getCountryCurrency = (code: string): string => {
  return getCountryByCode(code)?.currency || 'USD';
};
