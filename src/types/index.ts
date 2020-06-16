export interface Config {
  locales?: Locales;
  language?: string;
  fallbackLanguage?: string;
}

export interface Locales {
  [key: string]: Locale;
}

export interface Locale {
  [key: string]: string;
}

export interface ArrayParams extends Array<any> {}

export interface ObjectParams {
  [key: string]: any;
}

export interface Plural {
  [key: string]: number;
}