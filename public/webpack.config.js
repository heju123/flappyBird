const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

function resolvePath(subdir) {
    return path.join(__dirname, ".", subdir);
}

module.exports = function(arg1, mode){
    var output = {
        entry : {},
        output: {
            path: __dirname + '/dist',
            publicPath : "/dist/",
            chunkFilename: '[name].[chunkhash].chunk.js'
        },
        resolve: {
            extensions: ['.js'],
            alias: {}
        },
        module: {
            rules: [
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
        optimization: {
            splitChunks: {
                chunks: 'initial', // 只对入口文件处理
                cacheGroups: {
                    vendor: {
                        test: /node_modules\//,
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    },
                    commons: {
                        test: /common\//,
                        name: 'commons',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: {
                name: 'manifest'
            }
        },
        plugins: [
            new cleanWebpackPlugin(['dist/**'],
                {
                    root: '',
                    verbose: true,
                    dry: false
                }),
            // keep module.id stable when vender modules does not change
            new webpack.HashedModuleIdsPlugin()
        ]
    };

    output.entry.app = __dirname + '/src/js/main.js';
    output.devtool = "source-map";
    output.output.filename = "[name].[chunkhash].js";
    output.resolve.alias['@'] = resolvePath('src');

    if (mode.mode == "production")
    {
        output.devtool = "cheap-module-source-map";
        output.optimization.minimize = true;
    }

    output.plugins.push(new htmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyCSS: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    }));

    output.plugins.push(new copyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        {from: 'src/maps', to: 'maps'}
    ]));

    return output;
};