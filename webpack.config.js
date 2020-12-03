const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("Serviceworker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports= {
    entry: "./script.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, './sw.js'),
        }),
        new CopyPlugin([
            { from: "images", to: "images" },
            { from: "_headers", to: "./" },
            { from: "manifest.webmanifest", to: "./" },
            { from: "images.json", to: "./" },
        ]),
    ],
    devServer: {
        contentBase: "./dist",
    },
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
};