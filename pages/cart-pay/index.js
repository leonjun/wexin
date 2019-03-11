// pages/cart/cart.js
const WXAPI = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount: 0,
    moneys: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type:options.type
    })

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
    let lists=[];
    let _this = this;
    
    if (_this.data.type=='buynow'){
      lists = wx.getStorageSync('buynow');
    }else{
      lists = wx.getStorageSync('carts');
    }
    //let lists = wx.getStorageSync('carts');
    
    let count = 0, money = 0
    console.log(lists)
    if (lists) {
      for (let i = 0; i < lists.length; i++) {
        
        money += (lists[i].number) * (lists[i].minPrice);
        count += (lists[i].minScore) * (lists[i].number);
        
      }

      this.setData({
        cartlist: lists,
        iscart: true,
        discount: count,
        moneys: money
      })
    } else {
      this.setData({
        cartlist: "",
        iscart: false,
        discount: 0,
        moneys: 0
      })
    }

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
  createOrder:function(){
    let token= wx.getStorageSync('token')
    let goodsJsonStr=this.data.cartlist;
    goodsJsonStr= JSON.stringify(goodsJsonStr)
    
    let data={
      token: token,
      goodsJsonStr: goodsJsonStr
    }
    console.log(data)
    WXAPI.createOrder(data).then(res=>{
      if(res.code==0){
        wx.removeStorageSync('carts');
        wx.redirectTo({
          url: '/pages/orders/index',
        })
      }else{
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel:false
        })
      }
      console.log(res)
    })
  }
  
 
  
})