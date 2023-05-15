const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'json-loader'
                }]
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: '' },
            ],
        }),
    ],
    resolve: {
        extensions: ['.js']
    }
};
