/// <reference types="react-scripts" />

// Fix i18next type issues
import 'react-i18next';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    returnEmptyString: false;
    defaultNS: 'translation';
    resources: {
      translation: Record<string, string>;
    };
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
