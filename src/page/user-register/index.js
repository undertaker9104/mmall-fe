/*
 * @Author: Kris
 * @Date: 2019-04-12 06:52:34 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-18 20:29:09
 */

'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
// 表單裡的錯誤提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init : function() {
        this.bindEvent();
    },
    bindEvent : function() {
        var _this = this;
        //驗證名稱是否有重複
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            if (!username) {
                return;
            }
            //異步驗證
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            })
        })
        //按鈕按下submit
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按下enter,也提交
        $('.user-content').keyup(function(e){
            //keyCode 13-> 表示按下enter
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表單
    submit : function() {
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val()),
        },
        // 表單驗證結果
        validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //驗證成功
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        } else {
            //驗證失敗
            formError.show(validateResult.msg);
        }
    },
    //表單驗證
    formValidate : function(formData) {
        var result = {
            status : false,
            msg : ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用戶名不能為空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密碼不能為空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密碼長度不能少於6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '兩次輸入密碼不一致';
            return result;
        }
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