const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                test: /\.tsx?$/
            },
            {
                enforce: 'pre',
                loader: 'source-map-loader',
                test: /\.js$/
            }
        ]
    },
    output: {
        filename: 'main.js',
        library: 'mutera',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'umd'),
        umdNamedDefine: true
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        mainFields: ['main']
    }
};
