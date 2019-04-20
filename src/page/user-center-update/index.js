/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:53:31 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-20 14:55:17
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');
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
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
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
            name: 'user-center'
        });
        // 加载用户信息
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
    },
    validateForm : function(formData) {
        var result = {
            status : false,
            msg : ''
        };
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手機號格式不正確';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = 'email格式不正確';
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密碼提示問題不能為空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密碼提示問題答案不能為空';
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
