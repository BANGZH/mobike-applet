// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      userphone:null,
      vercode:null,
  },

  // 获取用户输入的手机号码
  getinputphone: function(e){
      this.data.userphone = e.detail.value;
  },

  // 获取用户输入的验证码
  getinputcode: function(e){
    this.data.vercode = e.detail.value;
  },

 

  // 获取验证码
  getvercode:function(){
      var that = this;
      var userphone = that.data.userphone;
    wx.request({
      url: 'http://127.0.0.1:8080/user/login/requestSMS/' + userphone,
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res)
        // console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '验证码发送成功',
          })
        }
        else{
          var mes = res.data.message;
          wx.showToast({
            title: mes,
          })
        }
      }
    })
  },

  // 确认登陆跳转
  gologin2: function (event) {
    var that = this;
    var userphone = that.data.userphone;
    var vercode = that.data.vercode;
    wx.request({
      url: 'http://127.0.0.1:8080/user/login/' + userphone,
      method: 'POST',
      data: { sendVerificationCodeStr: vercode },
      success: function (res) {
        if (res.data.code == 1) {
          wx.setStorageSync("sessionId", res.header["Set-Cookie"].slice(0, -18));
          wx.showToast({
            title: '登陆成功',
          })
          wx.redirectTo({
            url: '../index/index?userphone=' + userphone,
          })
        }
        else {
          var tip = res.data.message;
          wx.showModal({
            title: '提示',
            content: tip,
          })
        }
      }
    })
  },

// 跳转至注册界面
  toRegistered:function(){
     wx.redirectTo({
       url: '../registered/registered',
     })
  }

})