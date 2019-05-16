var app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    message:'',
    toChatPeople:[],//被谈话对象的全部信息
    toChatPeopleChat:[],//以被谈话对象为主建立的对话
    chatPeople:[],//发起谈话的全部信息
    chatPeopleChat:[],//发起谈话的人为主的谈话记录
   
    type:'',
    chatId:'',
    mydata:'',
    chatTwoId:'',
  },


onLoad:function(e){
  console.log("进入Test界面")
  app.globalData.blCard=false
  console.log(app.globalData.blCard)
  this.setData({
    chatPeople: app.globalData.userInfo
  })
 
  console.log(e.username)
  this.getToChatPeople(e.username)
},

getToChatPeople: function (username){
  var that=this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:'checkUsername',
      username: username
    },
    success:function(res){
      console.log("getToChatPeople success")
      console.log(res.result.data)
      that.setData({
        toChatPeople:res.result.data[0]
      })
      that.setNickName()
      that.searchChat()
    
     
    },
    fail:function(){
      console.log("getToChatPeople fail")
    }
  })
},
setNickName() {
    const nickname = this.data.toChatPeople.username
    wx.setNavigationBarTitle({
      title: nickname
    });
  console.log("setNickName success")
},
searchChat: function () {
  var that=this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:'searchChat',
      chatPeopleName: that.data.chatPeople.username,
      toChatPeopleName: that.data.toChatPeople.username,
    },
    success:function(res){
      console.log("searchChat success")
      console.log(res.result.data.length)
      var length = res.result.data.length
      if(length===1){
         that.setData({
           type:'changChat',
           chatId: res.result.data[0]._id,
           chatPeopleChat: res.result.data[0].mgs
         })
      }else{
        that.setData({
          type: 'addChat'
        })
      }

      that.addToPeopleChat()
    },
    fail:function(){
      console.log("searchChat fail")
    }
  })
},
addToPeopleChat:function(){
  var that = this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'searchChat',
      chatPeopleName:  that.data.toChatPeople.username,
      toChatPeopleName: that.data.chatPeople.username,
    },
    success: function (res) {
      console.log("addToPeopleChat success")
     
      console.log(res.result.data.length)
      var length = res.result.data.length
      if (length === 1) {
       that.setData({
         toChatPeopleChat: res.result.data[0].mgs,
         chatTwoId: res.result.data[0]._id,
       })
      //  that.toAddToPeopleChat() 调用同步过程
      } else {
        console.log("现在没有建立对方到我方的谈话")
      }
    },
    fail: function () {
      console.log("addToPeopleChat fail")
    }
  })
}, 
//???????????????????????????????????????????这是同步的过程???????????????????????????????????????
toAddToPeopleChat:function(){
  var toChatPeopleChat=this.data.toChatPeopleChat
  var chatPeopleChat=this.data.chatPeopleChat
  var toChatLength = toChatPeopleChat.length
  var chatLength = chatPeopleChat.length
  console.log(toChatLength)
  console.log(chatLength)
  if (chatLength === 0 && toChatLength!==0){
    console.log("进入chatLength === 0 && toChatLength!==0")
    var da = this.data.toChatPeopleChat
    this.setData({
      chatPeopleChat: da
    })
     wx.cloud.callFunction({
       name: 'jdbc',
       data: {
         type: 'addFirstToPeopleChat',
         chatPeopleName: this.data.chatPeople.username,
         chatPeoplePhoto: this.data.chatPeople.userPhoto,
         toChatPeopleName: this.data.toChatPeople.username,
         toChatPeoplePhoto: this.data.toChatPeople.userPhoto,
         mgs: this.data.toChatPeopleChat
       },
       success: function (res) {
         console.log("addFirstToPeopleChat success")
       },
     })
  }
  else{
    console.log("进入else函数")
    console.log(toChatPeopleChat)
    console.log(chatPeopleChat)
    var i = 0
    for (; i < toChatLength; i++) {
      var j = 0
      for (; j < chatLength; j++) {
        if (toChatPeopleChat[i].sendTime === chatPeopleChat[j].sendTime) {
          break
        }
      }
      if(j===chatLength){
        var mydata = this.data.chatPeopleChat
        mydata.push(toChatPeopleChat[i])
        this.setData({
          chatPeopleChat: mydata
        })
      }
    }
    if (i === toChatLength){

       this.changChat()
    }
  }
 
  console.log("输出chatPeopleChat改变之后的值")
  console.log(this.data.chatPeopleChat)
},
changChat:function(){
  var that=this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'searchChat',
      chatPeopleName: that.data.chatPeople.username,
      toChatPeopleName: that.data.toChatPeople.username,
    },
    success: function (res) {
      console.log("SeCond  searchChat success")

        that.setData({
          chatId: res.result.data[0]._id,
        })
        if(that.data.chatId!==''){
          that.toChangChat()
        }
      } 
  })
 
},
toChangChat:function(){
  var that=this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: 'cC',
      mgs: that.data.chatPeopleChat,
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
//??????????????????????????????????????????同步过程结束?????????????????????????????????????????
add(e) {
    console.log("输出输入的值")
    console.log(e.detail.value)
    this.setData({
      message: e.detail.value
    })
},
Chat:function(){
  var TIME = util.formatTimeNow(new Date());
  
  var md={
    "message": this.data.message,
    "sendName": this.data.chatPeople.username,
    "sendPhoto": this.data.chatPeople.userPhoto, 
    "sendTime": TIME,
  }
 
  var da = this.data.chatPeopleChat
  da.push(md)
  this.setData({
    chatPeopleChat:da,
    mydata: da
  })


  var that = this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:that.data.type,
      chatPeopleName: that.data.chatPeople.username,
      chatPeoplePhoto: that.data.chatPeople.userPhoto,
      toChatPeopleName:that.data.toChatPeople.username,
      toChatPeoplePhoto: that.data.toChatPeople.userPhoto,
      mgs: that.data.chatPeopleChat,
      chatId:that.data.chatId,
    },
    success:function(res){
      console.log("Chat success")
      that.setData({
        message:''
      })
      that.adToPeopleChat()
    },
    fail:function(res){
      console.log("Chat fail")
    }
  })
},
adToPeopleChat:function(){

  var that = this
  wx.cloud.callFunction({
    name: 'jdbc',
    data: {
      type: that.data.type,
      chatPeopleName: that.data.toChatPeople.username,
      chatPeoplePhoto: that.data.toChatPeople.userPhoto,
      toChatPeopleName: that.data.chatPeople.username,
      toChatPeoplePhoto: that.data.chatPeople.userPhoto,
      chatId: that.data.chatTwoId,
      mgs: that.data.chatPeopleChat,
    },
    success: function (res) {
      console.log("adToPeopleChat success")
    },
    fail: function (res) {
      console.log("adToPeopleChat fail")
    }
  })
}
 













})