# localizator.js

Very simple module for translate your texts with custom params, cases and plurals.

## Features

- Simple, fast and small
- Custom params for translate
- Custom params for plural

## Menu

- [Basic usage](#basic)
- [Usage with params](#params)
- [Usage with plural form](#plural)

## Installing

Using npm:

```bash
npm install lorgar
```

## Usage

### <a name="basic" id="basic"></a>Register new Localizator class

javascript:

```typescript
import Localizator from 'lorgar';


const localizator = new Localizator({
  locales?: {
    [key: string]: {
      [key: string]: string;
    }
  },
  language?: string,
  fallbackLanguage?: string,
});
```

### Change locale

You can set new locale or update existing locale. Just use the `changeLocale` method.

javascript:

```typescript
/**
 * first argument - name of locale,
 * second argument - locale object
 */
localizator.changeLocale(string, {
  [key: string]: string
});
```

### Delete locale

Also you can delete the locale by calling the `deleteLocale` method

```typescript
/**
 * first argument - name of locale
 */
localizator.deleteLocale(string);
```

### Change language

Call the `changeLanguage` methods if you want to change the language

```typescript
/**
 * first argument - new language
 */
localizator.changeLanguage(string);
```

### Get translate

locale:

```json
{
  "some.key": "some translate"
}
```

javascript:

```js
localizator.t('some.key'); // some translate
```

### Get translate with wrong key

javascript:

```js
localizator.t('wrong.key'); // wrong.key
```

### Get translate with wrong key and fallback

javascript:

```js
localizator.t('wrong.key', null, 'some fallback'); // some fallback
```

### <a name="params" id="params"></a>Get translate with params

#### Params in array:

locale:

```json
{
  "some.key": "some $0"
}
```

javascript:

```js
localizator.t('some.key', ['param']); // some param
```

#### Params in object

locale:

```json
{
  "some.key": "some {test}"
}
```

javascript:

```js
localizator.t('some.key', 'some fallback', { test: 'param' }); // some param
```

### <a name="plural" id="plural"></a>Get translate with plural form

locale:

```json
{
  "plural": "$0 [subs,subscriber,subscribers,subscribers]"
}
```

```js
[varName, firstForm, secondForm, thirdForm];

// varName - name of variable

// firstForm - singular form (one apple - en, одно яблоко - ru)

// secondForm - plural form, like two items (two apples - en, два яблока - ru)

// thirdForm - plural form, like five items (five apples - en, пять яблок - ru)
```

#### One item

javascript:

```js
localizator.t('plural', 'some fallback', [1], { subs: 1 }); // 1 subscriber
```

#### Two items

```js
localizator.t('plural', 'some fallback', [2], { subs: 2 }); // 2 subscribers
```

#### Five items

```js
localizator.t('plural', 'some fallback', [5], { subs: 5 }); // 5 subscribers
```
