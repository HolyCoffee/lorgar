import { Plural, Locale, Config, Locales, ArrayParams, ObjectParams } from './types/index';

class Localizator {
  locales: Locales;
  language: string;
  fallbackLanguage: string;

  constructor(config?: Config) {
    this.locales = config.locales || {};
    this.language = config.language || config.fallbackLanguage;
    this.fallbackLanguage = config.fallbackLanguage;
  }

  changeLocale(language: string, locale: Locale): void {
    this.locales[language] = locale;
  }

  deleteLocale(language: string): void {
    delete this.locales[language];
  }

  changeLanguage(language: string): void {
    this.language = language;
  }

  t(key: string, params?: ArrayParams | ObjectParams, fallback: string = key) {
    const language = this.language || this.fallbackLanguage;

    if (!language) {
      throw new ReferenceError('Please, use changeLanguage function to set active language');
    } else if (!this.locales[language]) {
      throw new ReferenceError(`Please set locale for ${language} language`);
    }

    let translate = this.locales[this.language || this.fallbackLanguage][key];

    if (!translate) return fallback;

    if (params) {
      if (Array.isArray(params)) {
        for (let i = 0; i < params.length; i++) {
          translate = translate.replace(new RegExp(`\\$${i}`, 'g'), params[i]);
        }
      } else {
        for (let param in params) {
          translate = translate.replace(new RegExp(`\\{${param}}`, 'g'), params[param]);
        }
      }
    }

    return translate;
  }
}

export default Localizator;
