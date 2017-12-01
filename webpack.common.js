const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './app/index.js'],
  },
  plugins: [
    new StyleLintPlugin({
      syntax: 'scss',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
