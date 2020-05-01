const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: ['@babel/polyfill', './server.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'api_server.js',
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
        fs: 'empty',
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            })
        ]
    },
    resolve: {
        extensions: ['.js', '.handlebars'],
    },
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [{ loader: "html-loader" }]
            },
            {
                test: /\.handlebars$/,
                use: [{ loader: "handlebars-loader" }]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {}
                    },
                    {
                        loader: "sass-loader",
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: ['server']
        })
    ]
}