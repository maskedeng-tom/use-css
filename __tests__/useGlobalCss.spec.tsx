/**
 * @jest-environment jsdom
**/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { useGlobalCss } from '../src/useCss';
import { createExternalState } from './createExternalState';
import { resetShortId } from '../src/lib/shortId';

const sleep = async (msec: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, msec);
  });
};

describe('useScopedCss', () => {

  test('basic', async () => {

    const testFunction = async (strict: boolean) => {

      resetShortId();
      document.body.innerHTML = '<div id="root"></div>';
      document.head.innerHTML = '';
      //
      const App = () => {
        useGlobalCss({
          '.test':{
            color: 'red',
          }
        });
        return <div>TEXT</div>;
      };

      //
      const rootElement = document.getElementById('root') as HTMLElement;
      const root = createRoot(rootElement);
      if(strict){
        root.render(
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        );
      }else{
        root.render(
          <App/>
        );
      }

      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:red;}</style>');

      root.unmount();
      expect(rootElement.innerHTML).toBe('');
      expect(document.head.innerHTML).toBe('');
    };

    await testFunction(false);
    await testFunction(true);
  });

  test('dependency', async () => {

    const testFunction = async (strict: boolean) => {

      //
      resetShortId();
      document.body.innerHTML = '<div id="root"></div>';
      document.head.innerHTML = '';
      //
      const [useCustomState, setCustomState] = createExternalState<string>('red');
      //
      const App = () => {

        const color = useCustomState();

        useGlobalCss({
          '.test':{
            color: color,
          }
        }, [color]);

        return <div>TEXT</div>;
      };

      //
      const rootElement = document.getElementById('root') as HTMLElement;
      const root = createRoot(rootElement);
      if(strict){
        root.render(
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        );
      }else{
        root.render(
          <App/>
        );
      }

      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:red;}</style>');

      setCustomState('green');
      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:green;}</style>');

      root.unmount();
      expect(rootElement.innerHTML).toBe('');
      expect(document.head.innerHTML).toBe('');
    };

    await testFunction(false);
    await testFunction(true);

  });

  test('multi', async () => {
    //
    const testFunction = async (strict: boolean) => {
      resetShortId();
      document.body.innerHTML = '<div id="root"></div>';
      document.head.innerHTML = '';
      //
      const [useCustomState1, setCustomState1] = createExternalState<string>('red');
      const [useCustomState2, setCustomState2] = createExternalState<string>('red');
      //
      const App1 = () => {

        const color = useCustomState1();

        useGlobalCss({
          '.test':{
            color: color,
          }
        }, [color]);

        return <div>TEXT1</div>;
      };

      const App2 = () => {

        const color = useCustomState2();

        useGlobalCss({
          '.test':{
            color: color,
          }
        }, [color]);

        return <div>TEXT2</div>;
      };

      //
      const rootElement = document.getElementById('root') as HTMLElement;
      const root = createRoot(rootElement);
      if(strict){
        root.render(
          <React.StrictMode>
            <><App1/><App2/></>
          </React.StrictMode>
        );
      }else{
        root.render(
          <><App1/><App2/></>
        );
      }

      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT1</div><div>TEXT2</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:red;}</style>');

      setCustomState1('green');
      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT1</div><div>TEXT2</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:red;}</style><style>.test{color:green;}</style>');

      setCustomState2('green');
      await sleep(0);
      expect(rootElement.innerHTML).toBe('<div>TEXT1</div><div>TEXT2</div>');
      expect(document.head.innerHTML).toBe('<style>.test{color:green;}</style>');

      root.unmount();
      expect(rootElement.innerHTML).toBe('');
      expect(document.head.innerHTML).toBe('');
    };

    await testFunction(false);
    await testFunction(true);

  });

});
