/*
 * @Author: Kris 
 * @Date: 2019-04-22 12:06:17 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-23 19:45:52
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product           = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data : {
        listParam : {
            keyword : _mm.getUrlParam('keyword') || '',
            categoryId :  _mm.getUrlParam('categoryId') || '',
            orderBy : _mm.getUrlParam('orderBy') || 'default',
            pageNum : _mm.getUrlParam('pageNum') || 1,
            pageSize : _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        //排序點擊事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if($this.data('type') === 'default') {
                //默認是active default
                if ($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加載頁面
            _this.loadList();
        })
    },
    // 加載list數據
    loadList : function(){
        var listParam = this.data.listParam;
        var listHtml = '';
        var _this = this;
        var $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage : res.prePage,
                hasNextPage : res.hasNextPage,
                nextPage : res.nextPage,
                pageNum : res.pageNum,
                pages : res.pages,
            });
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加載分頁訊息
    loadPagination : function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function(){
    page.init();
})