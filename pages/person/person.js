// pages/wallet/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userphone:null,
    ticket: 0,
    money: 0,
    list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        userphone:options.userphone
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
      var that = this;
      var header;
      header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    // console.log(wx.getStorageSync("sessionId"));
    wx.request({
      url: 'http://127.0.0.1:8080/user/search/1',
      header: header,
      data: { userPhone: that.data.userphone},
      success: function (res) {
        // console.log(res.data.data.list);
        if (res.data.code == 1) {
          that.setData({
           list: res.data.data.list

          });
          
        }
        else {
          // console.log(res.data);
        }
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

  },

  //  跳转到用户充值
  toBalance: function(e){
    var userphone = e.target.dataset.userphone;
      // console.log(userphone);
      wx.navigateTo({
        url: '../charge/charge?userphone='+userphone,
      })
  },

  // 跳转到押金界面
  toDeposit: function (e) {
    var userphone = e.target.dataset.userphone;
    // console.log(userphone);
    wx.navigateTo({
      url: '../deposit/deposit?userphone=' + userphone,
    })
  },

  // 跳转到行程记录界面
  toBill: function (e) {
    var userphone = e.target.dataset.userphone;
    wx.navigateTo({
      url: '../bill/bill?userphone=' + userphone
    })
  },
  
  //退出登录
  loginout: function(e){
    var userphone = e.target.dataset.userphone;
    // console.log(userphone);
    wx.showModal({
      title: '提示',
      content: '确认要退出登录吗？',
      success: function(sm){
          if(sm.confirm){
            wx.request({
              url: 'http://127.0.0.1:8080/mobike/loginout?'+userphone,
              method:'GET',
              success:function(res){
                
              }
            })
          }
      }
    })
  }
})