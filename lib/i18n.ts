import ro from './translations/ro.json';
import ru from './translations/ru.json';

export type Language = 'ro' | 'ru';

export const translations: Record<Language, typeof ro> = {
  ro,
  ru,
};

export const languages: { code: Language; name: string }[] = [
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
];

export function t(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function getLanguageFromLocalStorage(): Language {
  if (typeof window === 'undefined') return 'ro';
  const stored = localStorage.getItem('language');
  return (stored as Language) || 'ro';
}

export function setLanguageToLocalStorage(language: Language) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', language);
}
