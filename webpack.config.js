module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/js/main.js',
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'public/js/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.jsx?$/i, loader: 'react-hot!jsx' },
    ]
  },
};
