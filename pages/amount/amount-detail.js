// pages/amount/amount-detail.js
const WXAPI = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
    }
    WXAPI.getAmount(token).then(res=>{
      console.log(res)
      if(res.code !=0){
        wx.showModal({
          title: '错误',
          content: '',
        })
      }else{
        this.setData({
          details: res.data
        })
      }
    });
    let data={
      token: token,
      page: 1,
      pageSize: 50
    }
    WXAPI.getCashLog(data).then(res=>{
      if(res.code==0){
        this.setData({
          cashLogs:res.data
        })
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  recharge:function(){
    wx.showModal({
      title: '提示',
      content: '充值就算了',
    })
  },
  forCash:function(){
    wx.navigateTo({
      url: '/pages/cash/getcash',
    })
  },
  
  
})