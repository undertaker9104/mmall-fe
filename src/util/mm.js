/*
 * @Author: Kris 
 * @Date: 2019-04-13 09:46:27 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-14 16:06:01
 */
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
}
var _mm = {
    //網路請求
    request : function(param) {
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res) {
                // 請求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 沒有登入,需要強制登入 
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 請求數據錯誤
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 獲取服務器地址
    getServerUrl : function(path) {
        return conf.serverHost + path;
    },
    // 獲取url參數
    getUrlParam : function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
            return result;
    },
    //成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },
    //錯誤提示
    errorTips: function(msg) {
        alert(msg || '哪裡出問題了~');
    },
    //字段的驗證,支持是否為空,手機,email
    validate : function(value, type) {
        var value = $.trim(value);
        //非空驗證
        if ('require' === type) {
            return !!value;
        }
        //手機號碼驗證
        if ('phone' === type) {
            return /^0\d{9}$/.test(value);
        }
        //email的驗證
        if ('email' === type) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        }
    },
    //統一登入
    doLogin : function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function() {
        window.location.href = './index.html';
    }
};
module.exports = _mm;