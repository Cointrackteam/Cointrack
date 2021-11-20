const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    module: {
        rules:[
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader", 
                    "postcss-loader", 
                    "sass-loader"
                ] 
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", 
                }        
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin(),
    ]
}
