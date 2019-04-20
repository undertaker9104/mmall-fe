/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:53:31 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-20 15:41:50
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
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
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password       : $.trim($('#password').val()),
                passwordNew       : $.trim($('#password-new').val()),
                passwordConfirm    : $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    validateForm : function(formData) {
        var result = {
            status : false,
            msg : ''
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '舊密碼不能為空';
            return result;
        }
        if (!formData.password || formData.password.length < 6) {
            result.msg = '舊密碼長度不能少於6位';
            return result;
        }
        if (!_mm.validate(formData.passwordNew, 'require')) {
            result.msg = '新密碼不能為空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密碼長度不能少於6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '兩次輸入密碼不一致';
            return result;
        }
        //通過驗證之後返回正確提示
        result.status = true;
        result.msg = '驗證通過';
        return result;
    }
};

$(function(){
    page.init();
});
