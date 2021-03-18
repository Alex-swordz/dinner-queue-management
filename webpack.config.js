/**
 * Created by alex on 2021-03-08.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./app/view/assets/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'app/static/dist/'),
    publicPath: '/static/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ['ts-loader'] }, 
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] }, 
      { test: /\.(less|css)$/, use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader'}]
      }, 
      { test: /\.(png|svg|jpeg|jpg|gif)$/, use: [
        { loader: 'file-loader', options: { outputPath: 'images/', publicPath: '/static/dist/images'}
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx']
  }
};
