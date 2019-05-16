const app = getApp();

Page({
  
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },

data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,

    listArtical: [],
    videoItem: []
},




getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
},
showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
},
hideModal(e) {
    this.setData({
      modalName: null
    })
},
tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
},

onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  wx.createVideoContext('id').requestFullScreen()
},











  onLoad: function () {
    this.getAllArticalList()
    this.getAllVideoList()
  },
  getAllArticalList: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'getAllArticalList'
      },
      success: function (res) {
        console.log("getAllArticalList success")
        console.log(res.result.data)
        that.setData({
          listArtical: res.result.data
        })
      },
      fail: function (res) {
        console.log("getAllArticalList fail")
      }
    })
  },
  getAllVideoList: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'getAllVideoList'
      },
      success: function (res) {
        console.log("getAllVideoList success")
        console.log(res.result.data)
        that.setData({
          videoItem: res.result.data
        })
      },
      fail: function (res) {
        console.log("getAllVideoList fail")
      }
    })
  },


  onPullDownRefresh: function () {
    this.setData({
      listArtical: [],
      videoItem: []
    })
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.getAllArticalList()
      that.getAllVideoList()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
  },




nav: function (e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var articalID = this.data.listArtical[id]._id
    wx.navigateTo({
      url: '/pages/talke-artical/talke-artical?articalID=' + articalID,
    })
},



navVideo:function(e){
  console.log(e.currentTarget.id)
  var id = e.currentTarget.id
  var videoID = this.data.videoItem[id]._id
  wx.navigateTo({
    url: '/pages/talke-video_details/talke-video_details?videoID=' + videoID,
  })
}
})