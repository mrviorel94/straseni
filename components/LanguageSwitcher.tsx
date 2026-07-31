'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { languages } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
            language === lang.code
              ? 'bg-forest-green text-white'
              : 'bg-light-gray text-charcoal hover:bg-gray-300'
          }`}
          title={lang.name}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
