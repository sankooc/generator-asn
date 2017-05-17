const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const moduler = {
  loaders: [{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    exclude: [nodeModulesPath],
  }, {
    test: /\.(png|jpg|ttf|svg|woff|woff2|eot)(\?v=\d\.\d\.\d)?$/,
    loader: 'url-loader?limit=8192',
  }, {
    test: /\.js$/,
    loaders: ['es3ify', 'babel-loader?presets[]=es2015&presets[]=stage-2'],
    exclude: [nodeModulesPath],
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    exclude: [nodeModulesPath],
  },
  { test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]' },
  { test: /\.json$/, loader: 'json-loader' },
  ],
};

const externals = {
  angular: 'angular',
  lodash: '_',
  reqwest: 'reqwest',
  moment: 'moment',
  'font-awesome': 'font-awesome',
};

const resolve = {
  extensions: ['', '.js', '.jsx', '.css', '.png', '.json', '.html'],
};

module.exports = {
  resolve,
  module: moduler,
  externals,
};
