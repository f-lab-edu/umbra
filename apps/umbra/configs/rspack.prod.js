const { rspack } = require('@rspack/core');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./rspack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: 'bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  // optimization: {
  //     minimize: true,
  //     minimizer: [
  //         new TerserPlugin(),
  //         new CssMinimizerPlugin(),
  //     ],
  // },
});
