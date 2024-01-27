import { useSyncExternalStore } from 'react';

const createExternalState = <T,>(init: T): [useExternalState: () => T, setState: (v: T) => void] => {

  let listeners: (() => void)[] = [];

  const subscribe = (f: () => void) => {
    listeners.push(f);
    return () => {
      listeners = listeners.filter(ff => ff !== f);
    };
  };

  let value: T = init;

  const setState = (v : T) => {
    const newValue = v;
    if(value !== newValue){
      value = newValue;
      listeners.map(f => f());
    }
  };

  const getState = (): T => {
    return value;
  };

  const useExternalState = () => {
    return useSyncExternalStore(subscribe, getState);
  };

  return [
    useExternalState, setState,
  ];

};

export { createExternalState };