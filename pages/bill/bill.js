// pages/ bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphone: null,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userphone: options.userphone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId") //读取cookie
    };
    console.log(wx.getStorageSync("sessionId"));
    console.log(that.data.userphone)
    wx.request({
      url: 'http://127.0.0.1:8080/record/query',
      header: header,
      data: {
        recordUserPhone: that.data.userphone
      },
      success: function(res) {
        if (res.data.code == 1) {
          console.log("返回数组长度");
          if (res.data.data.length != 0){
            that.setData({
              list: res.data.data
            });
          }
          else{
            wx.showModal({
              title: '提示',
              content: '你还没有相关行程哦',
              success:function(){
                wx.redirectTo({
                  url: '../person/person?userphone=' + that.data.userphone
                })
              }
            })
            
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '查询失败',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  deleterecord:function(e){
    var recordid = e.target.dataset.recordid;
    var index = e.target.dataset.index;
    console.log(index);
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId") //读取cookie
    };
    console.log(wx.getStorageSync("sessionId"));
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单吗',
      success: function(sm){
        if(sm.confirm){
          wx.request({
            url: 'http://127.0.0.1:8080/record/remove/'+recordid,
            header: header,
            method:"DELETE",
            data: {},
            success: function (res) {
              if (res.data.code == 1) {
                console.log("删除成功");

                that.data.list.splice(index,1)
                that.setData({
                  list: that.data.list
                });
                // console.log(that.data.list.length);
                if(that.data.list.length == 0){
                    wx.redirectTo({
                      url: '../person/person?userphone='+that.data.userphone
                    })
                }
              } else {
                wx.showToast({
                  title: '删除失败',
                })
              }
            }
          })
        }        
      }
    })
  },

  // payrecord:function(){
  //   var userphone =   
    
  // }
  topay: function (e) {
    var recordid = e.target.dataset.recordid;
    var index = e.target.dataset.index;
    console.log(index);
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId") //读取cookie
    };
    console.log(wx.getStorageSync("sessionId"));
    wx.showModal({
      title: '提示',
      content: '确定要支付订单吗',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://127.0.0.1:8080/record/remove/' + recordid,
            header: header,
            method: "DELETE",
            data: {},
            success: function (res) {
              if (res.data.code == 1) {
                console.log("支付成功");

                that.data.list.splice(index, 1)
                that.setData({
                  list: that.data.list
                });
                // console.log(that.data.list.length);
                if (that.data.list.length == 0) {
                  wx.redirectTo({
                    url: '../person/person?userphone=' + that.data.userphone
                  })
                }
              } else {
                wx.showToast({
                  title: '支付失败',
                })
              }
            }
          })
        }
      }
    })
  }
})