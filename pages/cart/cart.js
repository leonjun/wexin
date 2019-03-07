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
   
    if (lists){
      for (let i = 0; i < lists.length; i++) {
       
        money += (lists[i].number) * (lists[i].minPrice) ;
        count += (lists[i].minScore) * (lists[i].number);
        lists[i].checked=true;
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
    
    let _this=this;
    let index =e.currentTarget.dataset.da;
    let list = _this.data.cartlist;
    
    let money =  (list[index].minPrice) + this.data.moneys;
    let max = list[index].stores;
    let count = (list[index].minScore) + this.data.discount;
    
    if (list[index].number<max){

      list[index].number++;
      this.setData({
        cartlist: list,
        moneys: money,
        discount: count
      });
      wx.setStorageSync("carts", list)
    }
    //count += this.data.discount;
    
  },
  minus:function(e){
   
    let _this = this;
    let index = e.currentTarget.dataset.da;
    let list = _this.data.cartlist;
    let money = this.data.moneys, count = this.data.discount
    if (list[index].number>1){
       money = this.data.moneys -  (list[index].minPrice);
      count = this.data.discount - (list[index].minScore);
    }
    
    list[index].number--;
    
    
    if (list[index].number<=1){
      list[index].number=1
    }
    
    this.setData({
      cartlist: list,
      moneys:money,
      discount:count
    });
    wx.setStorageSync("carts", list)
  },
  checkcart:function(e){
    console.log(e)
    
  },
  topay:function(){
    wx.navigateTo({
      url: '/pages/cart-pay/index',
    })
  }
})