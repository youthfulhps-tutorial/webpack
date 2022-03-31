const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    a: "./src/a.js",
    b: "./src/b.js"
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 1,
        }
      }
    }
  }
}