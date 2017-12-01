const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/main.min.css',
    }),
    new WebpackRTLPlugin(),
  ],
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                sourceMap: true,
                importLoaders: 1,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  output: {
    filename: './scripts/main.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  stats: {
    children: false,
  },
});
