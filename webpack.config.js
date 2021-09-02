const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CssExtract = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        liveReload: true,
        writeToDisk: true,
    },
    entry: ['./src/html/index.html'],
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'static'),
        publicPath: process.env.ASSET_PATH || './',
    },
    resolve:{
        extensions: ['.ts','.tsx','.js'],
    },
    module: {
        rules: [{
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
                test: /\.css$/,
                use:[CssExtract.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new CssExtract({
            filename: "[name].css"
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/index.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/404.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/app.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/login.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/demo.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/demo2.html',
            attributes: true,
        }),
        new HTMLWebpackPlugin({
            template: 'src/html/register.html',
            attributes: true,
        })
    ],
}