/*
 * @Author: Kris 
 * @Date: 2019-04-16 07:17:30 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-16 07:36:53
 */
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    $element = $('.' + type + '-success');
    //顯示對應的提示
    $element.show();
})