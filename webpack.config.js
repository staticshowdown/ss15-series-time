module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/js/main.jsx',
  ],

  output: {
    publicPath: 'public/js/',
    path: __dirname + '/public/js',
    filename: 'bundle.js',
  },

  externals: {
    "fb": "FB",
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },

  module: {
    loaders: [
      { test: /\.jsx?$/i, loader: 'react-hot!jsx' },
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
    ]
  },
};
