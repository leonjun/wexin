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
  
  login:(data)=>{
    
    return request("/user/wxapp/login", "POST", data, true)
  },
  getAmount:(data)=>{
    return request("/user/amount", "GET", {token:data}, true)
  },
  checkToken:(data)=>{
    return request("/user/check-token","GET",{token:data},true)
  },
  register: (data) => {
    return request('/user/wxapp/register/complex','post', data,true)
  },
  getMobile:(phone)=>{
    return request('/common/mobile-segment/location', 'GET', { mobile:phone},false)
  },
  getAllAddress:(token)=>{
    return request('/user/shipping-address/list','GET',token,true)
  },
  adAddress:(data)=>{
    return request('/user/shipping-address/add', 'POST', data, true)
  }
  
}