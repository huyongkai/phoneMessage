var app=getApp();

Page({   

  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo:[],
    showListArtical:[],
    username:''
  },

  
onLoad: function (options){
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
        username:that.data.username
      },
      success: function (res) {
        console.log("获取用户信息成功")
        console.log(res.result.data)
        that.setData({
          userInfo: res.result.data[0]
        })
        console.log(that.data.userInfo)
        that.getshowListArtical()
      },
      fail: function () {
        console.log("获取用户信息失败")
      }
    })
},



getshowListArtical:function(){
  for (var tem in this.data.userInfo.userArtical) {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'articalList',
        articalID: that.data.userInfo.userArtical[tem]
      },
      success: function (res) {
        console.log("查询文章成功后返回的结果")
        console.log(res.result.data[0])
        var mydata = that.data.showListArtical
        mydata.push(res.result.data[0])
        that.setData({
          showListArtical: mydata
        })
      }
    })
  }
},








onPullDownRefresh: function () {
  this.setData({
    userInfo: [],
    showListArtical: []
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




nav:function(e){
  console.log("输出当前id的值")
  var articalID = this.data.showListArtical[e.currentTarget.id]._id
  console.log(articalID)
  console.log(e.currentTarget.id)
  wx.navigateTo({
    url: '/pages/talke-artical/talke-artical?articalID=' + articalID,
  })
}




})