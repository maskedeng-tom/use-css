# use-css

* input (入力)

```html
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>use-css</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

```tsx
import { useScopedCss } from '@maskedeng-tom/use-css';

const App = () => {
  const scope = useScopedCss({
    '.title':{
      color: 'red',
    }
  });
  return <div {...scope} className="title">use-css useScopedCss sample !</div>;
};

export default App;
```

```tsx
// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
```

* output (出力)

```html
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>use-css</title>
    <style>.title[sc000000]{color:red;}</style>
  </head>
  <body>
    <div id='root'><div sc000000="" className="title">use-css useScopedCss sample !</div></div>
  </body>
</html>
```

Reactで、一般的なCSSやスコープ付きCSSを、各種バンドラー(webpackなど)に依存せず、JavaScript、Typescriptで利用するためのReact hooksライブラリーです。簡単に導入でき、他のnpmライブラリへの依存はありません。

This is a React hooks library that allows you to use common CSS and scoped CSS in JavaScript and TypeScript without relying on various bundlers (such as webpack). It is easy to integrate and does not have any dependencies on other npm libraries.

## Prerequisites

React hooksライブラリーなので、React Version 16.8以降に対応しています。Typescriptにも対応しています。

This is a React hooks library, so it is compatible with React version 16.8 and above. It also supports TypeScript.

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Usage](#usage)
  * [Base program](#base-program)
  * [how to use `useScopedCss`](#how-to-use-usescopedcss)
  * [how to use `useGlobalCss`](#how-to-use-useglobalcss)
  * [Using nested CSS](#using-nested-css)
  * [Specifying the scope indicator position](#specifying-the-scope-indicator-position)
  * [Use `dependency` parameter](#use-dependency-parameter)
* [API](#api)
  * [useScopedCss](#usescopedcss)
    * [Options](#options)
    * [Return value](#return-value)
  * [useGlobalCss](#useglobalcss)
    * [Options](#options-1)
* [type SassStyles](#type-sassstyles)
  * [In the case of simple CSS](#in-the-case-of-simple-css)
  * [CSS contains the pixel unit](#css-contains-the-pixel-unit)
  * [CSS containing multiple parameters](#css-containing-multiple-parameters)
  * [CSS containing nested CSS](#css-containing-nested-css)
  * [sass '&' selector](#sass--selector)
  * [`::v-deep` selector](#v-deep-selector)
* [Getting Started with a Simple React Project](#getting-started-with-a-simple-react-projectwith-webpack)
* [Contributing](#contributing)
* [Credits](#credits)
* [Authors](#authors)
* [Show your support](#show-your-support)
* [License](#license)

## Getting Started

適当なReactを用意してください。関数コンポーネントを利用するため、React Version 16.8以降が必要です。
すでに作成済みのReactプロジェクトにも適用できます。作成済みのReactプロジェクトへの導入にあたって、破壊的な変更は行われません（React本体以外への依存はありません）。

シンプルなReactプロジェクトの作り方については、以下を参考にしてください。
[Getting Started with a Simple React Project](#getting-started-with-a-simple-react-projectwith-webpack)

Please prepare a suitable React project. React version 16.8 or above is required to use function components.
It can also be applied to existing React projects. There will be no destructive changes when introducing it to an existing React project (no dependencies on anything other than React itself).

Please refer to the following for instructions on how to create a simple React project.
[Getting Started with a Simple React Project](#getting-started-with-a-simple-react-projectwith-webpack)

## Installation

### Using npm (npmを利用する場合)

  ```sh
  npm install @maskedeng-tom/use-css
  ```

### Using yarn (yarnを利用する場合)

  ```sh
  yarn add @maskedeng-tom/use-css
  ```

## Usage

### Base program

以下の基本プログラムに沿って解説します。

We will explain according to the following basic program.

```html
<!-- index.html -->
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>use-css</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

```tsx
// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
```

```tsx
// App.tsx
const App = () => {
  return <div>use-css sample!</div>;
};

export default App;
```

### how to use `useScopedCss`

