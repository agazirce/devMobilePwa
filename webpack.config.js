const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports= {
    entry: "./script.js",
    mode: process.env.NODE_ENV !== "production" ? "production" : "development",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, './sw.js'),
        }),
        new CopyPlugin({
            patterns: [
                { from: './manifest.webmanifest', to: './manifest.webmanifest' },
                { from: './script.js', to: './script.js' },
                { from: './images', to: './images' },
                { from: './GalerieRepos', to: './GalerieRepos' },
            ]
        }),
    ],
    devServer: {
        contentBase: "./dist",
    },
};