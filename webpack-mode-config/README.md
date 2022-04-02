# webpack-mode-config

## mode

웹팩 설정 중 `mode`는 웹팩의 실행 모드를 명시할 수 있다.

- `none`: 모드 설정 안함
- `development`: 개발 모드
- `production`: 배포 모드

`development` 시 웹팩 실행의 결과물이나 로그가 보여지고,
`production` 시 성능 최적화를 위해 기본적인 파일 압축, 트리-쉐이킹과 같은 빌드 과정이 추가된다.

웹팩 설정 파일에서 env를 매개변수로 전달받는 함수 구조로 변경하고, config 내부에서 `env`를
사용할 수 있다.

```js
//webpack.config.js

module.exports = (env) => {
  let entryPath =
    env.mode === "production" ? "./public/index.js" : "./src/index.js";

  return {
    entry: entryPath,
    output: {},
    // ...
  };
};
```

```json
//package.json

{
  "build": "webpack",
  "development": "npm run build -- --env.mode=development",
  "production": "npm run build -- --env.mode=production"
}
```
