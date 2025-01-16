const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js', // Главный JS-файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Скомпилированный JS
    clean: true, // Очистка папки dist перед сборкой
  },
  module: {
    rules: [
      // Загрузка CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Загрузка изображений
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Главный HTML
    }),
  ],
  devServer: {
    static: './dist', // Папка для запуска dev-сервера
    port: 8080, // Локальный сервер по адресу http://localhost:8080
  },
  mode: 'development', // Режим разработки
};