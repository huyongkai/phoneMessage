var app=getApp();

Page({


  data: {
    username:null,
    password:null
  },

 
 
  loginBtnClick:function(){
    console.log(this.data.username);
    console.log(this.data.password);
    if (this.data.username === null || this.data.password===null){
      wx.showModal({
        title: '提示',
        content: '请用户输入完整的账号和密码,如果没有,请点击跳转',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/resgister/resgister',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
    }
    else{

   
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'login',
        username: this.data.username,
        password: this.data.password
      },
      success: function (res) {
        console.log(res.result.data)
        console.log(res.result.data.length);
        if (res.result.data.length===0){
         wx.showModal({
           title: '提示',
           content: '该用户未注册，是否跳转到注册界面',
           success(res) {
             if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/resgister/resgister',
                })
             } else if (res.cancel) {
               console.log('用户点击取消')
             }
           }
         }) 
       }
       else{
         console.log("跳转到首页")
         console.log(res.result)
          app.globalData.userInfo=res.result.data[0]
          console.log(res.result.data[0])
          console.log("测试全局数据login界面")
          console.log(app.globalData.userInfo.username)
          console.log(app.globalData.userInfo.password)
          console.log(app.globalData.userInfo)
          console.log("跳转到首页去")
         wx.switchTab({
            url: '/pages/index/index',
          })
       }
     
      },
      fail: function () {
        console.log('login fail')
      }
    })

    }
  },
  


  usernameInput:function(event){
    this.setData({username:event.detail.value})
  },
  passwordInput:function(event){
    this.setData({password:event.detail.value})
  }



})