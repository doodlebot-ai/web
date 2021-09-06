const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CSSExtract = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        compress: true,
        port: 9000,
        liveReload: true,
        static: "dist",
        allowedHosts: [
            "doodlebot.ai",
            "api.doodlebot.ai"
        ],
        devMiddleware: {
            writeToDisk: true,
        }
    },
    entry: ['./src/ts'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.ASSET_PATH || './',
    },
    resolve: {
        extensions: [".ts",".tsx",".js",".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,

                use: "babel-loader",
            },
            {
                test: /\.html$/,
                use:{
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [CSSExtract.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [CSSExtract.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new CSSExtract({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","index.html"),
            template: path.resolve('src/html/index.html'),
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","404.html"),
            template: path.resolve('src/html/404.html'),
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","app.html"),
            template: path.resolve('src/html/app.html'),
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","login.html"),
            template: path.resolve('src/html/login.html'),
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","demo.html"),
            template: path.resolve('src/html/demo.html'),
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","demo2.html"),
            template: path.resolve('src/html/demo2.html'),
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: path.resolve("dist","register.html"),
            template: path.resolve('src/html/register.html'),
            excludeChunks: ["app"],
        })
    ],
}