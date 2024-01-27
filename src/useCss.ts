import { useEffect, useInsertionEffect, useMemo } from 'react';
import { SassStyles } from './lib/cssStyle';
import { isSameArray } from './lib/isSameArray';
import { styleToString } from './lib/styleToString';
import { removeNode } from './lib/removeNode';
import { shortId } from './lib/shortId';
import { appendCss } from './lib/appendCss';

////////////////////////////////////////////////////////////////////////////////

const appendedScopedCss: {[key: string]: {style?: HTMLStyleElement, scopeName?: string, appendCount: number}} = {};

////////////////////////////////////////////////////////////////////////////////

const decrementCssElement = (oldStyleString: string | undefined) => {
  if(oldStyleString && appendedScopedCss[oldStyleString]){
    if(--appendedScopedCss[oldStyleString].appendCount === 0){
      removeNode(appendedScopedCss[oldStyleString].style);
      delete appendedScopedCss[oldStyleString];
    }
  }
};

////////////////////////////////////////////////////////////////////////////////

const useScopedCssCore = (sass: SassStyles, dependency: unknown[], useScopeName: boolean): {[scopeName: string]: ''} | undefined => {

  const state = useMemo<{
    dependency?: unknown[];
    scopeName?: string;
    styleString?: string;
  }>(() => {
    return {};
  }, []);

  const same = isSameArray(state.dependency, dependency);
  state.dependency = dependency;

  if(!same){
    // remove old
    decrementCssElement(state.styleString);
    // to string (non scopeName)
    const styleString = styleToString(sass, undefined);
    if(appendedScopedCss[styleString]){
      // already inserted
      state.styleString = styleString;
      state.scopeName = appendedScopedCss[styleString].scopeName;
      appendedScopedCss[styleString].appendCount++;
    }else{
      // new css
      state.styleString = styleString;
      state.scopeName = useScopeName? shortId('sc') : undefined;
      appendedScopedCss[styleString] = {scopeName: state.scopeName, appendCount: 1};
    }
  }

  // insert css
  useInsertionEffect(() => {
    /* istanbul ignore next */
    if(!state.styleString || !appendedScopedCss[state.styleString]){
      return;
    }

    // already appended
    if(appendedScopedCss[state.styleString].style){
      return;
    }
    // insert css
    const style = appendCss(styleToString(sass, state.scopeName));
    appendedScopedCss[state.styleString].style = style;

  }, [state.styleString, state.scopeName]);

  // final cleanup
  useEffect(() => {
    return () => {
      decrementCssElement(state.styleString);
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////

  // result scopeName
  if(state.scopeName){
    return {[state.scopeName]: ''};
  }

  // fatal
  /* istanbul ignore next */
  return;

};

////////////////////////////////////////////////////////////////////////////////

const useScopedCss = (sass: SassStyles, dependency: unknown[] | undefined = []): {[scopeName: string]: ''} | undefined => {
  return useScopedCssCore(sass, dependency, true);
};

////////////////////////////////////////////////////////////////////////////////

const useGlobalCss = (sass: SassStyles, dependency: unknown[] | undefined = []): void => {
  useScopedCssCore(sass, dependency, false);
};

////////////////////////////////////////////////////////////////////////////////

export { useScopedCss, useGlobalCss };
