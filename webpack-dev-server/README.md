# webpack-dev-server

## webpack-dev-server

webpack의 개발 환경에서 빠른 실시간 리로드 기능을 갖춘 개발 서버로서
코드 수정 이후 웹팩 명령어를 실행하지 않아도 빌드한 후 브라우저를 새로고침해주는
웹팩 기반의 개발에서 필수적인 기능이다.

기존 웹팩 빌드와는 달리 빌드한 결과물을 디스크에 저장하지 않는
메모리 컴파일을 사용하기 때문에 프로젝트 폴더에 추가되지 않지만, 컴파일 속도가 빨라진다.

최종적으로 개발을 완료한 뒤 웹팩 명령어를 통해 결과물을 산출한다.

## 설치

```
~$ yarn add --dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

## 스크립트 추가

```
{
  "scripts:": {
    ...
    "dev": "webpack serve"
  }
}
```

## webpack 설정

webpack-dev-server는 webpack.config.js에 설정을 추가하는 것으로 간단하게 사용할 수 있다.

**devServer**

```js
//webpack.config.js
...
devServer: {
  static: {
    //디렉토리에서 정적 파일을 제공하기 위한 옵션, 비활성화 하려면 false,
    //assets을 제공한다면, ['assets']
    directory: path.join(__dirname, 'public'),
  },

  open: true,
  //포트 번호, 'auto'로 설정할 시 자동 포트 번호 설정
  port: 9000
}
```

## HTMLWebpack 플러그인

HTMLWebpack 플러그인을 사용하면 번들링된 자바스크립트 파일을 html 파일에 자동 추가해주는 기능을 한다.

```js
//webpack.config.js

plugins: [
  new HtmlWebpackPlugin({
    // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
    template: 'index.html',
  }),
],
```

## 프록시 설정

별도의 API 백엔드 개발 서버가 있고 동일한 도메인에서 API 요청을 보내려는 경우 일부 URL을 프록시하는 것이 편리하다. 로컬 개발 환경에서 CORS와 같은 이슈를 우회하기 위한 방법 중 하나이다.

```js
//webpack.config.js

devServer: {
  static: {
    directory: path.join(__dirname, 'public'),
  },
  open: true,
  port: 'auto',
  proxy: {
    //IP 주소로 되어 있는 경우
    '/todos': 'http://localhost:5500',
    //가상 이름의 도메인으로 되어 있는 경우
    '/api': {
      target: 'domain.com',
      changeOrigin: true
    }
  },
},
```

## Reference

[PoiemaWeb, Webpack DevServer](https://poiemaweb.com/devServer)
[웹팩 핸드북, Webpack Dev Server](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server)
