var util=require('../../utils/util.js');
var app = getApp();

Page({

  data: {
    username:'',
    userBackgroundUrl: '',
    userLogo:'',
   
    fileID:'',
    tempFilePath:'',
    type:null,
    time:''
  },

  onLoad:function(){
    console.log("onLoad")
    if (app.globalData.userInfo.backgroundImage===''){
      this.setData({
        userBackgroundUrl: '/images/upImage.png',
      })
    }
    else{
      this.setData({
        userBackgroundUrl: app.globalData.userInfo.backgroundImage,
      })
    }
    if (app.globalData.userInfo.userPhoto === '') {
      this.setData({
        userLogo: '/images/uplogo.png',
      })
    }
    else {
      this.setData({
        userLogo: app.globalData.userInfo.userPhoto ,
      })
    }
    this.setData({
      username: app.globalData.userInfo.username,
    })
    console.log(this.data.userBackgroundUrl)
    console.log(this.data.userLogo)
    console.log(this.data.username)
},

addBackgroundImage: function () {
  var that=this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'addBackgroundImage',
        userID: app.globalData.userInfo._id,
        backgroundImage: that.data.fileID
      },
      success:function(){
        console.log("进行最后一步,使用addBackgroundImage添加到user表中")
      }
    })
},



addUserPhoto: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'addUserPhoto',
        userID: app.globalData.userInfo._id,
        userPhoto: that.data.fileID
      },
      success: function () {
        console.log("进行最后一步,使用addUserPhoto添加到user表中")
      }
    })
},



uploadfile: function (){
    console.log("获取系统时间");
    console.log(this.data.time);
    var that=this;
  wx.cloud.uploadFile({
    cloudPath: that.data.type + '---' + app.globalData.userInfo.username+'---'+that.data.time+'.jpg',
    filePath: that.data.tempFilePath,
    success: res => {
      console.log("上传图片成功，继续进行")
      that.setData({
        fileID:res.fileID
      })   
      if (that.data.type === 'addBackgroundImage') {
        that.setData({
          userBackgroundUrl: res.fileID
        })
        that.addBackgroundImage()
      }
      else if (that.data.type === 'addUserPhoto') {
        that.setData({
          userLogo: res.fileID
        })
        that.addUserPhoto()
      }    
    },
    fail: function (res) {
      console.log("uploadFile fail")
    }
  })
},





chosseImage: function (res) {
  var TIME = util.formatTime(new Date());
  this.setData({
    time: TIME
  })
  var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //res.tempFilePaths为选择照片的路径
        console.log("选择图片成功，继续进行")
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0]);
        that.setData({
          tempFilePath: tempFilePaths[0]
        })
        console.log(that.data.tempFilePath)
        that.uploadfile()
      }
    })
},

 



chosseBackgroundImage:function(res){
  this.setData({
    type: 'addBackgroundImage'
  })
  
  console.log(this.data.type);
  this.chosseImage()
},

chosseUserPhoto:function(res){
  this.setData({
    type:'addUserPhoto'
  })
  
  console.log(this.data.type);
  this.chosseImage()
},




})