```tsx
// App.tsx
import { useScopedCss } from '@maskedeng-tom/use-css';

const App = () => {
  const scope = useScopedCss({
    '.title':{
      color: 'red',
    }
  });
  return <div {...scope} className="title">use-css useScopedCss sample !</div>;
};

export default App;
```

上記のコードは、以下のような `style` タグと `html` を生成します。

The above code generates the following `style` tag and `html`.

```html
<!-- index.html -->
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>use-css</title>
    <style>.title[sc000000]{color:red;}</style>
  </head>
  <body>
    <div id='root'><div sc000000="" className="title">use-css useScopedCss sample !</div></div>
  </body>
</html>
```

`useScopedCss`は、cssをスコープ付きで`style`タグとして適用します。上記の例では `sc000000` というスコープ名が付与されています。また、スコープ名は自動でユニークなものが付与され、`useScopedCss`の戻り値に含まれています。

`useScopedCss` applies css with a scoped `style` tag. In the above example, the scope name `sc000000` is added. Also, a unique scope name is automatically added and included in the return value of `useScopedCss`.

```html
  <style>.title[sc000000]{color:red;}</style>
```

`useScopedCss`の戻り値は、以下のようなオブジェクトです。

The return value of `useScopedCss` is an object like the following.

```json
{
  "sc000000": ""
}
```

`useScopedCss`の戻り値を、`div`タグの属性に展開することで(`{...scope}`の付与)、スコープ付きのcssが適用されるタグが生成されます。

By expanding the return value of `useScopedCss` to the attributes of the `div` tag (by adding `{...scope}`), a tag with scoped css applied is generated.

```tsx
  return <div {...scope} className="title">use-css useScopedCss sample !</div>;
```

上記が下記に展開されます。

The above is expanded to the following.

```html
  <div sc000000="" className="title">use-css useScopedCss sample !</div>
```

この機能は、Vueの、スコープドスタイルに似ています。

This feature is similar to Vue's scoped style.

### how to use `useGlobalCss`

`useScopedCss`と違い、単純にCSSを適用します。スコープは付与されません。

Unlike `useScopedCss`, it simply applies CSS. No scope is added.

```tsx
// App.tsx
import { useGlobalCss } from '@maskedeng-tom/use-css';

const App = () => {
  useGlobalCss({
    '.title':{
      color: 'red',
    }
  });
  return <div className="title">use-css useGlobalCss sample !</div>;
};

export default App;
```

上記のコードは、以下のような `style` タグと `html` を生成します。

The above code generates the following `style` tag and `html`.

```html
<!-- index.html -->
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>use-css</title>
    <style>.title{color:red;}</style>
  </head>
  <body>
    <div id='root'><div className="title">use-css useGlobalCss sample !</div></div>
  </body>
</html>
```

一般的な各種バンドラーを利用してcssをインポートする場合と同様の結果が得られます。

You will get the same result as when you import css using a general bundler.

```tsx
import "./styles.css";
```

#### CSS using `@scope`,`:scope` (`@scope`,`:scope` を用いたCSS)

今後サポートが増えていくと思われる、`@scope`,`:scope`と`useGlobalCss`は今後相性のよい実装となるでしょう。

In the future, `@scope`,`:scope` and `useGlobalCss` will be a good implementation for future compatibility.

[MDN @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)

```tsx
const App = () => {
  useGlobalCss({
    '@scope (.title)':{
      ':scope':{
        color: 'green',
      },
      '.text':{
        color: 'red',
      },
    }
  });
  return <>
    <div className="title">
      title:
      <span className="text">
        use-css in scope!
      </span>
    </div>
    <div className="title-2">
      title-2:
      <span className="text">
        use-css out of scope!
      </span>
    </div>
  </>;
};
```

### Using nested CSS

`useScopedCss`と`useGlobalCss`は、ネストしたCSSを利用することができます。(`useGlobalCss`では、scopeは付与されません)

`useScopedCss` and `useGlobalCss` can use nested CSS. (No scope is added with `useGlobalCss`)

