/*
 * @Author: Kris 
 * @Date: 2019-04-14 16:24:24 
 * @Last Modified by: Kris
 * @Last Modified time: 2019-04-14 16:29:58
 */
var _mm = require('util/mm.js');

var _cart = {
    // 獲取購物車數量
    getCartCount : function(resolve, reject) {
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error : reject
        });
    },
}
module.exports = _cart;