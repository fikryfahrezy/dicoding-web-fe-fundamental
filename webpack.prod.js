const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/index.js',
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackTagsPlugin({ tags: ['styles.css'], append: true }),
    new webpack.EnvironmentPlugin({
      TIME: Date.now(),
    }),
  ],
});
