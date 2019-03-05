// pages/orders/index.js
const WXAPI = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.id){
      this.setData({
        currentType: options.id
      })
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
    this.getOrderList()
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
  changeType:function(e){
    console.log(e);
    this.setData({
      currentType: e.target.dataset.id
    });
    this.getOrderList()
  },
  getOrderList:function(){
    let data={
      status:this.data.currentType,
      token:wx.getStorageSync('token')
    }
    WXAPI.orderList(data).then(res=>{
      if(res.code==0){
        this.setData({
          order: res.data.orderList,
          pics: res.data.goodsMap,
          hasOrder:true
        })
      }else{
        this.setData({
          order:"",
          hasOrder: false
        })
      }
      console.log(res)
    })
  }
})