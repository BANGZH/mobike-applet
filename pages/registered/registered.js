// pages/registered/registered.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userphone: null,
    vercode: null,
    userpid:null
  },
  
    // 记录输入的手机号码
  getinputphone: function (e) {
    this.data.userphone = e.detail.value;
    // console.log(e.detail.value);
  },
  //记录用户输入的身份证
  getuserpid:function(e){
      this.data.userpid = e.detail.value; 
  },

  //记录用户当前输入的验证码
  getinputcode: function (e) {
    this.data.vercode = e.detail.value;
    // console.log(this.data)
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
        else{
          var tip= res.data.mes;
          wx.showModal({
            title: '提示',
            content: tip,
          })
        }
      }
    })
  },

  // 确认注册
  goregistered: function (event) {
    // console.log(event.detail.value.userphone);
    var userphone = this.data.userphone
    var vercode = this.data.vercode;
    var pid = this.data.userpid;
    
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
            title: mes, 
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