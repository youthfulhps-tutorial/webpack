# webpack-config-merge

## 설정 병합

실행 모드에 따라 웹팩 설정을 다르게 할 수 있다. 조건문을 통해 `env.mode` 값에 따라 설정을 구분지을 수 있는 것인데, 실제로 설정을 아예 구분짓는 것을 권장한다.

웹팩 머지는 가령 `development`, `production` 에 대한 설정을 구분짓고자 할 때 만약 공통된 설정이 존재한다면 이를 각각 파일에 반복적으로 설정해주어야 할 것이다. 이때 웹팩 머지를 사용하면 효과적이다.

## 전략

`development`, `production` 에 대한 설정에서 공통적으로 존재하는 설정이 있다면, `common`으로 설정을 묶고 아래와 같이 웹팩 설정을 정리할 수 있다.

```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

만약, 웹팩의 `dev` 설정에서 `common` 설정을 가져와 병합하고 싶다면 아래와 같이 사용할 수 있다.

```js
// webpack.dev.js

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  ...
})
```

## Reference

[웹팩 핸드북, Webpack Merge
](https://joshua1988.github.io/webpack-guide/advanced/webpack-merge.html)
