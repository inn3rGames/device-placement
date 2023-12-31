const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
        clean: true,
        publicPath: "",
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new MiniCssExtractPlugin(),
    ],
};
