const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    clientLogLevel: 'none',
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:
        [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
});
