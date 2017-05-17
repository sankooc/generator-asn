const webpack = require('webpack');
const path = require('path');
const base = require('./webpack/base');
const port = require('config').port;
const devPort = require('config').devPort;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const src = 'web';

const config = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack/hot/only-dev-server',
      path.join(__dirname, `/${src}/script/index.js`),
    ],
    style: [
      'webpack/hot/dev-server',
      'webpack/hot/only-dev-server',
      path.join(__dirname, `/${src}/less/app.js`),
    ],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, `./${src}`)),
  ],
  devServer: {
    contentBase: `/${src}/www`,
    devtool: 'eval',
    hot: true,
    inline: true,
    proxy: {
      '/api/*': `http://localhost:${port}`,
    },
    port: devPort,
  },
  output: {
    filename: '[name].js',
  },
};

module.exports = Object.assign(config, base);
