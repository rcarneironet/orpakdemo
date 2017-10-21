let webpack = require('webpack');
let path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-cookies',
            'angular-ui-router',
            'angular-material',
            'angular-messages',
            'angular-sanitize',
            'angular-local-storage',
            'angular-busy',
            'angular-touch',
            'oclazyload'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        publicPath: '/assets',
        filename: 'app.bundle.js'
    }
    ,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
    devtool: 'source-map'
};
