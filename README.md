# webpack-practice

## 웹팩

웹팩은 모듈 번들러이다. 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javascript, Images)를 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구이다.

## 모듈 번들러

규모가 큰 코드 베이스를 모듈이라는 단위로 분할할 수 있게 만드는 구조를 모듈 시스템이라 한다. 자바스크립트에서는 CommonJS라는 모듈 시스템을 사용하기 시작한 이후 모듈화된 코딩을 하는 것이 보편화되었다. 하지만, 자바스크립트 사양이 변경된 후 브라우저에서 변경된 사양을 지원하기까지 시간의 차이가 존재한다. 아직 모든 브라우저에서 ES Module을 사용할 수 없기 때문에, 브라우저에서 모듈을 사용하려면 모듈의 의존 관계를 미리 해결한 후 브라우저에서 인식할 수 있는 자바스크립트 코드로 변환해야 한다. 이러한 변환 작업을 하는 도구가 모듈 번들러이다.

## 모듈 번들러의 역할

모듈 번들러는 모듈의 의존 관계를 분석하여 브라우저가 인식할 수 있는 자바스크립트 코드로 변환한다. 즉, 특성 모듈을 읽고, 브라우저에서 인식할 수 있는 일반적인 함수로 반환한다. 그리고 이 함수의 인수로 다른 모듈을 import하기 위한 함수와 모듈이 export하는 값을 저장하기 위한 객체를 전달한다.

```js
import { x } from "module";

export const y = x + 10;
```

```js
function (require, module, exports) {
  var {x} = require('module');
  exports.y = x + 10;
}
```

## 웹팩으로 해결할 수 있는 문제

파일 단위의 변수 유효 범위를 ES6 modules 문법과 웹팩의 모듈 번들링으로 해결하고, 상이한 브라우저 별 HTTP 요청 제약에 따라 하나의 파일로 합쳐 요청 횟수를 최소화하여 성능을 높일 수 있다. 웹팩에서 제공하는 코드 스프리팅과 같은 기능을 이용하여 원하는 모듈을 원하는 때에 로딩할 수 있고 사용하지 않는 코드들을 제거하거나 관리할 수 있게 한다.

## 웹팩 설치

```
~$ yarn init
~$ yarn add --dev webpack webpack-cli
```

## 웹팩의 간단한 예제

[Implemented webpack simple tutorial](https://github.com/youthfulhps/webpack-practice/commit/7ab3019a0b432accd3a49dd161fc9c76a41442ef)

## 웹팩의 기본 컨셉과 구조

[webpack.config.js](./webpack.config.js)은 다음과 같은 구조를 가지고 있다. 각각의 프로퍼티와 역할을 알아보자.

```js
var path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

### entry

```js
entry: "./src/index.js",
```

웹 자원을 변환하기 위한 최초 진입점을 나타내는 자바스크립트 파일 경로이다. 위의 경우 `src/index.js`가 웹 자원 변환을 위한 최조 진입점이 된다. 최초 진입점이 되는 파일을 통해 웹에서 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문에 웹의 전반적인 구조와 내용이 담겨 있어야 한다. 이러한 작업을 통해 의존 관계가 갖는 디펜던시 그래프를 만들어낸다.

entry는 다중일 수 있다. 각각의 페이지별로 번들링되는 멀티 페이지 애플리케이션을 그 예시로 들 수 있다.

```js
entry: {
  login: './src/LoginPage.js',
  main: './src/MainPage.js'
}
```

### output

```js
output: {
  filename: "main.js",
  path: path.resolve(__dirname, "dist"),
},
```

웹팩이 작업을 완료하고 난 결과물의 파일 경로이다. 값은 객체 형태로 전달되며, 결과물의 옵션을 설정할 있다. 위의 경우 루트 디렉토리/dist`에 main.js` 파일명을 가진 결과물 파일로 반환한다.

결과 파일에는 다양한 옵션을 추가할 수 있다.

```js
module.exports = {
  output: {
    //결과 파일 이름에
    //entry 속성을 포함
    filename: '[name].bundle.js'
    //내부적으로 사용되는 모듈 ID를 포함
    filename: '[id].bundle.js'
    //매 빌드시 마다 고유 해시 값을 포함
    filename: '[name].[hash].bundle.js'
    //각 모듈 내용을 기준으로 생성된 해시 값을 포함
    filename: '[chunkhash].bundle.js'
  }
};
```

### Loader

```js
module.exports = {
  module: {
    rules: [],
  },
};
```

웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성이다.`module`이라는 프로퍼티 명을 사용한다.

```js
import "./index.css";
```

가령, 위와 같이 css파일을 import하는데 적절한 로더를 제공하지 않으면 웹팩에서 적절한 로더를 제공해달라는 오류가 발생한다.

css는 CSS 로더를 설치하여 웹팩 설정에 추가해줄 수 있다.

```
~$ yarn add --dev css-loader
```

`rules`의 값으로 객체 배열을 전달한다. `test`는 로더를 적용할 파일 유형, `use`는 해당 파일에 적용할 로더 이름을 제공한다.

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["css-loader"],
    },
  ];
}
```
