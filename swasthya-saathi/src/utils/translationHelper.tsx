import React, { ReactNode } from 'react';
import { useTranslation as useTranslationOriginal, Trans as TransOriginal } from 'react-i18next';
import i18next from 'i18next';

// Define fixed types to avoid infinite type instantiation
interface TranslationReturnType {
  t: (key: string, options?: any) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
  };
  ready: boolean;
}

// Wrapper hook that uses a fixed return type
export function useTranslation() {
  return useTranslationOriginal() as unknown as TranslationReturnType;
}

// Use the original Trans component
export const Trans = TransOriginal;

// Custom hook to convert translation to string safely
export function useTranslatedString() {
  const { t } = useTranslation();
  return (key: string) => t(key);
}

// For backward compatibility - deprecated
export function tString(key: string) {
  console.warn('tString is deprecated, please use useTranslation().t instead');
  // Using a safer approach with i18next
  return i18next.t(key as any) || key;
}