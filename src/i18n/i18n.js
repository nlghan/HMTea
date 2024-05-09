import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './en.json'
import translationVI from './vi.json';
import translationFR from './fr.json'

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: translationEN,
      },
      vi: {
        translation: translationVI,
      },
      fr: {
        translation: translationFR,
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
