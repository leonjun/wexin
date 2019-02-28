// pages/score/index.js
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
    WXAPI.getAmount(token).then(res => {
      console.log(res)
      if (res.code != 0) {
        wx.showModal({
          title: '错误',
          content: '',
        })
      } else {
        this.setData({
          details: res.data
        })
      }
    });
    let data = {
      token: token,
      page: 1,
      pageSize: 50
    }
    WXAPI.scoreRecord(data).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          scorelist: res.data
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

  }
})