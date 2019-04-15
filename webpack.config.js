/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:49:08 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-16 07:20:15
 */
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
//環境變量的配置, dev/online
var WEBPACk_ENV = process.env.WEBPACk_ENV || 'dev';
// 獲取html webpack plugin 參數的方法
var getHtmlConfig = function (name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title : title,
        inject : true,
        hash : true,
        chunks : ['common', name]
    }
}

// webpack-config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
        // 单独打包出CSS，这里配置注意下
        loaders: [{test: /\.css$/,loader: Ex.extract('style-loader', 'css-loader') },
                  {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
                  {test: /\.string$/,loader: 'html-loader'}
        ]
      },
    resolve: {
        alias: {
            util: __dirname + '/src/util',
            node_modules: __dirname + '/node_modules',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
        }
    },
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://www.hymall.site',
                changeOrigin : true
            }
        }
    },
    plugins: [
        // 獨立通用模塊到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css單獨打包到文件裡
        new Ex('css/[name].css'),
        // html模板的處理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首頁')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用戶登入')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作結果')),
    ]
};

if ('dev' ===  WEBPACk_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config; 