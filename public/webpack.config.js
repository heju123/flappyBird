var compile_mode = "dev";

const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyJsPlugin = require('uglify-js-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

var devtool = "source-map";
var plugins = [];
plugins.push(new cleanWebpackPlugin(['dist/**'],
  {
    root: '',
    verbose: true,
    dry: false
  }));
plugins.push(new copyWebpackPlugin([
    { from: 'src/images', to: 'images' },
    {from: 'src/maps', to: 'maps'}
]));
if (compile_mode == "prod") {
  plugins.push(new uglifyJsPlugin({
    compress: true, //default 'true', you can pass 'false' to disable this plugin
    debug: true, //default 'false', it will display some information in console
    sourceMap: true
  }));
  devtool = "cheap-module-source-map";
}
//'E:\\git\\MediaManagementSuite\\Src\\App\\ContentCenter\\Web\\src\\libs\\mam'
module.exports = {
  entry: __dirname + '/src/js/main.js',
  output: {
      path: __dirname + '/dist',
      publicPath : "/dist/",
      filename: "app.js",
      chunkFilename: '[name].chunk.js'
  },
  devtool: devtool,  //生成source file
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }
    ]
  },
  plugins: plugins
};