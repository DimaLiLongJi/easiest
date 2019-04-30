const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
  entry: {
    app: env === 'testjs' ? './loader-demo/index.js' : './loader-demo/index.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  // devtool: 'inline-source-map',

  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx',
    ],
    alias: {
      '@indiv': path.resolve(__dirname, 'packages'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [{
      test: [
        /\.js$/, /\.jsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'dynamic-import-webpack',
          ],
        },
      }, {
        loader: path.resolve(__dirname, 'packages/indiv-loader/build/index.js'),
        options: {
          useTypeScript: false,
        },
      },
      ],
    },
    {
      test: [
        /\.ts$/, /\.tsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              'dynamic-import-webpack',
            ],
          },
        },
        'awesome-typescript-loader',
        {
          loader: path.resolve(__dirname, 'packages/indiv-loader/build/index.js'),
          options: {
            useTypeScript: true,
            templateRootPath: './loader-demo/components',
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      ],
    }, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      'less-loader',
      ],
    },
    ],
  },
});
