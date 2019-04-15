/*
 * @Author: Kris 
 * @Date: 2019-04-15 19:51:19 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-15 20:16:53
 */
require('./index.css');
var _mm = require('util/mm.js');
//通用搜尋
var header = {
    init : function() {
        this.bindEvent();
    },
    onload: function() {
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在則填到input框上面
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function() {
        var _this = this;
        //點搜索按鈕後提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //輸入enter能提交搜索
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        //如果提交的輸入框有keyword,正常跳轉到list頁面
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _mm.goHome();
        }
    }
};
header.init();