const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("Serviceworker-webpack-plugin");
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
    ],
    devServer: {
        contentBase: "./dist",
    },
};