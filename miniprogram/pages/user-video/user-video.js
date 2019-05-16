var app = getApp();



Page({
 
  data: {
   
    showListVideo: [],
    userInfo: [],
    username: ''
  },




onLoad: function (options) {
    console.log("输出options的值")
    console.log(options.username)
    this.setData({
      username: options.username
    })
    this.getUserInfo()      
},



getUserInfo: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'checkUsername',
        username: that.data.username
      },
      success: function (res) {
        console.log("获取用户信息成功")
        console.log(res.result.data)
        that.setData({
          userInfo: res.result.data[0]
        })
        console.log(that.data.userInfo)
        that.getshowListVideo()
      },
      fail: function () {
        console.log("获取用户信息失败")
      }
    })
},




getshowListVideo: function () {
  for (var tem in this.data.userInfo.userVideo) {
      var that = this
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type: 'videoList',
          videoID: that.data.userInfo.userVideo[tem]
        },
        success: function (res) {
          console.log("查询视频成功后返回的结果")
          console.log(res.result.data[0])
          var mydata = that.data.showListVideo
          mydata.push(res.result.data[0])
          that.setData({
            showListVideo: mydata
          })
        }
      })
    }
},




onPullDownRefresh: function () {
    this.setData({
      showListVideo: [],
      userInfo: [],
    })
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.getUserInfo()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
},







})