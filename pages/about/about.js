// pages/about/about.js
const WXAPI = require('../../api/api.js')



const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    amounts:"",
    disCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    
    if(app.globalData.userInfo){
      
      this.setData({
        userInfo: app.globalData.userInfo
      })
     
      
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    
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
    WXAPI.myDiscount({status:0,token:wx.getStorageSync('token')}).then(res=>{
      if(res.code==0){
        this.setData({
          disCount:res.data.length,
          disCountData:res.data
        })
      }     
    })
    WXAPI.getAmount(wx.getStorageSync('token')).then(res => {
      console.log(res)
      if(res.code==0){
        this.setData({
          amounts:res.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.msg,
          success:function(res){
            if(res.confirm){
              wx.removeStorageSync('token');
              wx.redirectTo({
                url: '/pages/authorize/authorize',
              })
            }
          }
        })
        
      }
      
    }).catch(err=>{
      console.log(err)
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
  onGotUserInfo: function (res) {
    console.log(res)
  },
  goAmountDetail:function(){
    wx.navigateTo({
      url: '/pages/amount/amount-detail',
    })
  },
  goScoreDetail:function(){
    wx.navigateTo({
      url: '/pages/score/index',
    })
  },
  toOrder:function(e){
    console.log(e)
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/orders/index?id='+type,
    })
  },
  goDiscount:function(){
    wx.navigateTo({
      url: '/pages/discount/index'
    })
  }
})