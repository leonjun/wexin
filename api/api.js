const CONFIG=require('../config.js');
const BASE_URL = 'https://api.it120.cc';
const request = (url, method, data, needDomain)=>{
  let domain = needDomain ? '/' + CONFIG.subDomain :'' ;
  //console.log(domain)
  let urll = BASE_URL + domain +url;
  
  return new Promise((resolve,reject)=>{
    wx.request({
      url: urll,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: method,

      success: function (res) {
       
        resolve(res.data)
      },
      fail: function (res) {
        reject(res)
      },
      complete: function (res) { },
    })

  })
  
  
}
module.exports={
  // 登陆
  login:(data)=>{
    
    return request("/user/wxapp/login", "POST", data, true)
  },
  // 资产
  getAmount:(data)=>{
    return request("/user/amount", "GET", {token:data}, true)
  },
  // 检查token
  checkToken:(data)=>{
    return request("/user/check-token","GET",{token:data},true)
  },
  // 注册
  register: (data) => {
    return request('/user/wxapp/register/complex','post', data,true)
  },
  // 查询手机号归属地
  getMobile:(phone)=>{
    return request('/common/mobile-segment/location', 'GET', { mobile:phone},false)
  },
  // 获取所有收货地址
  getAllAddress:(token)=>{
    return request('/user/shipping-address/list','GET',token,true)
  },
  // 新增地址
  adAddress:(data)=>{
    return request('/user/shipping-address/add', 'POST', data, true)
  },
  // 地址详情
  getAddressDetail:(data)=>{
    return request('/user/shipping-address/detail','GET',data,true)
  },
  //更新地址
  updateAddress:(data)=>{
    return request('/user/shipping-address/update','POST',data,true)
  },
  //删除地址
  deleteAddress:(data)=>{
    return request('/user/shipping-address/delete','post',data,true)
  },
  //资金流水
  getCashLog:(data)=>{
    return request('/user/cashLog','post',data,true)
  },
  //提现申请
  applyCash:(data)=>{
    return request('/user/withDraw/apply','post',data,true)
  },
  //积分记录
  scoreRecord: (data) => {
    return request('/score/logs', 'post', data, true)
  },
  //banner
  bannerlist:(data)=>{
    return request('/banner/list','get',data,true)
  },
  //商品类别
  getGoodsCategory:(data)=>{
    return request('/shop/goods/category/all','get',data,true)
  },
  //商品列表
  getGoodsList:(data)=>{
    return request('/shop/goods/list','post',data,true)
  },
  //商品详情
  getGoodsDetail:(data)=>{
    return request('/shop/goods/detail','get',data,true)
  },
  myDiscount:(data)=>{
    return request('/discounts/my','get',data,true)
  },
  //订单列表
  orderList:(data)=>{
    return request('/order/list','post',data,true)
  },
  //下单
  createOrder:(data)=>{
    return request('/order/create','post',data,true)
  },
  //订单付款
  payorder:(data)=>{
    return request('/order/pay','post',data,true)
  },
  //订单关闭
  closeorder: (data) => {
    return request('/order/close', 'post', data, true)
  },
  //优惠券列表
  getDiscountList:(data)=>{
    return request('/discounts/coupons','get',data,true)
  },
  //领取优惠券
  getDiscount: (data) => {
    return request('/discounts/fetch', 'post', data, true)
  },
  //收藏商品
  collectGood:(data)=>{
    return request('/shop/goods/fav/add','post',data,true)
  },
  //收藏商品列表
  collectGoodList: (data) => {
    return request('/shop/goods/fav/list', 'post', data, true)
  },
  //检查收藏
  collectCheck: (data) => {
    return request('/shop/goods/fav/check', 'get', data, true)
  },
  deleteCollect:(data)=>{
    return request('/shop/goods/fav/delete','post',data,true)
  }
}