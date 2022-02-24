const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
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
            {
                test: /\.s[ac]ss$/i,
                use:['style-loader',{
                    loader: 'css-loader',
                },'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
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
        new webpack.HotModuleReplacementPlugin(),
    ],
}
