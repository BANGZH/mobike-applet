// pages/paybill/paybill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userphone:null,
      // recordid:null,
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      this.setData({
        // recordid: options.recordid,
        userphone: options.userphone
      })
      console.log(that.data.userphone)
      
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
    wx.request({
      url: 'http://127.0.0.1:8080/record/query/' + that.data.userphone,
      method: 'GET',
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            list: res.data.data
          })
          console.log(that.data.list)
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
  subpay:function(e){
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    var recordid = e.target.dataset.recordid; 
      console.log(e.target.dataset.recordid)
    console.log(that.data.list.recordExpense)
      wx.request({
        url: 'http://127.0.0.1:8080/record/pay/'+recordid,
        method:'GET',
        header:header,
        success:function(res){
          if(res.data.code == 1){
            wx.request({
              url: 'http://127.0.0.1:8080/user/modify/balance/cut/'+that.data.userphone,
              method:'GET',
              header:header,
              data: { money: that.data.list.recordExpense},
              success:function(res){
                if(res.data.code==1){
                  wx.showModal({
                    title: '提示',
                    content: '支付成功，返回主页',
                    success: function () {
                      wx.redirectTo({
                        url: '../index/index?userphone=' + that.data.userphone,
                      })
                    }
                  })
                }

              }
            })
            // wx.showModal({
            //   title: '提示',
            //   content: '支付成功，返回主页',
            //   success:function(){
            //     wx.redirectTo({
            //       url: '../index/index?userphone=' + that.data.userphone,
            //     })
            //   }  
            // })
          }
          else{
            var mes = res.data.message
              wx.showModal({
                title: '提示',
                content: mes,
              })
          }
        }
      })
  }
})