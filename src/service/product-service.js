/*
 * @Author: Kris 
 * @Date: 2019-04-14 16:08:14 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-24 19:50:27
 */
var _mm = require('util/mm.js');

var _product = {
    //請求產品數據
    getProductList : function(listParam, resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/product/list.do'),
            data : listParam,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //取得數據詳情
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
    
}
module.exports = _product;