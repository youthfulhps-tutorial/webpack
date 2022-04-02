# webpack-tree-shaking

## tree-shaking

웹 애플리케이션의 크기가 과거에 비해 커졌다. 자바스크립트는 처리하는 데 파싱, 컴파일, 실행까지 많은 비용이 드는 리소스이다. 자바스크립트 엔진의 효율성을 개선하기 위한 작업이 지속적으로 이루어지고 있지만, 자바스크립트의 성능 향상 작업은 어디까지나 개발자의 몫이다.

**tree-shaking은 사용되지 않는 코드를 제거하는 기법을 의미한다.** 마치 나무를 흔들어 낙엽을 떨어뜨리는 작업을 연상할 수 있다.

애플리케이션을 제작하다보면 `import`를 활용하여 디펜던시를 가져온다. 개발이 진행됨에 따라 애플리케이션이 점점 커지고, 디펜던시도 같이 커지게 된다. 그리고 시간이 지날 수록 사용하지 않는 디펜던시가 제거되지 않는 경우도 발생한다. 그래서 `static import`가 등장.

```js
//import all
import utils from "utils";

//import only some
import { add, sum } from "utils";
```

필요한 메서드들만 `import`한 차이가 있다. dev 환경에서는 모든 모듈을 가져오기 때문에 변화가 없겠지만, 프러덕션 빌드에서는 명시적으로 가져오지 않는 es6 모듈들에 대해 `export`를 코드 제거하도록 웹팩을 구성하여 프러덕션 빌드를 작게 만들 수 있다.

## tree-shaking 가능 여부 판단

### 트리-쉐이킹은 ES 모듈에서만 가능하다.

ESM는 정적 모듈 구조를 가지고 있어 번들링을 하는 과정에서 분석을 통해 사용하지 않는 코드들을 가려낼 수 있다. 하지만, CommonJS에서 모듈을 가져오는데 사용되는 `require`의 경우 실행문 즉 런타임에 동작하기 때문에 어떤 방식으로 호출될지 구분하기 어려워 트리-쉐이킹을 할 모듈임을 평가하기가 어렵다.

바벨의 [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/)를 사용한다면 ES6 모듈을 자동으로 CommonJS로 변환한다. 이 과정에서 `import`가 `require`로 트랜스 파일링되기도 한다.

만약, 위와 같은 상황에서 트리-쉐이킹 조건에 부합하도록 하고자 한다면, `.babelrc`에서 CommonJS로 변환하지 못하도록 설정을 추가해주어야 한다.

```
//.babelrc

{
  "presets": [
    ["env", {
      "modules": false
    }]
  ]
}
```

### sideEffects를 명시하여 웹팩에게 트리-쉐이킹이 가능함을 암시한다.

사이드 이펙트가 발생하는 코드는 트리-쉐이킹 작업에서 제외된다. 사용되지 않더라도 외부의 변경을 발생시키는 함수나, 전역 함수를 사용한 경우(Object, Math..), 범위를 벗어나는 일을 하는 함수가 그 예시이다.

```js
let fruits = ["apple", "orange", "pear"];
console.log(fruits); // (3) ["apple", "orange", "pear"]

const addFruit = function (fruit) {
  fruits.push(fruit);
};

addFruit("kiwi");
console.log(fruits); // (4) ["apple", "orange", "pear", "kiwi"]
```

웹팩의 경우 `package.json`에 `sideEffects: false`로 지정하여 모듈의 부수효과가 없음을 전달할 수 있다.

```json
//package.json
{
  "name": "...",
  "version": "1.0.0",
  //false는 모듈 전체, ["./utils/utils.js"]와 같은 값은 특정 파일만 부수효과가 없음을 전달할 수 있다.
  "sideEffects": false
}
```

### tree-shaking 예제

[Webpack Tree Shaking Example](https://github.com/malchata/webpack-tree-shaking-example)

## Reference

[트리쉐이킹으로 자바스크립트 사이즈 줄이기](https://yceffort.kr/2021/08/javascript-tree-shaking)
