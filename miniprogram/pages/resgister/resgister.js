var app=getApp();

Page({

  data: {
    username:null,
    password:null,
    passwordAgain:null,
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',//接口收到的验证码
    Code: '', //输入的验证码
    NewChanges: '',//输入的密码
    NewChangesAgain: '',//再次输入的密码
    success: false,
    state: ''
  },


/**
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    this.setData({
      Code: e.detail.value
    })
  },
*/


  usernameInput:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    this.setData({
      passwordAgain: e.detail.value
    })
  },


/** 手机验证码获得，
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',  //禁用之后颜色变灰
    })

    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

  
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'resgister',
        phone:that.data.phone,
      },
      success: function (res) {
        console.log("打印出result结果")
        console.log(res.result)
        if(res.result===null){
          if (phone == '') {
            warn = "号码不能为空";
          } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
            warn = "手机号格式不正确";
          }
          else{
            wx.request({
              url: '', //填写发送验证码接口
              method: "POST",
              data: {
                coachid: that.data.phone
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log("接收接口返回的验证码")
                console.log(res.data)
                that.setData({
                  VerificationCode: res.data.verifycode
                })
                wx.showToast({
                  title: '短信验证码已发送',
                  icon: 'none',
                  duration: 2000
                });

                //设置一分钟的倒计时
                var interval = setInterval(function () {
                  currentTime--; 
                  that.setData({
                    text: currentTime + 's', 
                  })
                  if (currentTime <= 0) {
                    clearInterval(interval)
                    that.setData({
                      text: '重新发送',
                      currentTime: 61,
                      disabled: false,
                      color: '#33FF99'
                    })
                  }
                }, 100);
              }

            })
          }   
        }
        else {  
          warn = "手机号已被注册";
        }

        if (warn != null) {
          wx.showModal({
            title: '提示',
            content: warn
          })
          that.setData({
            disabled: false,
            color: '#33FF99'
          })
          return;
        }
    }
      

    })

  },
*/


/**
  submit: function (e) {
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/images/Error.png',
        duration: 2000
      })
      return
    } 
    else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        image: '/images/Error.png',
        duration: 2000
      })
      return
    }
    else if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/images/Error.png',
        duration: 2000
      })
      return
    } 
    else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/images/Error.png',
        duration: 2000
      })
      return
    } 
    else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: getApp().globalData.baseUrl + '/Coachs/insert',
        method: "POST",
        data: {
          coachid: phone,
          coachpassword: that.data.NewChanges
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功~',
            icon: 'loading',
            duration: 2000
          })
          console.log(res)
          that.setData({
            success: true
          })
        }
      })
    }
  }*/










submit:function(e){
  console.log("进入提交函数")
  console.log(this.data.username)
  console.log(this.data.password)
  console.log(this.data.passwordAgain)

  if (this.data.username == '') {
    wx.showToast({
      title: '请输入昵称',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  } 
  else if (this.data.password != this.data.passwordAgain) {
    wx.showToast({
      title: '两次密码不一致',
      image: '/images/Error.png',
      duration: 2000
    })
    return
  } 
  else {
    var that=this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'checkUsername',
        username: this.data.username
      },
      success: function (res) {
        console.log(res.result.data.length)
        if (res.result.data.length === 0) {
          console.log("进入insert函数")
          wx.cloud.callFunction({
            name: 'jdbc',
            data: {
              type: 'insert',
              username: that.data.username,
              password: that.data.password
            },
            success: function (res) {
                 console.log("insert success")
                 wx.showToast({
                     title: '注册成功',
                     icon:'success',
                     duration: 2000,
                     success:function(res){
                         setTimeout(function(){
                             wx.redirectTo({
                               url: '/pages/login/login',
                             })
                         },2000)
                 
                     }
                  })                 
            },
            fail: function () {
              console.log('insert fail')
            }
          })
        }
        else{
          wx.showToast({
            title: '请换一个昵称',
            image: '/images/Error.png',
            duration: 2000
          })
        }
      },
      fail: function () {
        console.log('checkUsername fail')
      }
    })
    return
  }
},



reback:function(){
wx.redirectTo({
  url: '/pages/login/login',
})
}


})
 





/**
 * 手机验证码无能为力，不能获得，待日后再补
 * 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
 * <view class='row'>
        <view class='info'>
            <input  class= 'info-input1' bindinput="handleInputPhone" placeholder="请输入你的手机号"/>
        </view>
        <button class='button' bindtap='doGetCode' disabled='{{disabled}}'>
            {{text}}
        </button>
     </view>

     <view class='row'>
        <view class='info'>
            <input  class= 'info-input' bindinput="handleVerificationCode" placeholder="请输入你的验证码"/>
        </view>
     </view>
 */