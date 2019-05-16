var util = require('../../utils/util.js');
var app = getApp();


Page({


  data: {
    texts:"至少5个字",
    min:5,
    max:200,
    time:'',
    articalTime:'',
    tempFilePath:'',
    fileID:'',
    articalTitle:'',
    articalContent:'',
    articalImageUrl:'',
    articalID:''
  },


  onLoad:function(){
    console.log(app.globalData.userInfo)
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
        console.log("选择文章封面成功，继续进行下一步")
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


uploadfile: function () {
    console.log("获取系统时间");
    console.log(this.data.time);
    var that = this;
    wx.cloud.uploadFile({
      cloudPath:  'articalImage'+'---'+app.globalData.userInfo.username+ '---' + that.data.time + '.jpg',
      filePath: that.data.tempFilePath,
      success: res => {
        console.log("上传文章封面成功，继续进行下一步")
        that.setData({
          fileID: res.fileID,
          articalImageUrl: res.fileID
        })
        console.log("请继续输入其它内容")
      },
      fail: function (res) {
        console.log("uploadFile fail")
      }
    })
  },

articalImage:function(){
  this.chosseImage();
},

inputTitle:function(e){
  this.setData({
    articalTitle:e.detail.value
  })
  console.log("文章标题已输入，请继续")
},


inputArtical: function (e) {

    var value = e.detail.value;
    var len = parseInt(value.length);

    this.setData({
      articalContent:value
    })
    console.log("文章内容已输入，请继续")

    if (len <= this.data.min)
      this.setData({
        texts: "加油，够5个字才能发布"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
},



saveArtical:function(){
  if (this.data.fileID===''){
    wx.showToast({
      title: '请上传文章封面',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  } else if (this.data.articalTitle===''){
    wx.showToast({
      title: '请输入文章标题',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  } else if (this.data.articalContent===''){
    wx.showToast({
      title: '请输入文章内容',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  }else{
    console.log("调用TosaveArtical函数")
    this.TosaveArtical()
  }
},

TosaveArtical:function(){
  var TIME = util.formatTimeNow(new Date())
  this.setData({
    articalTime: TIME
  })
  var that=this;
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'saveArtical',
      articalImage:that.data.fileID,
      articalTitle: that.data.articalTitle,
      articalContent: that.data.articalContent,
      articalAuthor: app.globalData.userInfo.username,
      userID:app.globalData.userInfo._id,
      articalAuthorPhoto: app.globalData.userInfo.userPhoto,
      articalTime:that.data.articalTime
    },
    success:function(res){
      console.log(res)
      that.setData({
        articalID:res.result._id
      })
      console.log("保存文章成功")
      that.changUserArtical()
    }
  })
   

},

changUserArtical:function(){
     var that=this;
     wx.cloud.callFunction({
       name:'jdbc',
       data:{
          type:'changUserArtical',
          userID:app.globalData.userInfo._id,
          articalID:that.data.articalID
       },
       success:function(res){
         console.log("修改用户的文章列表成功")
         console.log(res)
         wx.redirectTo({
           url: '/pages/user-artical/user-artical?username=' + app.globalData.userInfo.username,
         })
       }
     })
}


})