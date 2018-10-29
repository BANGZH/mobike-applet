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

  // 获取用户输入的手机号码
  getinputphone: function(e){
      this.data.userphone = e.detail.value;
  },

  // 获取用户输入的验证码
  getinputcode: function(e){
    this.data.vercode = e.detail.value;
  },

  // 获取验证码
  getcode:function(){
    var userphone = this.data.userphone;

    wx.request({
      url: 'http://127.0.0.1:8080/user/login/requestSMS/'+userphone,
      method:'GET',
      data:{},
      success:function(res){
        console.log("ddd"+res);
        // console.log(res.data);
        if(res.data.code == 1){
            wx.showToast({
              title: '验证码发送成功',
            })
        }
      }
    })
  },

  // 确认登陆验跳转
  gologin:function(event){
    var that = this;
    var userphone = that.data.userphone;
    var vercode = that.data.vercode;
    wx.request({
      url: 'http://127.0.0.1:8080/user/login/' + userphone,
      method:'POST',
      data: { sendVerificationCodeStr:vercode},
      success:function(res){
        if(res.data.code == 1){
          wx.setStorageSync("sessionId", res.header["Set-Cookie"].slice(0, -18));
          wx.showToast({
            title: '登陆成功',
          })
          wx.redirectTo({
            url: '../index/index?userphone='+userphone,
          })
        }
        else{
          var tip = res.data.message;
          wx.showModal({
            title: '提示',
            content: tip,
          })
        } 
      }
    })
  },

  // 显示用户手机验证码
  showver:function(){
    console.log(this.data.userphone+"验证码"+this.data.vercode);
  },

  
  getvercode2:function(){
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

})