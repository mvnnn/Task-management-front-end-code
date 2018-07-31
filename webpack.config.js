const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundled.js'
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.s?css$/,
            use: [
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }
          // {
          //   test: /\.css$/,
          //   use: ExtractTextPlugin.extract({
          //     fallback: "style-loader",
          //     use: "css-loader"
          //   })
          // }
        ]
      },
      
    plugins: [htmlPlugin,
      new MiniCssExtractPlugin({
        filename:"[name].css",
        chunkFilename:"[id].css"
        })]
  };