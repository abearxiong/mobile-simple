
const path = require('path');
const pkgs = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WEBPACK_SERVE = process.env.WEBPACK_SERVE;
const join = path.join;
const mode = WEBPACK_SERVE ? 'development' : 'production';
const { ModuleFederationPlugin } = require('webpack').container;


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
    new ModuleFederationPlugin({
      filename: 'remoteEntry.js',
      remotes: {
        // 可以将其他项目的 name 映射到当前项目中
        // component: 'component@../component/js/remoteEntry.js',
        // "component": "component@http://localhost:3002/remoteEntry.js",
        // "admin": "admin@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        // 导出的模块，只有在此申明的模块才可以作为远程依赖被使用。
        './App': './src/App',
      },
      shared: {
        // 是非常重要的参数，制定了这个参数，可以让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM
        react: pkgs.dependencies['react'],
        lodash: pkgs.dependencies['lodash'],
        dayjs: pkgs.dependencies['dayjs'],
        'react-dom': pkgs.dependencies['react-dom'],
        'react-router-dom': pkgs.dependencies['react-router-dom'],
        // ahooks: '^2.10.9',
        // antd: {
        //   version: '^4.16.12',
        // },
      }
    })
  ],
};

module.exports = common