// pages/deposit/deposit.js
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
    wx.request({
      url: 'http://127.0.0.1:8080/user/search/1',
      header: header,
      data: { userPhone:that.data.userphone},
      success: function (res) {
        // console.log(res.data.data.list.userPhone);
        console.log(res.data.data.list[0].userDeposit);
        // console.log(res.data.data.list.userPid);
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
  
  // 退押金
  backdeposit: function(e){
    var that = this;
    var userphone = e.target.dataset.userphone;
    console.log(userphone);
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    wx.showModal({
      title: '提示',
      content: '确认退押金吗？',
      header:header,
      success:function(sm){
          if(sm.confirm){
              wx.request({
                url: 'http://127.0.0.1:8080/user/modify/deposit/'+userphone,
                method:'GET',
                header:header,
                data:{
                  money:'0'
                  },
                success:function(res){
                      if(res.data.code == 1){
                          wx.showModal({
                            title: '提示',
                            content: '押金退还成功',
                          })
                        wx.request({
                          url: 'http://127.0.0.1:8080/user/search/1',
                          header: header,
                          data: { userPhone:userphone },
                          success: function (res) {
                            // console.log(res.data.data.list.userPhone);
                            // console.log(res.data.data.list[0].userDeposit);
                            // console.log(res.data.data.list.userPid);
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
                      }
                      else{
                        wx.showModal({
                          title: '提示',
                          content: '押金退还失败！请稍后再试',
                        })
                      }
                }
                
              })
          }
      }
    })
  },
  // 缴纳押金
  paydeposit:function(e){
    var that = this;
    var userphone = e.target.dataset.userphone;
    // console.log(userphone);
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    wx.showModal({
      title: '提示',
      content: '确认退押金吗？',
      header: header,
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://127.0.0.1:8080/user/modify/deposit/' + userphone,
            method: 'GET',
            header:header,
            data: { money: 199 },
            success: function (res) {
              if (res.data.code == 1) {
                wx.showModal({
                  title: '提示',
                  content: '押金支付成功',
                })
                wx.request({
                  url: 'http://127.0.0.1:8080/user/search/1',
                  header: header,
                  data: { userPhone:userphone },
                  success: function (res) {
                    // console.log(res.data.data.list.userPhone);
                    // console.log(res.data.data.list[0].userDeposit);
                    // console.log(res.data.data.list.userPid);
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
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '押金支付失败！请稍后再试',
                })
              }
            }

          })
        }
      }
    })
  }

})