const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const jsRoute = './frontend';

const imgPath = jsRoute + '/images/';
const jsPath = jsRoute + '/javascripts/';
const cssPath = jsRoute + '/stylesheets/';
const htmlPath = jsRoute + '/html/';

const imgs = glob.sync(imgPath + '*');
const js = [jsPath + 'app.js'];
const ts = [jsPath + 'app.ts'];

console.log(__dirname);

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  // enntry file
  entry: {
    main: ['@babel/polyfill', ...js],
    //main: [...ts],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
    publicPath: './',
    pathinfo: false,
  },

  resolve: {
    alias: {
      '@Component': path.resolve(__dirname, jsPath, 'view/component'),
      '@Style': path.resolve(__dirname, cssPath),
      '@Store': path.resolve(__dirname, jsPath, 'store'),
      '@Reducer': path.resolve(__dirname, jsPath, 'reducer'),
      '@Images': path.resolve(__dirname, jsPath, 'images'),
      '@View': path.resolve(__dirname, jsPath, 'view'),
    },
    extensions: ['.jsx', '.sass', '.scss', '.css', '.js'],
    //extensions: ['.jsx', '.sass', '.scss', '.css', '.tsx', '.ts', '.js'],
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
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.js/,
        include: [path.resolve(jsPath)],

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
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