```tsx
// App.tsx
import { useScopedCss } from '@maskedeng-tom/use-css';

const App = () => {
  const scope = useScopedCss({
    '.title':{
      fontSize: '24px',
      '.text':{
        color: 'red',
      },
      '.description':{
        fontSize: '12px',
      },
    }
  });
  return <>
    <div {...scope} className="title">
      <div {...scope} className="text">
        use-css!
      </div>
      <div {...scope} className="description">
        useScopedCss sample 
      </div>
    </div>
  </>;
};

export default App;
```

上記のコードは、以下のような `style` タグを生成します。（実際には改行コードは省かれます）

The above code generates the following `style` tag. (In fact, line breaks are omitted.)

```html
<style>
.title[sc000000]{
  font-size:24px;
}
.title .text[sc000000]{
  color:red;
}
.title .description[sc000000]{
  font-size:12px;
}
</style>
```

```html
  <div sc000000="" className="title">
    <div sc000000="" className="text">
      use-css!
    </div>
    <div sc000000="" className="description">
      useScopedCss sample 
    </div>
  </div>
```

スコープ名(`sc000000`)は、ネストしたCSSの場合、セレクタの末尾に付与されます。よって、HTML上のすべてのタグに`{...scope}`を付与していることに注目してください。

In the case of nested CSS, the scope name (`sc000000`) is added at the end of the selector. Therefore, please note that `{...scope}` is added to all tags on the HTML.

### Specifying the scope indicator position

`::v-deep`を利用することでスコープ指示位置を指定することが可能です。（この機能もVueに似た機能です）

It is possible to specify the scope indicator position by using `::v-deep`. (This feature is also similar to Vue)

```tsx
// App.tsx
import { useScopedCss } from '@maskedeng-tom/use-css';

const App = () => {
  const scope = useScopedCss({
    '.title ::v-deep':{
      fontSize: '24px',
      '.text':{
        color: 'red',
      },
      '.description':{
        fontSize: '12px',
      },
    }
  });
  return <>
    <div {...scope} className="title">
      <div className="text">
        use-css!
      </div>
      <div className="description">
        useScopedCss sample 
      </div>
    </div>
  </>;
};

export default App;
```

上記のコードは、以下のような `style` タグを生成します。（実際には改行コードは省かれます）

The above code generates the following `style` tag. (In fact, line breaks are omitted.)

```html
<style>
.title[sc000000]{
  font-size:12px;
}
.title[sc000000] .text{
  color:red;
}
.title[sc000000] .description{
  font-size:8px;
}
</style>
```

```html
  <div sc000000="" className="title">
    <div className="text">
      use-css!
    </div>
    <div className="description">
      useScopedCss sample 
    </div>
  </div>
```

スコープ名(`sc000000`)は、`::v-deep`で指定された場所に挿入されます。よって、HTML上の先頭タグのみに`{...scope}`を付与していることに注目してください。

The scope name (`sc000000`) is inserted at the position specified by `::v-deep`. Therefore, please note that `{...scope}` is added only to the first tag on the HTML.

### Use `dependency` parameter

`useScopedCss`と`useGlobalCss`は、`dependency`パラメーターを利用することができます。

`useScopedCss` and `useGlobalCss` can use the `dependency` parameter.

```tsx
// App.tsx
import { useScopedCss } from '@maskedeng-tom/use-css';

const App = () => {

  const [color, setColor] = useState('red');

  const scope = useScopedCss({
    '.title':{
      color: color,
    }
  }, [color]);

  return <>
    <div {...scope} className="title">
        use-css!
      <button
        type="button"
        onClick={()=>{
          setColor('blue');
        }}
      >change color</button>
    </div>
  </>;
};

export default App;
```

上記のコードは、初期には以下の `style` タグを生成します。（実際には改行コードは省かれます）

The above code generates the following `style` tag at the beginning. (In fact, line breaks are omitted.)

```html
<style>
.title[sc000000]{
  color:red;
}
</style>
```

```html
<div id="root">
  <div class="title" sc000000="">
    use-css!
    <button type="button">change color</button>
  </div>
</div>
```

