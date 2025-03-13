const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const Dotenv = require('dotenv-webpack');
const { rspack } = require('@rspack/core');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'builtin:swc-loader',
        exclude: [/node_modules/],
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: 'movie',
      filename: 'movie.remoteEntry.js',
      exposes: {
        './movie': './src/movie',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new TsCheckerRspackPlugin({
      async: false,
    }),
    new Dotenv({
      path: `./.env`,
    }),
  ],
};
