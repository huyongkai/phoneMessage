var app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol: 3,
    skin: false,
    userLovePeople:[],
    ets: [],
    username:''
  },
  onLoad: function ( options) {
    console.log("输出options的值")
    console.log(options.username)
    this.setData({
      username: options.username
    })  
    this.getUserLovePeople();
  },

getUserLovePeople: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'getUserLovePeople',
        username:that.data.username
      },
      success: function (res) {
        console.log("getUserLovePeople success")
        console.log(res.result.data[0])
        that.setData({
          userLovePeople: res.result.data[0].userLovePeople
        })
        console.log(that.data.userLovePeople)
        that.getAllWatchPeople()
      },
      fail: function (res) {
        console.log("getUserLovePeople fail")
      }
    })
},


getAllWatchPeople: function () {
    for (var tem in this.data.userLovePeople) {
      var that = this
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type: 'getAllWatchPeople',
          userID: that.data.userLovePeople[tem].userID
        },
        success: function (res) {
          console.log("查询关注人成功后返回的结果")
          console.log(res.result.data[0])
          var mydata = that.data.ets
          mydata.push(res.result.data[0])
          that.setData({
            ets: mydata
          })
          that.changUserPhoto()
        },
        fail:function(){
          console.log("getAllWatchPeople fail")
        }
      })
    }
},

  // 下拉刷新
onPullDownRefresh: function () {
  this.setData({
    userLovePeople: [],
    ets: []
  })
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.getUserLovePeople();
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
},


changUserPhoto: function () {
    for (var i = 0; i < this.data.ets.length; i++) {
      if (this.data.ets[i].userPhoto === '') {
        var mydata = this.data.ets
        mydata[i].userPhoto = '/images/uplogo.png'
        this.setData({
          ets: mydata
        })
      }
    }
},


seePerson: function (e) {
    console.log("输出ets的值")
    console.log(this.data.ets)
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    if (!e.currentTarget.id == "") {
      wx.navigateTo({
        url: "../user-people-detail/user-people-detail?username=" + this.data.ets[id].username
      })
      console.log(e)
    } else {
      console.log("无内容")
    }
},


  
nav:function(e){
  console.log("输出当前id的值")
  var name = this.data.ets[e.currentTarget.id].username
  console.log(name)
  console.log(e.currentTarget.id)
  wx.navigateTo({
    url: '/pages/Test/Test?username='+name,
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
gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
},
gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
},
menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
},
menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
},
menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
},
switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
},

  // ListTouch触摸开始
ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
},

  // ListTouch计算方向
ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
},

  // ListTouch计算滚动
ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
},

})
