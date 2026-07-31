import { useLanguage } from './LanguageContext';
import { t as translate } from './i18n';

export function useTranslation() {
  const { language } = useLanguage();

  return {
    t: (key: string) => translate(language, key),
    language,
  };
}
