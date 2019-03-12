// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount:0,
    moneys:0,
    hasCheck:false
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
       
        money += (lists[i].number) * (lists[i].minPrice) ;
        count += (lists[i].minScore) * (lists[i].number);
        
        
      }
      

      // let flag=lists.filter(item=>{
      //   if(item.checked=true){
      //     return item.checked;
      //   }
      // })
      // let flag=false
      // for (let i = 0; i < lists.length; i++){
      //   if(lists[i].checked=true){
      //     flag=true;
      //     break;
      //   }
      // }
      // if(flag){
      //   this.setData({
      //     hasCheck:true
      //   })
      // }else{
      //   this.setData({
      //     hasCheck:false
      //   })
      // }
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
    //console.log(this.data.hasCheck)
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
   
    let _this=this;
    console.log(e);
    let values = e.detail.value;
    let index = e.currentTarget.dataset.id;
    let lists=wx.getStorageSync('carts');
    lists[index].checked = lists[index].checked?false:true;

    console.log(lists[index].checked);
    wx.setStorage({
      key: 'carts',
      data: lists,
    })
    let newnew=[];
    let carts = wx.getStorageSync('checkcart');
    if (lists[index].checked){
      if(carts!=""){
        
      }
      newnew.push(lists[index]);
      wx.setStorage({
        key: 'checkcart',
        data: newnew,
      })
    }
    
    // let index=e.currentTarget.dataset.id;
    // let values=e.detail.value;
    // let lists = this.data.cartlist;

    // lists[index].checked= lists[index].checked?false:true;
    // console.log(values=="")
    // console.log(lists[index]);
    // let checkcart = wx.getStorageSync('checkcart');
    // let newcart=[];
    // if(values!=""){
    //   if(checkcart){
    //     newcart.push(lists[index]);
    //     newcart = [...newcart,...checkcart];
    //     console.log(11112312)
    //     console.log(newcart)
    //     wx.setStorage({
    //       key: 'checkcart',
    //       data: newcart,
    //     })
        
    //   }else{
    //     wx.setStorage({
    //       key: 'checkcart',
    //       data: lists[index],
    //     })
    //   }     
    // }else{
    //   if(checkcart){
    //     //newcart.push(lists[index]);
    //     newcart = [...newcart, checkcart];
    //     wx.setStorage({
    //       key: 'checkcart',
    //       data: newcart,
    //     })
    //   }else{
    //     wx.removeStorageSync('checkcart')
    //   }
      
    // }
    // console.log(lists)
    // wx.setStorage({
    //   key: 'carts',
    //   data: lists
    // })
    // if(values.length>=1){
    //   //有选中

    //   console.log(values)
    //   let newlist,ld=[];
    //   for (let i = 0; i < values.length;i++){
    //     newlist= lists.filter(item => {
    //       if (item.goodsId == values[i]){
    //         return Object.assign(item,{checked:true})
    //       }
          
    //       // return item.goodsId == values[i]
    //     });
    //     //newlist.checked=true;
    //     ld = [...ld, ...newlist];
        
    //   }
    //   _this.setData({
    //     hasCheck:true
    //   })
    //   console.log(lists)
    //   console.log(ld)
    //   wx.setStorage({
    //     key:'checkcart',
    //     data:ld
    //   })
      
    // }else{
      //无选中
      // lists.map(item=>{
      //   return item.checked=false
      // })
      // console.log(lists)
    //   _this.setData({
    //     hasCheck: false
    //   })
    //   wx.setStorage({
    //     key: 'carts',
    //     data: lists
    //   })
    //   wx.removeStorageSync('checkcart');
    //   console.log(2222222)
    // }
    //console.log(this.data.cartlist)
    
  },
  topay:function(){
    if(this.data.hasCheck){
      wx.navigateTo({
        url: '/pages/cart-pay/index?type=' +'checkcart',
      })
    }
    
  },
  
})