import { SassStyles, ignorePixelStyle } from './cssStyle';
import { camel2Kebabu, kebabu2Camel } from './changeCase';

////////////////////////////////////////////////////////////////////////////////

const convertToCssValue = (selector: string, value: number | string): string => {
  if(typeof value === 'number'){
    const enableAppendPx = (ignorePixelStyle.indexOf(kebabu2Camel(selector)) < 0) && (ignorePixelStyle.indexOf(selector) < 0);
    return enableAppendPx? `${value}px`: String(value);
  }
  return value;
};

////////////////////////////////////////////////////////////////////////////////

const convertToCss = (selector: string, value: number | string | (number | string)[]): string => {
  if(typeof value === 'string' || typeof value === 'number'){
    return `${camel2Kebabu(selector)}:${convertToCssValue(selector, value)};`;
  }
  const styleValue = value.map(v => convertToCssValue(selector, v)).join((' '));
  return `${camel2Kebabu(selector)}:${styleValue};`;
};

////////////////////////////////////////////////////////////////////////////////

const appendScopeName = (selectorString: string, scopeName?: string) => {
  if(!scopeName || !selectorString.trim()){
    return selectorString;
  }
  //
  const selector = selectorString.trim().split(' ');
  const deep = selector.indexOf('::v-deep');
  //
  if (deep === 0) {
    if(selector.length === 1){
      selector.push(`[${scopeName}]`);
    }else{
      selector[1] = `[${scopeName}] ${selector[1]}`;
    }
  } else {

    // no v-deep
    let targetSelector = selector.length - 1;
    if (deep > 0) {
      // v-deep
      targetSelector = deep - 1;
    }

    if (selector[targetSelector].indexOf('::') >= 0) {
      // selector[scope]::hover
      const ss = selector[targetSelector].split('::');
      selector[targetSelector] = `${ss[0]}[${scopeName}]::${ss[1]}`;
    } else if (selector[targetSelector].indexOf(':') >= 0) {
      // selector[scope]:abc
      const ss = selector[targetSelector].split(':');
      selector[targetSelector] = `${ss[0]}[${scopeName}]:${ss[1]}`;
    } else {
      // selector[scope]
      selector[targetSelector] = `${selector[targetSelector]}[${scopeName}]`;
    }
    //
  }

  // remove v-deep
  if (deep >= 0) {
    selector.splice(deep, 1);
  }

  return selector.join(' ');
};

////////////////////////////////////////////////////////////////////////////////

const CR = '\n';
const TAB = '  ';

////////////////////////////////////////////////////////////////////////////////

const styleToStringParser = (sass: SassStyles, parentSelector: string, store: {[key:string]:string[]}, indent: number, scopeName?: string, pretty?: boolean): void => {

  const sassObject = sass as {[key:string]: SassStyles | number | string | (number | string)[]};

  for(const key in sassObject){
    const value = sassObject[key];

    // rules
    if(key.slice(0,1) === '@'){
      const ruleCss = styleToStringCore(value as SassStyles, {}, 2, scopeName, pretty);
      store[''] = store[''] ?? [];
      const cr = pretty? CR: '';
      store[''].push(`${key}${ruleCss?`{${cr}${ruleCss}}`:';'}`);
      continue;
    }

    // css
    if(typeof value === 'string' || typeof value === 'number' || Array.isArray(value)){
      store[parentSelector] = store[parentSelector] ?? [];
      store[parentSelector].push(convertToCss(key, value));
      continue;
    }

    // any selectors
    const selectors = key.split(',').map(v => v.trim());
    for(const selector of selectors){
      const newParentKey = (selector.slice(0,1) === '&')?
        `${parentSelector}${selector.slice(1)}`
        :
        `${parentSelector?`${parentSelector} `:''}${selector}`;
      styleToStringParser(value, newParentKey, store, indent, scopeName, pretty);
    }
    continue;

  }
};

////////////////////////////////////////////////////////////////////////////////

const styleToStringCore = (sass: SassStyles, store: {[key:string]:string[]}, indent: number, scopeName?: string, pretty?: boolean): string => {

  styleToStringParser(sass, '', store, indent, scopeName, pretty);

  // for pretty
  const cr = pretty? CR: '';
  const selectorTab = pretty? TAB.repeat(indent - 1): '';
  const tab = pretty? TAB.repeat(indent): '';

  const result: string[] = [];

  for(const selector in store){
    if(selector){
      // with selector
      result.push(`${selectorTab}${appendScopeName(selector, scopeName)}{${cr}`);
      for(const css of store[selector]){
        result.push(`${tab}${css}${cr}`);
      }
      result.push(`${selectorTab}}${cr}`);
    }else{
      // no selector
      for(const css of store['']){
        result.push(`${css}${cr}`);
      }
    }
  }

  return result.join('');

};

////////////////////////////////////////////////////////////////////////////////

const styleToString = (sass: SassStyles, scopeName?: string, pretty?: boolean): string => {
  return styleToStringCore(sass, {}, 1, scopeName, pretty);
};

////////////////////////////////////////////////////////////////////////////////

export { styleToString };
