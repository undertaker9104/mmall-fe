/*
 * @Author: Kris 
 * @Date: 2019-04-14 16:08:14 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-20 15:41:37
 */
var _mm = require('util/mm.js');

var _user = {
    // 登出
    logout : function(resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //檢查登入狀態
    checkLogin : function(resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //用戶登入
    login : function(userInfo, resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //檢查用戶名
    checkUsername : function(username, resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            data : {
                type : 'username',
                str : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 得到密碼提示問題
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 檢查密碼提示問題答案
    checkAnswer : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更改新密碼
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 獲取用戶訊息
    getUserInfo : function(resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //更新個人訊息
    updateUserInfo : function(userInfo, resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,  
            error   : reject
        });
    },
    //更改密碼
    updatePassword : function(userInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,  
            error   : reject
        });
    },
    //註冊
    register : function(userInfo, resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
    
}
module.exports = _user;