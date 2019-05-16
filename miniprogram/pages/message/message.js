const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol: 3,
    skin: false,

    //用作同步和取值
    chatList:[],
    chatPeopleList:[],
    toChatList:[],
    toChatPeopleList:[],
    chatId: '',
    //用于显示
    showAllChat:[],
    //用于组成显示的内容
    chatPhoto:'',
    chatName:'',
    chatLastNum:0,
    chatLastTime:'',
    chatLastContent:'',
    chatIdOne:'',
    chatIdTwo:'',

    boolNum:true,
 
  },
nav:function(e) {
    var id= e.currentTarget.id
    wx.navigateTo({
      url: '../Test/Test?username=' + this.data.showAllChat[id].chatName
    })
},
onLoad:function(){
  console.log("开始进入message页面")
  this.setData({
    boolNum: app.globalData.blCard
  })
  this.getAllChat()
},
getAllChat: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'getAllChat',
        username: app.globalData.userInfo.username
      },
      success: function (res) {
        console.log("getAllChat success")
        console.log(res.result.data)
      
        var length = res.result.data.length
        if(length>0){
          var mydata = that.data.chatPeopleList
          mydata=res.result.data
          that.setData({
            chatPeopleList: mydata
          })
          console.log("输出chatPeopleList的值")
          console.log(that.data.chatPeopleList)

          var mydata = that.data.chatList
          mydata.push(res.result.data[0].mgs)
          that.setData({
            chatList: mydata
          })
          console.log("输出chatList的值")
          console.log(that.data.chatList)
        }
        that.toGetAllChat()
      },
      fail: function () {
        console.log("getAllChat fail")
      }
    })
},
toGetAllChat: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'toGetAllChat',
        username: app.globalData.userInfo.username
      },
      success: function (res) {
        console.log("toGetAllChat success")
        console.log(res.result.data)
    

        var length = res.result.data.length
        if (length > 0) {
          var mydata = that.data.toChatPeopleList
          mydata.push(res.result.data[0])
          that.setData({
            toChatPeopleList: mydata
          })
          console.log("输出toChatPeopleList的值")
          console.log(that.data.toChatPeopleList)
          
        var mydata = that.data.toChatList
        mydata.push(res.result.data[0].mgs)
        that.setData({
          toChatList: mydata
        })
        console.log("输出 toChatList的值")
        console.log(that.data.toChatList)
        }
        that.showAllChatHanshuNext()
      },
      fail: function () {
        console.log("toGetAllChat fail")
      }
    })
},


