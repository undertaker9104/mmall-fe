/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:49:08 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-13 09:27:22
 */
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
//環境變量的配置, dev/online
var WEBPACk_ENV = process.env.WEBPACk_ENV || 'dev';
// 獲取html webpack plugin 參數的方法
var getHtmlConfig = function (name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
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
        ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if ('dev' ===  WEBPACk_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config; 