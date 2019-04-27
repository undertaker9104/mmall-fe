/*
 * @Author: Kris 
 * @Date: 2019-04-23 20:03:06 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-27 10:32:48
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product           = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('mouseenter', 'p-img-item', function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        })

        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入購物車
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        
    },
    // 加載Detail數據
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 緩存detail的數據
            _this.data.detailInfo = res;
            // render
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘氣,找不到了</p>');
        });
    },
    // 數據匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(function(){
    page.init();
})