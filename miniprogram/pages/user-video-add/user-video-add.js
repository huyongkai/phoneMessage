var util = require('../../utils/util.js');
var app = getApp();

Page({

  data: {
    tempFilePath:'',
    videofileID:'',
    texts: "至少5个字",
    min: 5,
    max: 200,
    videoLebal:'',
    videoTitle:'',
    videoContent:'',
    videoTime:'',
    videoID:''
  },


VideoImage: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          tempFilePath: res.tempFilePath
        })
        that.uploadfile()
      }
    })
},



uploadfile: function () {
    var TIME = util.formatTime(new Date());
    console.log("获取系统时间");
    console.log(TIME);
    var that = this;
    wx.cloud.uploadFile({
      cloudPath: 'Video' + '---' + '---' + TIME + '.mp4',//+ app.globalData.userInfo.username
      filePath: that.data.tempFilePath,
      success: res => {
        console.log("上传视频成功，继续进行下一步")
        that.setData({
          videofileID: res.fileID
        })
        console.log("上传视频成功")
        console.log(res.fileID)
        console.log(that.data.videofileID)
      },
      fail: function (res) {
        console.log("uploadFile fail")
      }
    })
},





inputVideoTitle:function(res){
  this.setData({
    videoTitle: res.detail.value
  })
  console.log(this.data.videoTitle)
  console.log("视频标题已输入，请继续输入标签")
},


inputVideoLebal: function (res) {
    this.setData({
      videoLebal: res.detail.value
    })
    console.log(this.data.videoLebal)
    console.log("视频标签已输入，请继续输入简介")
},
  
  
inputVideo: function (res) {

    var value = res.detail.value;
    var len = parseInt(value.length);

    this.setData({
      videoContent: value
    })
    console.log("视频简介已输入，请继续")

    if (len < this.data.min)
      this.setData({
        texts: "加油，够5个字才能发布"
      })
    else if (len >= this.data.min)
      this.setData({
        texts: " "
      })

    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
},



saveVideo: function () {
  if (this.data.videofileID === '') {
      wx.showToast({
        title: '请上传视频',
        image: '/images/Error.png',
        duration: 2000
      })
      return
   } else if (this.data.videoTitle === '') {
      wx.showToast({
        title: '请输入视频标题',
        image: '/images/Error.png',
        duration: 2000
      })
      return
  } else if (this.data.videoLebal === '') {
    wx.showToast({
      title: '请输入视频标签',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  }else if (this.data.videoContent === '') {
      wx.showToast({
        title: '请输入视频简介',
        image: '/images/Error.png',
        duration: 2000
      })
      return
    } else {
     console.log("调用TosaveVideo函数")
      this.TosaveVideo()
    }
},

  


 
TosaveVideo: function () {
    var TIME = util.formatTimeNow(new Date())
    this.setData({
      videoTime: TIME
    })
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'saveVideo',
        videoPath: that.data.videofileID,
        videoTitle: that.data.videoTitle,
        videoContent: that.data.videoContent,
        videoAuthor: app.globalData.userInfo.username,
        userID: app.globalData.userInfo._id,
        videoAuthorPhoto: app.globalData.userInfo.userPhoto,
        videoTime: that.data.videoTime,
        videoLebal: that.data.videoLebal
      },
      success: function (res) {
        console.log(res)
        that.setData({
          videoID: res.result._id
        })
        console.log("上传视频成功")
        that.changUserVideo()
      }
    })
},




changUserVideo: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'changUserVideo',
        userID: app.globalData.userInfo._id,
        videoID: that.data.videoID
      },
      success: function (res) {
        console.log("修改用户的视频列表成功")
        console.log(res)
        wx.redirectTo({
          url: '/pages/user-video/user-video?username='+app.globalData.userInfo.username,
        })
      }
    })
  }





})