その後、ボタンタグをクリックすると、以下のように `style` タグが変更されます。

After that, when you click the button tag, the `style` tag will be changed as follows.

```html
<style>
.title[sc000001]{
  color:blue;
}
</style>
```

```html
<div id="root">
  <div class="title" sc000001="">
    use-css!
    <button type="button">change color</button>
  </div>
</div>
```

カラーテーマなどを構築する際に、便利に利用できます。

It can be used conveniently when building a color theme.

## API

### useScopedCss

```tsx
useScopedCss(css: SassStyles, dependency: unknown[] = []): {[scope: string]: ''}
```

スコープ付きのCSSを適用します。スコープは戻り値に含まれます。戻り値を、`{...scope}`のようにhtmlタグに適用してください。

Applies CSS with a scope. The scope is included in the return value. Apply the return value to the html tag as `{...scope}`.

#### Options

`css`

| Type | Default value |
| --- | --- |
| SassStyles | - |

[type SassStyles](#type-sassstyles)を参照してください。

Please refer to [type SassStyles](#type-sassstyles).

`dependency`

| Type | Default value |
| --- | --- |
| unknown[] | [] |

この値が指定された場合には、`useEffect`や`useCallback`と同様に、依存関係の変更を検知して再度CSSを適用します（`useEffect`や`useCallback`と違い、デフォルトで `[]`が指定されるため、デフォルトでは変更されません）。

If this value is specified, the CSS will be reapplied when the dependency changes, similar to `useEffect` and `useCallback` (unlike `useEffect` and `useCallback`, the default is `[]`, so it will not be changed by default).

#### Return value

`{[scope: string]: ''}`

ja:スコープ名をキーとしたオブジェクトが返されます。スコープ名は、`{...scope}`のようにhtmlタグに適用してください。

An object with the scope name as the key is returned. Apply the scope name to the html tag as `{...scope}`.

### useGlobalCss

```tsx
useGlobalCss(css: SassStyles, dependency: unknown[] = []): void
```

スコープ無しのCSSを適用します。戻り値はありません。

#### Options

`css`

| Type | Default value |
| --- | --- |
| SassStyles | - |

[type SassStyles](#type-sassstyles)を参照してください。

Please refer to [type SassStyles](#type-sassstyles).

`dependency`

| Type | Default value |
| --- | --- |
| unknown[] | [] |

この値が指定された場合には、`useEffect`や`useCallback`と同様に、依存関係の変更を検知して再度CSSを適用します（`useEffect`や`useCallback`と違い、デフォルトで `[]`が指定されるため、デフォルトでは変更されません）。

If this value is specified, the CSS will be reapplied when the dependency changes, similar to `useEffect` and `useCallback` (unlike `useEffect` and `useCallback`, the default is `[]`, so it will not be changed by default).

## type SassStyles

### In the case of simple CSS

```tsx
{
  '.selector': {
    color: 'red',
  };
}
```

```html
<style>
.selector{
  color: red;
}
</style>
```

### CSS contains the pixel unit

'px'単位を含むCSSの場合、`number`型で指定することができます。

If the CSS contains the unit 'px', it can be specified as `number` type.

```tsx
{
  '.selector': {
    borderLeft: 1,
  };
}
```

```html
<style>
.selector{
  border-left: 1px;
}
</style>
```

### CSS containing multiple parameters
  
```tsx
{
  '.selector': {
    border: [1, 'solid', 'red'],
  };
}
```

```html
<style>
.selector{
  border: 1px solid red;
}
</style>
```

### CSS containing nested CSS

```tsx
{
  '.selector': {
    color: 'red',
    '.text': {
      border: [1, 'solid', 'red'],
    },
  };
}
```

```html
<style>
.selector{
  color: red;
}
.selector .text{
  border: 1px solid red;
}
</style>
```

### sass '&' selector

```tsx
{
  '.selector': {
    color: 'red',
    '&.active': {
      color: 'blue',
    },
  };
}
```

```html
<style>
.selector{
  color: red;
}
.selector.active{
  color: blue;
}
</style>
```

### `::v-deep` selector

```tsx
{
  '.selector ::v-deep': {
    color: 'red',
    '.text': {
      border: [1, 'solid', 'red'],
    },
  };
}
```

```html
<style>
.selector[sc000000]{
  color: red;
}
.selector[sc000000] .text{
  border: 1px solid red;
}
</style>
```

## Getting Started with a Simple React Project(with webpack)

シンプルなReactプロジェクトのはじめかた(webpack利用例)

### Create project folder (プロジェクトフォルダの作成)

```sh
mkdir test-app
cd test-app
```

### Initializing package (パッケージの初期化)

```sh
npm -y init
```

### Package Installation (パッケージのインストール)

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev typescript ts-loader
npm install --save-dev react react-dom @types/react @types/react-dom
```

### Changes to `package.json` (`package.json`の変更)

```json
// package.json
  "scripts": {
+    "start": "webpack-cli serve --mode development",
+    "build": "webpack-cli --node-env=production --mode production",
  },
```

### Adding `webpack.config.js` (`webpack.config.js`の追加)

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dist = path.resolve(__dirname, './dist');

module.exports = (env, { mode }) => {

  // build mode
  let buildMode = 'production';
  if (mode === 'development') {
    buildMode = 'development';
  }

  return {
    mode: buildMode,
    devtool: ((buildMode === 'development') ? 'inline-source-map' : 'source-map'),

    entry: {'index': './src/index.tsx'},
    output: {
      filename: '[name].js',
      path: dist,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        chunks: ['index']
      }),
    ],

    devServer: {
      port: '3000',
      host: '0.0.0.0',
      open: true,
    },
  }
};
```

### Initializing TypeScript (Typescriptの初期化)

```sh
npx tsc --init
```

### Changes to `tsconfig.json` (`tsconfig.json`の変更)

```json
// tsconfig.json
{
  "compilerOptions": {
-    // "jsx": "",
+    "jsx": "react-jsx",
-    // "outDir": "./",
+    "outDir": "./dist",
-  }
+  },
+  "files": [
+    "src/index.tsx",
+  ],
+  "include": [
+    "src/**/*",
+  ],
+  "exclude": [
+    "./node_modules",
+    "./dist"
+  ]
}
```

### Adding `src/index.html` (`src/index.html`の追加)

```sh
mkdir src
```

```html
<!-- src/index.html -->
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>Simple React app with webpack</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

### Adding `src/index.tsx` (`src/index.tsx`の追加)

```tsx
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Simple React App with webpack!</h1>;
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
```

### Run (実行)

```sh
npm start
```

### Build (ビルド)

```sh
npm run build
```

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)をお読みください。ここには行動規範やプルリクエストの提出手順が詳細に記載されています。
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1. フォークする  
  Fork it!

2. フィーチャーブランチを作成する：`git checkout -b my-new-feature`  
  Create your feature branch: `git checkout -b my-new-feature`

3. 変更を追加：`git add .`  
  Add your changes: `git add .`

4. 変更をコミット：`git commit -am 'Add some feature'`  
  Commit your changes: `git commit -am 'Add some feature'`

5. ブランチをプッシュ：`git push origin my-new-feature`  
  Push to the branch: `git push origin my-new-feature`

6. プルリクエストを提出 :sunglasses:  
  Submit a pull request :sunglasses:

## Credits

昨今の複雑化していく開発現場にシンプルな力を！ :muscle:

Simplify the complex development landscape of today! :muscle:

## Authors

**Maskedeng Tom** - *Initial work* - [Maskedeng Tom](https://github.com/JohnDoe)

See also the list of [contributors](https://github.com/maskedeng-tom/use-css/contributors) who participated in this project.

:smile: [プロジェクト貢献者リスト](https://github.com/maskedeng-tom/use-css/contributors) :smile:

## Show your support

お役に立った場合はぜひ :star: を！

Please :star: this repository if this project helped you!

## License

[MIT License](https://github.com/maskedeng-tom/use-css/blob/main/LICENSE.txt) © Maskedeng Tom
