//index.js
//获取应用实例
const WXAPI= require ('../../api/api.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  
  onLoad: function () {
    let token=wx.getStorageSync('token');
    WXAPI.bannerlist('token').then(res=>{
      console.log(res)
      if(res.code==0){
        this.setData({
          bannerlist:res.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.msg,
          showCancel:false
        })
      }
    })

    
   
    
  },
  
})
