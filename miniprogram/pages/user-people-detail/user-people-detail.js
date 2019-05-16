var app = getApp();

Page({
  data: {
   userInfo:[]
  },

  onLoad: function (options) {
    console.log(options.username)
    var that=this
    wx.cloud.callFunction({
      name:'jdbc',
      data:{
        type:'checkUsername',
        username: options.username
      },
      success:function(res){
        console.log("获取用户信息成功")
        console.log(res.result.data)
        that.setData({
          userInfo:res.result.data[0]
        })
        console.log(that.data.userInfo)

        that.changUserPhoto()
      },
      fail:function(){
        console.log("获取用户信息失败")
      }
    })
},


  changUserPhoto: function () {
   
    if (this.data.userInfo.userPhoto === '') {
      var mydata = this.data.userInfo
        mydata.userPhoto = '/images/uplogo.png'
        this.setData({
          userInfo: mydata
        })
      }
  },



  
})
