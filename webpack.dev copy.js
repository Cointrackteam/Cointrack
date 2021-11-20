const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');;
const {ProvidePlugin, EnvironmentPlugin}= require('webpack');
let mode = "development";
if (process.env.NODE_ENV === 'production'){
    mode = "production"
}

module.exports = { 
    mode: mode,
    devServer: {
        static: "./dist",
        hot: true
    },
    entry: "./src/index.js",
    module: {
        rules:[
            {
                test: /\.(c[ac]|c)ss$/i,
                use: [
                    { 
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: ""} 

                    },
                    "css-loader",
                    "postcss-loader", 
                    "sass-loader"
                ] 
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", 
                }        
            },
            { 
                test: /\.(png|jpe?g|gif|svg|tiff|csv|mp4)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: ['.js', ".jsx"],
        fallback: {
            "assert": require.resolve("assert/"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve('buffer/'),
            // 'process': require.resolve('process/browser')
        }
        
    },
    devtool: 'source-map',
    plugins: [
        new ProvidePlugin({process: ['process/browser.js']}),
        new ProvidePlugin({Buffer: ['buffer', 'Buffer']}),
        new EnvironmentPlugin({}),
        new MiniCssExtractPlugin(),
        new ReactRefreshWebpackPlugin(),
    ]
    // target: ['node', 'web', 'es6' ],
}
