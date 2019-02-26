// pages/address-add/index.js
const WXAPI = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    selectAddress:"请选择",
    addressCode:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let _this=this;
    if(options.id){
      let data={
        id:options.id,
        token:wx.getStorageSync('token')
      }
      WXAPI.getAddressDetail(data).then(res=>{
        console.log(res)
        if(res.code ==0){
          _this.setData({
            id: options.id,
            addressData:res.data,
           
            selectAddress:[
              res.data.provinceStr, res.data.cityStr
            ],
            addressCode:[
              res.data.provinceId, res.data.cityId
            ]
          })
        }
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
  cancle:function(){
    wx.navigateBack({ delta: 1})
  },
  bindSubmit:function(e){
    let code = e.detail.value.code;
    let linkMan = e.detail.value.name;
    let address = e.detail.value.detailAddress;
    let mobile = e.detail.value.phone;
    let provinceId, cityId //districtId
    if(this.data.addressCode){
      provinceId = this.data.addressCode[0];
      cityId = this.data.addressCode[1];
      //districtId = this.data.addressCode[2];
    }
    let token=wx.getStorageSync('token');
    console.log(e)
    let data={
      code: code,
      linkMan: linkMan,
      address: address,
      mobile: mobile,
      provinceId: provinceId,
      cityId: cityId,
      token: token
    }
    console.log(data)
    if (this.data.selectAddress == '请选择' || !code || !linkMan || !address || !mobile || !provinceId || !cityId){
      wx.showModal({
        title: '提示',
        content: '请填写完整',
      })
      return;
    }
    if(this.data.id){
      //更新
      data.id = this.data.id;
      
      WXAPI.updateAddress(data).then(res=>{
        console.log(res);
        wx.navigateBack({
          delta:1,
        })
      })
    }else{
      //新增
      WXAPI.adAddress(data).then(res => {
        console.log(res);
        if (res.code == 0) {
          wx.navigateBack({ delta: 1 })
        }else{
          
          wx.showModal({
            title: '提示',
            content: res.msg,
          })
        }
      })
    }
    
  },
  chagecity:function(e){

    console.log(e)
    
    this.setData({
      addressCode: e.detail.code,
      selectAddress:e.detail.value
    })
  },
  deleteAddress:function(){
    let id =this.data.id;
    let data ={
      id:id,
      token:wx.getStorageSync('token')
    }
    wx.showModal({
      title: '警告',
      content: '确定要删除吗？',
      success:function(res){
        if(res.confirm){
          WXAPI.deleteAddress(data).then(res => {
            if (res.code == 0) {
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showModal({
                title: 'ohhhh',
                content: res.msg,
              })
            }
          })

        }
      }
    })
    
  }
})