# React Hooks Boilerplate with Hot Reload

[react-hot-loader](https://github.com/gaearon/react-hot-loader) is now compatible with React Hooks APIs.

This boilerplate could help you start to play React Hooks APIs with Hot Reload.

```sh
npm install
npm start
```

Check it out: http://localhost:8080

## Lint & Build

```sh
npm run lint
npm run build
```

# Begin from scratch

## Init project

Create a new directory then

```sh
npm init -y
```

## Install dependencies
```sh
npm install react@latest react-dom@latest react-hot-loader
```

## Install development dependencies

### Babel

```sh
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev
```

### Webpack

```sh
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```

### ESLint Airbnb
```sh
npx install-peerdeps --dev eslint-config-airbnb
npm install babel-eslint --save-dev
```

### Cross-env

```sh
npm install cross-env --save-dev
```

# Set up

## Babel config

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```

## ESLint config

```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "browser": true
  },
  "rules": {
    "arrow-parens": "off",
    "comma-dangle": ["error", "never"],
    "no-confusing-arrow": "off",
    "no-unused-expressions": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off"
  },
  "plugins": [
    "react"
  ]
}
```

## `webpack.config.js`

```js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { env } = process;

const options = {
  mode: env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) }),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    hot: true
  },
  devtool: env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : undefined
};

module.exports = options;
```

## NPM Scripts

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --hot",
    "build": "cross-env NODE_ENV=production webpack",
    "lint": "eslint ./src"
  },
}
```

# Enjoy 🎅🎄🔥
