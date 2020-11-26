const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports= {
    entry: "./script.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ],
    devServer: {
        contentBase: "./dist",
    },
};