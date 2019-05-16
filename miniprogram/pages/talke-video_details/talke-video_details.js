function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}


Page({
  data: {
    inputValue: '',
    videoID: '',
    videoCurrentTime: '',
    videoItem: [],
    danmuList: [],
    aboutVideoItem: []
  },


  onLoad: function (options) {

    console.log("开始检测user-video页面传递的值")
    console.log(options.videoID)
    this.setData({
      videoID: options.videoID
    })
    console.log(this.data.videoID)

    this.videoContext = wx.createVideoContext('myVideo')
    this.showVideo()
  },



  showVideo: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'showVideo',
        videoID: that.data.videoID
      },
      success: function (res) {
        console.log("显示视频内容成功")
        console.log(res.result.data[0])
        that.setData({
          videoItem: res.result.data[0],
          danmuList: res.result.data[0].videoTalke
        })
        console.log("显示复制后的数据")
        console.log(that.data.videoItem)
        console.log("显示弹幕列表")
        console.log(that.data.danmuList)
        that.showAboutVideoItem()
      },
      fail: function (res) {
        console.log("显示视频失败")
      }
    })
  },



  bindInputBlur(res) {
    this.data.inputValue = res.detail.value
  },


  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: getRandomColor()
    })
    this.saveDanmu()
  },



  saveDanmu: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'saveDanmu',
        videoID: that.data.videoID,
        text: that.data.inputValue,
        color: getRandomColor(),
        time: parseInt(that.data.videoCurrentTime)
      },
      success: function () {
        console.log("saveDanmu success")
        that.setData({
          inputValue: ''
        })
      },
      fail: function () {
        console.log("saveDanmu fail")
      }
    })
  },



  bindButtonRate(e) {
    let rate = e.currentTarget.dataset.rate
    this.videoContext.playbackRate(Number(rate))
  },


  currentTime(res) {
    console.log("显示当前时间")
    console.log(res.detail.currentTime)
    this.setData({
      videoCurrentTime: res.detail.currentTime
    })
  },





  showAboutVideoItem: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'showAboutVideoItem',
        videoLebal: that.data.videoItem.videoLebal,
        videoId: that.data.videoItem._id
      },
      success: function (res) {
        console.log("showAboutVideoItem返回的数据")
        console.log(res.result.data)
        console.log("showAboutVideoItem success")
        that.setData({
          aboutVideoItem: res.result.data
        })
      },
      fail: function () {
        console.log("showAboutVideoItem fail")
      }
    })
  }


})




