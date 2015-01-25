var config = require('./webpack.config.js');

config.entry = './src/js/main.jsx';
config.module.loaders[0].loader = 'jsx';

module.exports = config;
