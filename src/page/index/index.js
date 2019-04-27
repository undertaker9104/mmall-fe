/*
 * @Author: Kris 
 * @Date: 2019-04-12 06:53:31 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-21 12:13:38
 */
'use strict';
require('../common/header/index.js');
require('../common/nav/index.js');
require('util/slider/index.js');
require('./index.css');
var navSide = require('../common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function() {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots : true,
    });
    //banner前一張跟後一張的事件綁定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
});