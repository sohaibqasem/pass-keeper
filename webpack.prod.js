var path = require('path');
var webpack = require('webpack');
var {merge} = require('webpack-merge');
var common = require('./webpack.common');

module.exports = merge(common, {
    mode:"production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ]
});