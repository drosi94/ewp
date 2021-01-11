const path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'ewp.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    https: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin({
      root: '/dist',
      verbose: true,
    }),
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      fileame: '[name].bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/icons',
          to: 'icons',
        },
        {
          from: 'manifest.json',
          to: 'manifest.json',
        },
        {
          from: 'public/robots.txt',
          to: 'robots.txt',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://api.themoviedb.org/3.'),
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('https://kit.fontawesome.com.'),
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ],
  node: {
    fs: 'empty',
  },
};
