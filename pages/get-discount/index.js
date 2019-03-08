// pages/get-discount/index.js
const WXAPI = require('../../api/api.js');
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
    let data={
      token:wx.getStorageSync('token')
    }
    WXAPI.getDiscountList(data).then(res=>{
      console.log(res)
      if(res.code==0){
        this.setData({
          discountlist:res.data
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
  getdiscount:function(e){
    console.log(e)
    let id=e.currentTarget.dataset.id;
    let token=wx.getStorageSync('token');
    let data={
      id:id,
      token:token
    }
    WXAPI.getDiscount(data).then(res=>{
      console.log(res)
    })
  }
})