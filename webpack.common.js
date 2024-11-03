const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports={
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']            
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },

        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Flavors',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCSSExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              { from:'src/images',to:'images'}
            ],
          }),
    ]
};