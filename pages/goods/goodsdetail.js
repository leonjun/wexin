// pages/goods/goodsdetail.js
const WXAPI = require('../../api/api.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    number:0,
    cartdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    this.getDetail();
    this.checkCollect();
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
  getDetail:function(){
    var that = this;
    let data = {
      id: this.data.id,
      token: wx.getStorageSync('token')
    }
    WXAPI.getGoodsDetail(data).then(res => {
      console.log(res)
      if(res.code==0){
        this.setData({
          details:res.data
        })
        var article = res.data.content;
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    
  },
  changeS:function(e){
    console.log(e)
  },
  toCart:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  //添加购物车
  addcart:function(){
    let _this=this;
    console.log(this.data.details.basicInfo.id)
    let num = this.data.number;
    if(num<=0){
      wx.showModal({
        title: '错误',
        content: '请选择商品数量',
        showCancel:false
      })
      return;
    }
    let deta = this.data.details.basicInfo;
    let count = this.data.number;
    let data = [{
      goodsId: deta.id,
      categoryId: deta.categoryId,
      pic: deta.pic,
      name: deta.name,
      minPrice: deta.minPrice,
      minScore: deta.minScore,
      stores: deta.stores,
      number: count,
      checked:false
    }];
    let buydata=data;
    let id = this.data.details.basicInfo.id;
    let store = wx.getStorageSync('carts');
    
    if (store){
      let flag=true;

      let ss=store.map(item=>{
        if (item.goodsId==id){
          flag=false;

          item.number++;
          return Object.assign(item,{
            number: item.number++
          })
          
        }else{       
          return item;
        }
      })
      if(flag){
        data=[...data,...ss];
      }else{
        data = ss;
      }
    }else{
      
    }
    
   // let data = this.data.details;
    if (_this.data.isAddCart){
      wx.setStorage({
        key: 'carts',
        data: data,
        success:function(){
          _this.setData({
            isshow: false
          });
          wx.showToast({
            title: '加入购物车成功',
            success: function () {
              _this.setData({
                number: 0
              })
            }
          })
        }
      })
    }
    if (_this.data.isBuy) {
      wx.setStorage({
        key: 'buynow',
        data: buydata,
        success: function () {
          _this.setData({
            isshow: false
          });
          wx.navigateTo({
            url: '/pages/cart-pay/index?type=' + 'buynow',
          })
        }
      })
    }
    
    
    
  },
  toaddCart:function(){
    this.setData({
      isshow:true,
      isAddCart:true,
      isBuy:false
    })
  },
  buynow:function(){
    this.setData({
      isshow: true,
      isAddCart: false,
      isBuy: true
    })
  },
  close:function(){
    this.setData({
      isshow: false
    })
  },
  
  minu:function(e){
    let num = this.data.number;
    num--;
    if(num<=0){
      num=0;
    }
    this.setData({
      number: num
    })
  },
  plus:function(){
    let num=this.data.number;
    let max = this.data.details.basicInfo.stores;
    
    console.log(num);
    console.log(max);
    if (num < max) {
      console.log(1111)
      num++;
      
      this.setData({
        number: num
      })
    }  
  },
  checknum:function(e){
    let num = e.detail.value;
    let max = this.data.details.basicInfo.stores;
    
    if(num>max){
      num=max
    }
    this.setData({
      number:num
    })
  },
  focusnum:function(){
    this.setData({
      number:""
    })
  },
  checkCollect:function(){
    let data={
      goodsId:this.data.id,
      token:wx.getStorageSync('token')
    }
    WXAPI.collectCheck(data).then(res=>{
      this.setData({
        iscollect:res.data
      })
    })
  },
  collect:function(e){
    console.log(e.currentTarget.dataset.id)
    let goodsId = e.currentTarget.dataset.id;
    let data={
      goodsId: goodsId,
      token:wx.getStorageSync('token')
    }
    WXAPI.collectGood(data).then(res=>{
      console.log(res);
      if(res.code==0){
        this.setData({
          iscollect:"已收藏"
        })
      }
    })
  },
  canclecollect:function(e){
    
    let goodsId = e.currentTarget.dataset.id;
    let data = {
      goodsId: goodsId,
      token: wx.getStorageSync('token')
    }
    WXAPI.deleteCollect(data).then(res => {
     
      if (res.code == 0) {
        this.setData({
          iscollect: "未收藏"
        })
      }
    })
  }
})