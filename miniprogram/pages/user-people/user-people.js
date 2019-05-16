var app = getApp()

Page({
  data: {
    allWatchPeople:[],
    ets: [],
    chatIdOne:'',
    chatIdTwo:'',

  },
  onLoad: function () {
    this.loadPer();
  },

  // 加载艺人列表
loadPer: function () {
    var that=this
    wx.cloud.callFunction({
      name:'jdbc',
      data:{
        type:'getAllPeople',
        username: app.globalData.userInfo.username
      },
      success:function(res){
        console.log("getAllPeople success")
        console.log(res.result.data)
        that.setData({
          ets: res.result.data
        })
        console.log("输出ets的值")
        console.log(that.data.ets)
        that.allWatchPeople();
      },
      fail:function(res){
        console.log("getAllPeople fail")
      }
    })
},


allWatchPeople:function(){
  var that = this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'allWatchPeople',
      username: app.globalData.userInfo.username
    },
    success: function (res) {
      console.log("allWatchPeople success")
      console.log(res.result.data[0])
      var mydata = res.result.data[0]
      console.log("输出mydata的值")
      console.log(mydata)
      if (mydata){
        that.setData({
          allWatchPeople: mydata.userLovePeople
        })
        console.log("输出allWatchPeople的值")
        console.log(that.data.allWatchPeople)
        that.setWatchPeople()
        that.changUserPhoto()
      }
    },
    fail: function (res) {
      console.log("allWatchPeople fail")
    }
  })
},


setWatchPeople:function(){
  var length=this.data.ets.length
  console.log(length)
  for(var i=0;i<length;i++){
     var id=this.data.ets[i]._id
     var j = 0
     for(;j<this.data.allWatchPeople.length;j++){
       if(id===this.data.allWatchPeople[j].userID)
          break;
     }
     if(j===this.data.allWatchPeople.length)
     {
       var mydata = this.data.ets
       mydata[i].watchPeople=true
       mydata[i].watchConnect="关注"
       this.setData({
         ets: mydata
       })
     }
     else{
       var mydata = this.data.ets
       mydata[i].watchPeople = false
       mydata[i].watchConnect = "已关注"
       this.setData({
         ets: mydata
       })
     }
  }



  console.log("输出修改之后的allWatchPeople的值")
  console.log(this.data.allWatchPeople)
},


  // 下拉刷新
onPullDownRefresh: function () {
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.loadPer();
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
},


watchPeople: function (e){
    var that=this
    console.log("输出当前id的值")
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var username = this.data.ets[id].username
    var watch = this.data.ets
    watch[id].watchPeople = !watch[id].watchPeople
    this.setData({
      ets:watch
    })


   if (this.data.ets[id].watchPeople===true){
     var that=this
     wx.showModal({
       title: '提醒',
       content: '是否删除联系人，如果删除，则相关的消息一并删除',
       success(res) {
         if (res.confirm) {
           console.log('用户点击确定')
           console.log("进入删除关注人函数")
           var watch = that.data.ets
           watch[id].watchConnect = "关注"
           that.setData({
             ets: watch
           })
           var mydata = []
           for (var i = 0; i < that.data.allWatchPeople.length; i++) {
             if (that.data.allWatchPeople[i].userID !== that.data.ets[id]._id)
               mydata.push({
                 'userID': that.data.allWatchPeople[i].userID
               })
           }
           wx.cloud.callFunction({
             name: 'jdbc',
             data: {
               type: 'deleteWatchPeople',
               userLovePeople: mydata,
               userID: app.globalData.userInfo._id
             },
             success: function () {
               console.log("deleteWatchPeople success")
               that.deleteChatOne(username)
             },
             fail: function () {
               console.log("deleteWatchPeople fail")
             }
           })
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
       }
     })
  }else{
    console.log("进入添加关注人函数")
     var watch = this.data.ets
     watch[id].watchConnect = "已关注"
     this.setData({
       ets: watch
     })

     var mydata = that.data.allWatchPeople
     mydata.push({
       'userID': that.data.ets[id]._id
     })
     wx.cloud.callFunction({
       name: 'jdbc',
       data: {
         type: 'addWatchPeople',
         userLovePeople: mydata,
         userID: app.globalData.userInfo._id
       },
       success: function () {
         console.log("addWatchPeople success")
       },
       fail: function () {
         console.log("addWatchPeople fail")
       }
     })
   }
},

deleteChatOne: function (username) {
  console.log("进入删除函数")
    var that =this
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
        if(length>0){
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
        if(length>0){
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
  if (this.data.chatIdOne!==''){
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
  if(this.data.chatIdTwo!==''){
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'deleteChat',
        chatId: that.data.chatIdTwo
      },
      success: function () {
        console.log("删除成功")
      }
    })
  }
},
changUserPhoto:function(){
  for(var i=0;i<this.data.ets.length;i++){
    if (this.data.ets[i].userPhoto === ''){
      var mydata = this.data.ets
      mydata[i].userPhoto='/images/uplogo.png'
      this.setData({
        ets: mydata
      })
    }
  }

},



nav:function(e){
   console.log(e.currentTarget.id)
   var name = this.data.ets[e.currentTarget.id].username
   wx.navigateTo({
     url: '/pages/user-people-detail/user-people-detail?username=' + name,
   })
}



})
