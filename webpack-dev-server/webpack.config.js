const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
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
    plugins: [
      new HtmlWebpackPlugin({
        // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
        template: 'index.html',
      }),
    ],
  }
};
