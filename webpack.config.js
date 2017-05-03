const webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/src/dist/",
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
    },
    devServer: {
        host: "0.0.0.0",
        // hot: true,
        contentBase: './src',
        historyApiFallback: true
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin()
    ]
}