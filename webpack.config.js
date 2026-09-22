const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const root = (file) => path.resolve(__dirname, file);

module.exports = {
  entry: {
    app: [root('src/app.scss'), root('src/assets/js/app.js')],
  },
  output: {
    path: root('public'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'app.css' }),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  devtool: false,
};
