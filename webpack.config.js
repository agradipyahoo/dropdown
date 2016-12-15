var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'lib');
var APP_DIR = path.resolve(__dirname, 'src');
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var config = {
  context:APP_DIR,
  entry: './index.js',
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
  devtool: 'source-map',
  externals:{
    'react':'React',
    'react-dom':'ReactDOM',
    'react-starter-components':'core',
    'react-starter-components':'components'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  plugins:[
    new ProgressBarPlugin()
  ]
};

module.exports = config;