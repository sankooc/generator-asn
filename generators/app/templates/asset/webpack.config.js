const webpack = require('webpack');
const path = require('path');
const base = require('./webpack/base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const src = 'web';

const config = {
  entry: {
    app: path.join(__dirname, `/${src}/script/index.js`),
    style: path.join(__dirname, `/${src}/less/app.js`),
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compressor: {
        warnings: false,
      },
    }),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, `./${src}`)),
  ],
  output: {
    path: 'build',
    filename: '[name].js',
  },
};

module.exports = Object.assign(config, base);
