/*
 * @Author: Kris 
 * @Date: 2019-04-14 15:42:51 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-14 16:32:22
 */
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//導航
var nav = {
    init : function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function() {
        //登入點擊事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //註冊點擊事件
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        //退出點擊事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        
    },
    // 加載用戶訊息
    loadUserInfo : function() {
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg) {
            // do nothing
        });
    },
    // 加載購物車數量
    loadCartCount : function() {
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();