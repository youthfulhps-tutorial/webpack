// webpack.config.js
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ { loader: MiniCssExtractPlugin.loader }, "css-loader" ]
      }
    ]
  },
  plugins: [ new MiniCssExtractPlugin() ],
}