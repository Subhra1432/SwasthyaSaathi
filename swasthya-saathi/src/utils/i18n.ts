import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locales
import enUS from '../assets/locales/en-US.json';
import hinIN from '../assets/locales/hin-IN.json';
import asmIN from '../assets/locales/asm-IN.json';
import manIN from '../assets/locales/man-IN.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': {
        translation: enUS
      },
      'hin-IN': {
        translation: hinIN
      },
      'asm-IN': {
        translation: asmIN
      },
      'man-IN': {
        translation: manIN
      }
    },
    lng: 'en-US', // Default language
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 