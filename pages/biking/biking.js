// pages/biking/biking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    clickBtn:false,
    clickBtn2:true,
    list:[],
    recordid:null,
    userphone:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      recordid:options.recordid,
      userphone:options.userphone
    })
    console.log("订单id"+ this.data.recordid)
    console.log("手机" + this.data.userphone)
    let h = 0;
    let m = 0;
    let s = 0;
    this.timer = setInterval(() => {
      this.setData({
        seconds: s++
      })
      if (s == 60) {
        s = 0;
        m++;
        setTimeout(() => {
          this.setData({
            minutes: m
          })
        }, 1000)
      }
      if (m == 60) {
        m = 0;
        h++;
        setTimeout(() => {
          this.setData({
            hours: h
          })
        }, 1000)
      }
    }, 1000) 
  },

  endride: function () {
    var that = this;
    clearInterval(this.timer);
    this.timer = "";
    this.setData({
      clickBtn: true,
      clickBtn2: false,
    })
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    wx.request({
      url:'http://127.0.0.1:8080/give/finsh/'+that.data.recordid,
      method:'GET',
      header:header,
      success:function(res){
        console.log(res.data);
        if(res.data.code ==1){
            wx.navigateTo({
              url: '../paybill/paybill?userphone=' + that.data.userphone,
            })
        }
      }

    })
    
  },

  toPay: function(){
      // var that = this;
      // var s = this.data.seconds;
      // var m = this.data.minutes;
      // var h = this.data.hours;  
      // wx.navigateTo({
      //   url: '../paybill/paybill?recordid='+that.data.userphone,
      // })
    
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
  // sss: function(){
  //   var that = this
  //   wx.request({
  //     url:'http://127.0.0.0:8080/finsh/' + that.data.recordid,
  //     method: 'GET',
  //     success: function (res) {
  //       console.log(res.data);
  //     }
  //   })
  // }
})