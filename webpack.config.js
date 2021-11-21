const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const API_URL = {
    production: JSON.stringify('https://builder.sleekfin.com/api/v1/'),
    development: JSON.stringify('https://builder-dev.sleekfin.com/api/v1/'),
    staging: JSON.stringify('https://builder.sleekfin.com/api/v1/'),
};

module.exports = {
    entry: ['react-hot-loader/patch', './src/index'],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|gif|eot|ttf|svg|mp3)$/,
                use: 'url-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            API_URL: API_URL[process.env.NODE_ENV],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
        new ErrorOverlayPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    devtool: 'cheap-module-source-map',
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
