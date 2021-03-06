const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsConfigPath = path.resolve(__dirname, './tsconfig.json');

const jsRoute = './frontend';

const jsPath = jsRoute + '/javascripts/';
const cssPath = jsRoute + '/stylesheets/';
const htmlPath = jsRoute + '/html/';

const tsx = [jsPath + 'app.tsx'];

console.log(__dirname);

console.log(path.resolve(__dirname, './tsconfig.json'));

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  // entry file
  entry: {
    main: [...tsx],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
    publicPath: './',
    pathinfo: false,
  },

  resolve: {
    extensions: ['.jsx', '.sass', '.scss', '.css', '.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfigPath })],
  },

  plugins: [
    new HtmlWebpackPlugin({
      //    hash : true,
      filename: 'test.ejs',
      chunks: ['main'], // entry에서 해당 리스트만 포함
      template: htmlPath + 'index.html',
    }),

    new CleanWebpackPlugin({
      protectWebpackAssets: true,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      linkType: 'text/css',
    }),

    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          //"style-loader",
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: { url: true },
          },

          {
            loader: 'resolve-url-loader',
            options: { removeCR: true },
          },

          {
            loader: 'sass-loader',
            options: {
              webpackImporter: true,
              //additionalData: `@import "./frontend/stylesheets/style.scss";`,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
