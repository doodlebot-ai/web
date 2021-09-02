const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const css_extract = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        compress: true,
        port: 9000,
        liveReload: true,
        static: 'static',
        allowedHosts: [
            "doodlebot.ai",
            "api.doodlebot.ai"
        ],
        devMiddleware: {
            writeToDisk: true,
        }
    },
    entry: {
        main: "./src/ts/main.tsx",
        app: "./src/ts/app.tsx",
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'static'),
        publicPath: process.env.ASSET_PATH || './',
    },
    module: {
        rules: [{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,

                use: [
                    {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
                        plugins: ["@babel/transform-typescript",
                        "@babel/transform-runtime",
                        "@babel/proposal-object-rest-spread"],
                    }

                }]
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
                use:[css_extract.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new css_extract(),
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: 'src/html/index.html',
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: "404.html",
            template: 'src/html/404.html',
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: "app.html",
            template: 'src/html/app.html',
        }),
        new HTMLWebpackPlugin({
            filename: "login.html",
            template: 'src/html/login.html',
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: "demo.html",
            template: 'src/html/demo.html',
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: "demo2.html",
            template: 'src/html/demo2.html',
            excludeChunks: ["app"],
        }),
        new HTMLWebpackPlugin({
            filename: "register.html",
            template: 'src/html/register.html',
            excludeChunks: ["app"],
        })
    ],
}