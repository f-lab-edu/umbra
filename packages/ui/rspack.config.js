const path = require('path');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');

const commonConfig = {
  mode: 'production',
  entry: './index.ts',
  experiments: {
    outputModule: true,
  },
  externals: {
    react: 'react',
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new TsCheckerRspackPlugin({
      async: false,
    }),
  ],
};

const cjsConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs.js',
    libraryTarget: 'commonjs2',
  },
};

const esmConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.esm.js',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
};

module.exports = [cjsConfig, esmConfig];
