//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'hyk-5d8ce9'
      })
    }



    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("获取用户信息成功")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("输出用户授权的用户信息")
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

},





globalData: {
  blCard:true,
  userInfo: null,
  ColorList: [{
    title: '嫣红',
    name: 'red',
    color: '#e54d42'
  },
  {
    title: '桔橙',
    name: 'orange',
    color: '#f37b1d'
  },
  {
    title: '明黄',
    name: 'yellow',
    color: '#fbbd08'
  },
  {
    title: '橄榄',
    name: 'olive',
    color: '#8dc63f'
  },
  {
    title: '森绿',
    name: 'green',
    color: '#39b54a'
  },
  {
    title: '天青',
    name: 'cyan',
    color: '#1cbbb4'
  },
  {
    title: '海蓝',
    name: 'blue',
    color: '#0081ff'
  },
  {
    title: '姹紫',
    name: 'purple',
    color: '#6739b6'
  },
  {
    title: '木槿',
    name: 'mauve',
    color: '#9c26b0'
  },
  {
    title: '桃粉',
    name: 'pink',
    color: '#e03997'
  },
  {
    title: '棕褐',
    name: 'brown',
    color: '#a5673f'
  },
  {
    title: '玄灰',
    name: 'grey',
    color: '#8799a3'
  },
  {
    title: '草灰',
    name: 'gray',
    color: '#aaaaaa'
  },
  {
    title: '墨黑',
    name: 'black',
    color: '#333333'
  },
  {
    title: '雅白',
    name: 'white',
    color: '#ffffff'
  },
  ]
},


getUserInfo: function (username, password) {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'login',
        username: username,
        password: password
      },
      success: function (res) {
        that.globalData.userInfo = res.result.data[0];
      },
      fail: function (res) {
        console.log("获取用户信息失败")
      }
    })
},

})
