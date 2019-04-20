/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:53:31 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-20 14:22:56
 */
'use strict';
require('../common/header/index.js');
require('./index.css');
require('../common/nav/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var navSide = require('../common/nav-side/index.js');
var templateIndex = require('./index.string');
// 表單裡的錯誤提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){  
        $('.error-item').hide().find('.err-msg').text('');
    }
}

var page = {
    init : function() {
        this.onLoad();
    },
    onLoad : function() {
        // 初始化左側菜單
        navSide.init({
            name : 'user-center'
        })
        
        this.loadUserInfo();
    },
    // 加載用戶訊息
    loadUserInfo : function() {
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};

$(function(){
    page.init();
});
