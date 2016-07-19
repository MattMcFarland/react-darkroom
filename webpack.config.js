const webpack = require('webpack');

require('babel-core/register');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/examples/kitchensink.js'
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  output: {
    path: 'example',
    publicPath: '/',
    filename: '/js/container.js'
  },
  devServer: {
    contentBase: './example',
    hot: true
  }
};
