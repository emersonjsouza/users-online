const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/client/index.js')],
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/public')
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    { 
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }]
  },
  plugins: [
    new HWP(
      {
        inject: false,
        template: path.join(__dirname, '/public/index.html')
      }
    )
  ],
  devServer: {
    port: 3001,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  devtool: 'source-map'
}