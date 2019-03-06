// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount:0,
    moneys:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    
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
    let lists=wx.getStorageSync('carts');
    let _this=this;
    let count=0,money=0
    console.log(lists)
    if (lists){
      for (let i = 0; i < lists.length; i++) {
        console.log((lists[i].count) * (lists[i].minPrice) + '+' + (lists[i].minScore) * (lists[i].count))
        money += (lists[i].count) * (lists[i].minPrice) ;
        count += (lists[i].minScore) * (lists[i].count);
      }
      
      this.setData({
        cartlist: lists,
        iscart:true,
        discount: count,
        moneys: money
      })
    }else{
      this.setData({
        cartlist: "",
        iscart: false,
        discount: 0,
        moneys: 0
      })
    }
    // wx.getStorage({
    //   key: 'carts',
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
    // wx.removeStorage({
    //   key:"carts",
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
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
  toindex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  plus:function(e){
    console.log(e)
  },
  minus:function(e){

  }
})