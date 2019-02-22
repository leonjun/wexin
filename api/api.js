const CONFIG=require('../config.js');
const BASE_URL = 'https://api.it120.cc';
const request = (url, method, data, needDomain)=>{
  let domain = needDomain ? '/' + CONFIG.domain :'' ;
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
    return request("/user/amount", "GET", data, true)
  },
  checkToken:(data)=>{
    return request("/user/check-token","GET",data,true)
  },
  register: (data) => {
    return request('/user/wxapp/register/complex','post', data,true)
  }
}