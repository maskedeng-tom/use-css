import React from 'react';
import { createRoot } from 'react-dom/client';
import { useScopedCss } from '../';

const App = () => {
  const scope = useScopedCss({
    '.test':{
      color: 'red',
    }
  });
  return <div {...scope} className="test">TEXT</div>;
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
