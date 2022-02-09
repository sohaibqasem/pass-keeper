var path = require('path');

module.exports = {
    entry: './src/app.ts',
    target: "node",
    resolve: {
        extensions: ['.ts', '.js'], //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    },
}