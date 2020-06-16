import Localizator from '../src/index';

const localizator = new Localizator({
  locales: {
    ru: {
      test: 'тест',
      test3: 'Меня зовут $0 $1',
      test4: 'Меня зовут {name} {surname}',
    },
    en: {
      test: 'test',
      test3: 'My name is $0 $1',
      test4: 'My name is {name} {surname}',
    },
  },
  language: 'ru',
  fallbackLanguage: 'ru',
});

test('add locale', () => {
  localizator.changeLocale('test', {
    test: 'test',
  });

  expect(localizator.locales.test).toEqual({ test: 'test' });
});

test('change locale', () => {
  localizator.changeLocale('test', {
    test: 'test2',
  });

  expect(localizator.locales.test).toEqual({ test: 'test2' });
});

test('delete locale', () => {
  localizator.deleteLocale('test');

  expect(localizator.locales.test).toEqual(undefined);
});

test('chane language', () => {
  localizator.changeLanguage('en');

  expect(localizator.language).toEqual('en');
});

test('translate', () => {
  expect(localizator.t('test')).toEqual('test');
});

test('translate with unknown key', () => {
  expect(localizator.t('some key')).toEqual('some key');
});

test('translate with unknow key and fallback', () => {
  expect(localizator.t('some key', null, 'something went wrong')).toEqual('something went wrong');
});

test('translate with array params', () => {
  expect(localizator.t('test3', ['Dan', 'Fomin'])).toEqual('My name is Dan Fomin');
});

test('translate with object params', () => {
  expect(localizator.t('test4', { name: 'Dan', surname: 'Fomin' })).toEqual('My name is Dan Fomin');
});

test('test translate with fallback language', () => {
  localizator.changeLanguage(undefined);
  expect(localizator.t('test')).toEqual('тест');
});
