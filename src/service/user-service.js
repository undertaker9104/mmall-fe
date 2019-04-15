/*
 * @Author: Kris 
 * @Date: 2019-04-14 16:08:14 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-14 16:27:49
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
    }
}
module.exports = _user;