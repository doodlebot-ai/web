const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
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
    entry: ["./src/html/404.html",
    "./src/html/app.html",
    "./src/html/demo.html",
    "./src/html/demo2.html",
    "./src/html/index.html",
    "./src/html/login.html",
    "./src/html/register.html"],
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    // plugins: [
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/index.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/404.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/app.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/login.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/demo.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/demo2.html',
    //     }),
    //     new HTMLWebpackPlugin({
    //         template: 'src/html/register.html',
    //     })
    // ],
}