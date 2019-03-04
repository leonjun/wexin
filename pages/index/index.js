//index.js
//获取应用实例
const WXAPI= require ('../../api/api.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    activeId:0,
    page:1,
    pageSize:20,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  
  onLoad: function () {
    let _this=this
    let token=wx.getStorageSync('token');
    WXAPI.bannerlist(token).then(res=>{
      
      if(res.code==0){
        this.setData({
          bannerlist:res.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.msg,
          showCancel:false
        })
        return;
      }
    });
    WXAPI.getGoodsCategory(token).then(res=>{
      
      let categorys=[
        {
          id: 0, name: "全部"
        }
      ]
      if(res.code==0){
        for(let i=0;i<res.data.length;i++){
          categorys.push(res.data[i])
        }  
        this.setData({
          categorys: categorys,
          hasGood:true
        })
       
      }else if(res.code==700){
        this.setData({
          hasGood: false
        })
      } else{
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
        return;
      }
      _this.getGoods(0);
    })
    
  },
  getGoods: function (categoryId){
    let _this=this;
    let token = wx.getStorageSync('token');
    let data = {
      categoryId: categoryId,
      token: token,
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    WXAPI.getGoodsList(data).then(res => {
      console.log(res)
      if (res.code == 0) {
        _this.setData({
          allGoods: res.data,
          hasGood:true
        })
      } else if (res.code == 700) {
        this.setData({
          hasGood: false
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
      }

    })
  },
  changeCategory:function(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      activeId:id
    })
   
    this.getGoods(id);
    
  },
  toDetail:function(e){
    
    wx.navigateTo({
      url: '/pages/goods/goodsdetail?id=' + e.currentTarget.dataset.id,
    })
   
  },

})
