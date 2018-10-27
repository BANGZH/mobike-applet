// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphone:null,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userphone: options.userphone
    })
    // console.log(this.data.userphone);
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
    wx.request({
      url: 'http://127.0.0.1:8080/user/search/1',
      header: header,
      data: { userPhone: that.data.userphone},
      success: function (res) {
     
        if (res.data.code == 1) {
          that.setData({
            list: res.data.data.list
          });

        }
        else {
          console.log(res.data);
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
  chargeConfirm: function(e){
    var chargeamount = e.detail.value.inputmoney;
    console.log(chargeamount);
    var judge = /^\d+$/;
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    // console.log(judge.test(chargeamount));
    if(judge.test(chargeamount)){
      // console.log("充值成功");
      wx.request({
        url: 'http://127.0.0.1:8080/user/modify/balance/add/'+that.data.userphone,
        method:'GET',
        header:header,
        data: {money:chargeamount},
        success:function(res){
            if(res.data.code == 1){
              wx.request({
                url: 'http://127.0.0.1:8080/user/search/1',
                header: header,
                data: { userPhone: that.data.userphone},
                success: function (res) {
                  console.log(res.data.data);
                  if (res.data.code == 1) {
                    that.setData({
                      list: res.data.data.list
                    });
                    // console.log(that.data.list)
                  }
                  else {
                    // console.log(res.data);
                  }
                }
              })
            }
            wx.showToast({
              title: '充值成功',
            })
        }
      })
    }
    else{
    wx.showModal({
      title: '提示',
      content: '请输入正确的金额',
    })
    }
  }
})