//????????????????????????用于同步，已经废除??????????????????????????????
toOnStep:function(){
  console.log("输出检验四个数组的值")
  console.log(this.data.chatList)
  console.log(this.data.chatPeopleList)
  console.log(this.data.toChatList)
  console.log(this.data.toChatPeopleList)
  var lengthOne = this.data.chatPeopleList.length
  var lengthTwo = this.data.toChatPeopleList.length
  for (var i = 0; i < lengthTwo;i++){
    var card=false
    var chatPeopleName = this.data.toChatPeopleList[i].chatPeopleName 
    var toChatPeopleName = this.data.toChatPeopleList[i].toChatPeopleName
    for (var j = 0; j < lengthOne;j++){
      if (this.data.chatPeopleList[j].chatPeopleName === toChatPeopleName && this.data.chatPeopleList[j].toChatPeopleName === chatPeopleName){
        this.onStep(this.data.chatPeopleList[j].mgs, this.data.toChatPeopleList[i].mgs,
          this.data.chatPeopleList[j], this.data.toChatPeopleList[i])
          card=true
      }
    }
    if (toChatPeopleName === app.globalData.userInfo.username&&card===false) {
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type: 'addFirstToPeopleChat',
          chatPeopleName: this.data.toChatPeopleList[i].toChatPeopleName,
          chatPeoplePhoto: this.data.toChatPeopleList[i].toChatPeoplePhoto,
          toChatPeopleName: this.data.toChatPeopleList[i].chatPeopleName ,
          toChatPeoplePhoto: this.data.toChatPeopleList[i].chatPeoplePhoto,
          mgs: this.data.toChatPeopleList[i].mgs
        },
        success: function (res) {
          console.log("addFirstToPeopleChat success")
        },
      })
    }
  }
  if (i === lengthTwo){
    this.showAllChatHanshu()
  }
},
onStep: function (chatPeopleChat, toChatPeopleChat, chatPeople, toChatPeople){
    console.log("输出传过来的值")
    console.log(chatPeopleChat)
    console.log(toChatPeopleChat)
    console.log(chatPeople)
    console.log(toChatPeople)


    var toChatLength = toChatPeopleChat.length
    var chatLength = chatPeopleChat.length
    console.log(toChatLength)
    console.log(chatLength)
   
    console.log("进入else函数")
      var i = 0
      for (; i < toChatLength; i++) {
        var j = 0
        for (; j < chatLength; j++) {
          if (toChatPeopleChat[i].sendTime === chatPeopleChat[j].sendTime) {
            break
          }
        }
        if (j === chatLength) {
          chatPeopleChat.push(toChatPeopleChat[i])
        }
      }
      if (i === toChatLength) {
        this.changChat(chatPeopleChat, chatPeople, toChatPeople)
      }
},
changChat: function (chatPeopleChat, chatPeople, toChatPeople) {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'searchChat',
        chatPeopleName: chatPeople.username,
        toChatPeopleName: toChatPeople.username,
      },
      success: function (res) {
        console.log("SeCond  searchChat success")
        that.setData({
          chatId: res.result.data[0]._id,
        })
        console.log("输出chatId的值")
        console.log(that.data.chatId)
        if (that.data.chatId !== '') {
          that.toChangChat(chatPeopleChat)
        }
      }
    })
},
toChangChat: function (chatPeopleChat) {
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'cC',
        mgs: chatPeopleChat,
        chatId: that.data.chatId,
      },
      success: function () {
        console.log("changChat success")
      },
      fail: function () {
        console.log("changChat fail")
      }
    })
},
showAllChatHanshu:function(){
  var that=this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'getAllChat',
      username: app.globalData.userInfo.username
    },
    success: function (res) {
      console.log("getAllChat success")
      console.log(res.result.data)
      var length = res.result.data.length
      if (length > 0) {
        that.setData({
          chatPeopleList: res.result.data
        })
        that.showAllChatHanshuNext()        
      }
    }
  })
},
//??????????????????????????????同步结束,??????????????????????????????????
showAllChatHanshuNext:function(){
  var length = this.data.chatPeopleList.length
  console.log(length)
  for(var i=0;i<length;i++){
      var mgsLength = this.data.chatPeopleList[i].mgs.length
      console.log("请输出值")
      console.log(this.data.chatPeopleList[i].mgs)
      console.log("请输出长度")
      console.log(mgsLength)



      this.setData({
        chatLastTime: this.data.chatPeopleList[i].mgs[mgsLength-1].sendTime,
        chatLastContent: this.data.chatPeopleList[i].mgs[mgsLength-1].message,
      })
      var sum=0;
      for (var j = mgsLength-1;j>=0;j--){
        if (this.data.chatPeopleList[i].mgs[j].sendName === app.globalData.userInfo.username){
          console.log("进入if中")
          break
        }else{
          sum++
          console.log("进入else中")
        }
      }
      this.setData({
        chatLastNum: sum,
      })

    if (app.globalData.userInfo.username === this.data.chatPeopleList[i].chatPeopleName) {
        this.setData({
            chatPhoto: this.data.chatPeopleList[i].toChatPeoplePhoto,
            chatName: this.data.chatPeopleList[i].toChatPeopleName,
        })
     }else{
        this.setData({
             chatPhoto: this.data.chatPeopleList[i].chatPeoplePhoto,
             chatName: this.data.chatPeopleList[i].chatPeopleName,
         })
    }
    var mydata = this.data.showAllChat
    var da={
      chatLastTime: this.data.chatLastTime,
      chatLastContent: this.data.chatLastContent,
      chatLastNum: this.data.chatLastNum,
      chatPhoto: this.data.chatPhoto,
      chatName: this.data.chatName
    }
    mydata.push(da)
    this.setData({
      showAllChat: mydata
    })
  }
  console.log(this.data.showAllChat)
},
deleteChat:function(e){
  console.log("进入删除列表界面")
  console.log(e.currentTarget.id)
  var id = e.currentTarget.id
  var username = this.data.showAllChat[id].chatName
  var that=this
  wx.showModal({
    title: '提醒',
    content: '请谨慎删除,有关记录会删除,无法恢复',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        that.deleteChatOne(username)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},

deleteChatOne: function (username) {
    console.log("进入删除函数")
    var that = this
    var chatNameOne = app.globalData.userInfo.username
    var chatNameTwo = username
    console.log(chatNameOne)
    console.log(chatNameTwo)

    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'searchChat',
        chatPeopleName: chatNameOne,
        toChatPeopleName: chatNameTwo
      },
      success: function (res) {
        var length = res.result.data.length
        if (length > 0) {
          console.log(res.result.data[0]._id)
          that.setData({
            chatIdOne: res.result.data[0]._id
          })
        }
        console.log("调用deleteChatTwo函数")
        that.deleteChatTwo(chatNameOne, chatNameTwo)
      }
    })
},
deleteChatTwo: function (chatNameOne, chatNameTwo) {
    console.log(chatNameOne)
    console.log(chatNameTwo)
    console.log("进入删除函数Two")
    var that = this

    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'searchChat',
        chatPeopleName: chatNameTwo,
        toChatPeopleName: chatNameOne
      },
      success: function (res) {
        var length = res.result.data.length
        if (length > 0) {
          console.log(res.result.data[0]._id)
          that.setData({
            chatIdTwo: res.result.data[0]._id
          })
          console.log(that.data.chatIdTwo)
        }
        console.log("调用toDeleteChatOne函数")
        that.toDeleteChatOne()
      }
    })
},


toDeleteChatOne: function () {
    if (this.data.chatIdOne !== '') {
      var that = this
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type: 'deleteChat',
          chatId: that.data.chatIdOne
        },
        success: function () {
          console.log("删除成功")
          that.toDeleteChatTwo()
        }
      })
    }
  },
toDeleteChatTwo: function () {
    if (this.data.chatIdTwo !== '') {
      var that = this
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type: 'deleteChat',
          chatId: that.data.chatIdTwo
        },
        success: function () {
          console.log("删除成功")
          that.onLoad()
        }
      })
    }
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



onPullDownRefresh: function () {
    this.setData({
      chatList: [],
      chatPeopleList: [],
      toChatList: [],
      toChatPeopleList: [],
      chatId: '',
      showAllChat: [],
    })
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.getAllChat()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
},

})

