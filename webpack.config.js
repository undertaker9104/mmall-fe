/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:49:08 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-23 20:01:41
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
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
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
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表頁')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品詳情頁')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用戶登入')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用戶註冊')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密碼')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '個人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '個人中心修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '密碼修改')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作結果')),
    ]
};

if ('dev' ===  WEBPACk_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config; 