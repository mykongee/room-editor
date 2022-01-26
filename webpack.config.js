const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// mode: process.env.NODE_ENV

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './client/index.js'],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'client'),
            publicPath: '/'
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
        },
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '/client/index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.(png|mtl|jpe?g|bin|obj|glb|gltf)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ], 
    }
}