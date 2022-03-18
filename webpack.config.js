
const path = require('path');
const pkgs = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WEBPACK_SERVE = process.env.WEBPACK_SERVE;
const join = path.join;
const mode = WEBPACK_SERVE ? 'development' : 'production';

/** @type {import('webpack').Configuration} */
const common = {
  target: 'web',
  mode: mode,
  entry: './src/index.ts',
  optimization: {
    runtimeChunk: 'single'
  },
  output: {
    publicPath: `/`
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|gif|bmp)/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 关闭 CSS esModule,一定要写上,否则图片路径加载不了
              importLoaders: 1,
              esModule: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开发环境下开启 babel 缓存
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      cache: true,
      version: pkgs.version,
    }),
  ],
};

module.exports = common