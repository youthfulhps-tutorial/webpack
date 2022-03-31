# webpack-css-extract-plugin

## mini-css-extract-plugin

style-loader의 경우 css파일을 분석하고 인라인 style로 head에 삽입을 해준다.
여기서 다룰 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)의 경우
css파일을 별개 css파일로 추출하여 생성해주는 코드 스플리팅 역할을 한다.

## 설치

```
~$ yarn add --dev webpack webpack-cli css-loader style-loader mini-css-extract-plugin
```

## 웹팩 설정

```js
// webpack.config.js

var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

MiniCssExtractPlugin은 css-loader를 통해 추출된 css를 파일명에 따라 css파일을 생성해준다.
추출된 css 파일은 index.html 파일에서 link 태그를 통해 스타일을 적용시켜주면 된다.

```html
<link rel="stylesheet" href="./dist/main.css" />
```

## Reference

[Webpack 핸드북, Code Splitting](https://joshua1988.github.io/webpack-guide/tutorials/code-splitting.html)
