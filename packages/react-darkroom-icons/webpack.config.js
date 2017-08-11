const webpack = require('webpack');

require('babel-core/register');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
        },
      },
    ]
  }
};
