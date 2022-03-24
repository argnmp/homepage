const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const prod = process.env.NODE_ENV === 'production';

//const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, './babel.client.js'),
                    }
                }],
                exclude: /node_modules/
            },
            /*
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, './babel.client.js'),
                    }
                },'ts-loader'],
                exclude: /node_modules/
            },
            */
            {
                test: /\.s[ac]ss$/i,
                use:[prod==='development' ? style-loader : MiniCssExtractPlugin.loader,{
                    loader: 'css-loader',
                },'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader,{
                    loader: 'css-loader',
                }]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/', //for devleoping server+client /for webpack server delete this line / 이렇게 publicPath를 써주어야 제대로 jpg 파일이 연결됨.
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        port: 3000,
        hot: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new BundleAnalyzerPlugin(),
    ],
}
