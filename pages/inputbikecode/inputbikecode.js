// pages/inputbikecode/inputbikecode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        list:[],
        userphone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userphone:options.userphone
    })
    console.log(this.data.userphone)

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

  openlock: function(e){
    var that = this;
    var bikecode = e.detail.value.bikeid;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    // console.log(wx.getStorageSync("sessionId"));
    wx.request({
      url: 'http://127.0.0.1:8080/rent/bikeCord/' + bikecode,
      header: header,
      success:function(res){
        // console.log(res.data.data);
            if(res.data.code == 1){
              that.setData({
                list:res.data.data
              })
              // console.log("sss"+that.data.list.recordId);
              wx.navigateTo({
                url: '../biking/biking?recordid=' + that.data.list.recordId + "&userphone="+that.data.userphone,
                // '../biking/biking?recordid=' + res.data.data.recordId + "&userphone=" + that.data.userphone,
              })
            }
            else{
                var tip = res.data.message;
                wx.showModal({
                  title: '提示',
                  content: '开锁失败,'+tip,
                })
            }
      }
    })



  }
})