const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileIncludeWebpackPlugin = require('file-include-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const path = require('path');

const jsPath = './src/';

const outputPath = './static';
const entryPoints = {
    index: jsPath + '/index.ts',
}

module.exports = {
    mode: 'development',
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: 'js/[name].js'
    },
    stats: {
        colors: true,
        errorDetails: true,
    },
    devServer: {
        open: true,
    },
    performance: {
        hints: false,
    },
    plugins: [
        new RemovePlugin({
            before: {
                test: [
                    {
                        folder: './static',
                        method: () => true
                    }
                ],
                exclude: [
                    './static/assets'
                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new FileIncludeWebpackPlugin({
            source: './src/ui/pages',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?[c]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/inline",
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
}