const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['react-hot-loader/patch', './src/index'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'static/js/[name].js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js|ts|)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|gif|eot|ttf|svg)$/,
                use: 'url-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
        new ErrorOverlayPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()],
            },
        }),
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