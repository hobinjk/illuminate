var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client.js'
  ],
  output: {
    path: path.resolve('./build/js'),
    publicPath: '/public/js/',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 version'},
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: 'true'
      }
    })
  ],
  devtool: 'eval'
};

module.exports = webpackConfig;
