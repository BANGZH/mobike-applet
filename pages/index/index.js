Page({
  data: {
    markers: [{
      iconPath: "/resources/close.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/setup.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    userphone:null
  },
  // regionchange(e) {
  //   console.log(e.type)
  // },
  // markertap(e) {
  //   console.log(e.markerId)
  // },
  // controltap(e) {
  //   console.log(e.controlId)
  // },
  scanopen(){
    var that =this; 
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionId")//读取cookie
    };
    wx.scanCode({
      success:function(res){
          var code =res.result;
          console.log(code);
          wx.request({
            url: 'http://127.0.0.1:8080/rent/qrCord/'+code,
            method:"GET",
            header:header,
            success:function(res){
              console.log("saoma"+res.data)
              if(res.data.code == 1){
                  console.log(res.data.data.recordId);
                  wx.showModal({
                    title: '提示',
                    content: '开锁成功',
                    success:function(){
                      wx.navigateTo({
                        url: '../biking/biking?recordid=' + res.data.data.recordId + "&userphone=" + that.data.userphone,
                      })    
                    }
                  })
                  // wx.navigateTo({
                  //   url: '../biking/biking?recordid=' + res.data.data.recordId + "&userphone=" +that.data.userphone,
                  // })
              }
              else{
                var tip = "请检查你的账户信息"
                wx.showModal({
                  title: '提示',
                  content: tip,
                })
              }
            }
          })

      }
    }
    )
  },
  inputopen(){
    // var header;
    // header = {
    //   'content-type': 'application/x-www-form-urlencoded',
    //   'cookie': wx.getStorageSync("sessionId")//读取cookie
    // };
    // console.log(wx.getStorageSync("sessionId"));
    var that = this;
    wx.navigateTo({
      url: '../inputbikecode/inputbikecode?userphone='+that.data.userphone
    })
    
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      userphone: options.userphone
    })
  },

  toperson:function(){
    wx.navigateTo({
      url: '../person/person?userphone='+this.data.userphone,
    })
  }
})