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

  t(key: string, params?: ArrayParams | ObjectParams, fallback: string = key, plural?: Plural) {
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

    return plural ? this.setPluralForm(translate, plural) : translate;
  }

  private setPluralForm(translate: string, plural: Plural) {
    let preparedTranlate = translate;

    preparedTranlate.split(' ').forEach((item) => {
      /\[([^,]+),([^,\d]+,)+([^,]+)\]/.test(item) &&
        (preparedTranlate = preparedTranlate.replace(
          item,
          item.slice(1, -1).split(',')[this.replacer(plural[item.slice(1, -1).split(',')[0]])]
        ));
    });

    return preparedTranlate;
  }

  private replacer(value: number) {
    return (Math.abs(value) % 100 >= 5 && Math.abs(value) % 100 <= 20) || Math.abs(value) % 100 === 0
      ? 3
      : Math.abs(value) % 10 >= 2 && Math.abs(value) % 10 <= 4
      ? 2
      : 1;
  }
}

export default Localizator;
