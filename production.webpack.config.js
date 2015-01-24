var config = require('./webpack.config.js');

config.entry = './src/js/main.js';
config.module.loaders[0].loader = 'jsx';

module.exports = config;
