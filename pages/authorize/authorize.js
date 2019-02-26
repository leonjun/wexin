// pages/authorize/authorize.js
const WXAPI= require ('../../api/api.js')
const app=getApp();
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
  getUserInfo: function (e) {
    let _this = this;

    if (e.detail.userInfo) {

      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      _this.login()
    } else {

    }

  },

  login: function () {
    let _this = this;
    let token = wx.getStorageSync('token');
    console.log(token)
    if (token) {
      WXAPI.checkToken(token).then(res => {
        console.log(res)
        if (res.code != 0) {
          wx.removeStorageSync('token')
          _this.login();
        } else {

          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })

    } else {
      wx.login({
        success: res => {
          let data = {
            code: res.code,
            type: 2
          }

          WXAPI.login(data).then((res) => {
            console.log(res)
            if (res.code == 10000) {
              _this.registerUser();
              return;
            }
            if (res.code == 0) {
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('uid', res.data.uid)

              wx.navigateBack();
              _this.login()
            }
            if (res.code != 0) {
              return;
            }
          })
        }
      })
    }


  },
  registerUser: function () {
    let _this = this;
    wx.login({
      success: res => {

        let code = res.code;
        wx.getUserInfo({
          success: res => {

            let iv = res.iv;
            let encryptedData = res.encryptedData;
            WXAPI.register({
              iv: iv,
              code: code,
              encryptedData: encryptedData
            }).then(res => {
              _this.login();
            })
          }
        })
      }
    })
  }
})