// pages/registered/registered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userphone: null,
    vercode: null,
  },
  
    // 记录输入的手机号码
  inputphone: function (e) {
    this.data.userphone = e.detail.value;
    // console.log(e.detail.value);
  },

  // 点击获取验证码
  getcode: function () {
    var userphone = this.data.userphone;
    // console.log(userphone);
    wx.request({
      url: 'http://127.0.0.1:8080/user/register/requestSMS/' + userphone,
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '验证码发送成功',
          })
        }
      }
    })
  },

  // 确认注册
  goregistered: function (event) {
    // console.log(event.detail.value.userphone);
    var userphone = event.detail.value.userphone;
    var vercode = event.detail.value.vercode;
    var pid = event.detail.value.pid;
    
    wx.request({
      url: 'http://127.0.0.1:8080/user/register',
      method: 'POST',
      data: { 
        userPhone:userphone,
        sendVerificationCodeStr: vercode, 
        userPid:pid
        },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '注册成功',
            success:function(){
              wx.redirectTo({
                url: '../login/login',
              })
            }
          })
        }
        else{
          var mes = res.data.mes;
          wx.showToast({
            title: mes
            
          })
        }
      }
    })
  },

  // 返回登陆
  tologin:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  }

})