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
    publicPath: '/',
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
      name: 'umbra',
      remotes: {
        movie: 'movie@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
          eager: true,
        },
        'react-router': {
          singleton: true,
          requiredVersion: '^7.1.1',
          eager: true,
        },
        '@tanstack/react-query': {
          singleton: true,
          requiredVersion: '^5.62.11',
          eager: true,
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
