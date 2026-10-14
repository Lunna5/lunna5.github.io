import { ui, defaultLang } from './ui';

export type SupportedLanguage = keyof typeof ui;

export const getLangFromUrl = (url: URL | string): SupportedLanguage => {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const [, lang] = pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
};

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export const useTranslations = (lang: SupportedLanguage = defaultLang) => {
  const localizedUI = ui[lang] || ui[defaultLang];
  return function t(key: TranslationKey | (string & {})): string {
    return (localizedUI as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
};

export const buildUrl = (path: string, lang: SupportedLanguage = defaultLang): string => {
  if (
    !path ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const [baseAndQuery, hash] = path.split('#');
  const [base, query] = baseAndQuery.split('?');

  const normalizedBase = base.startsWith('/') ? base : `/${base}`;
  const cleanBase = normalizedBase.replace(/\/$/, '') || '/';

  const pureBase = cleanBase.startsWith('/es') ? cleanBase.replace(/^\/es(\/|$)/, '/') || '/' : cleanBase;

  let localizedBase = pureBase;
  if (lang !== defaultLang) {
    localizedBase = pureBase === '/' ? `/${lang}/` : `/${lang}${pureBase}`;
  }

  const queryPart = query ? `?${query}` : '';
  const hashPart = hash ? `#${hash}` : '';

  return `${localizedBase}${queryPart}${hashPart}`;
};

export const useTranslatedPath = (lang: SupportedLanguage = defaultLang) => {
  return (path: string, targetLang: SupportedLanguage = lang) => buildUrl(path, targetLang);
};

export const getLocalizedPath = (pathname: string, targetLang: SupportedLanguage): string => {
  return buildUrl(pathname, targetLang);
};
