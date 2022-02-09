var path = require('path');
var common = require('./webpack.common');
var {merge} = require('webpack-merge');

module.exports = merge(common, {
    mode:"development",
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
});