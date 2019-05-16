var app = getApp();
var util = require('../../utils/util.js');


Page({

  data: {
    img: '/images/collec.png',
    imgBool: true,
    texts: "至少1个字",
    min: 1,
    max: 50,
    articalTalke: '',
    articalTitle: '',
    articalAuthor: '',
    articalContent: '',
    articalAuthorPhoto: '',
    articalID: '',
    userId: '',
    //从数据库获得的评论列表
    ListParaItem: [
    ],
    time: '',
    articalTalkeReplay: '',
    articalUserReplay: '',
    articalReplayToUser: ''
  },







  onLoad: function (options) {

    console.log("开始检测user-artical页面传递的值")
    console.log(options.articalID)
    this.setData({
      articalID: options.articalID
    })
    console.log(this.data.articalID)

    this.showArtical()
  },





  showArtical: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'showArtical',
        articalID: that.data.articalID
      },
      success: function (res) {
        console.log("显示文章内容成功")
        console.log(res.result.data[0])
        that.setData({
          articalAuthor: res.result.data[0].articalAuthor,
          articalTitle: res.result.data[0].articalTitle,
          articalContent: res.result.data[0].articalContent,
          articalAuthorPhoto: res.result.data[0].articalAuthorPhoto
        })
        console.log("显示复制后的数据")
        console.log(that.data.articalAuthor)
        console.log(that.data.articalTitle)
        console.log(that.data.articalContent)
        console.log(that.data.articalAuthorPhoto)


        console.log("调用文章评论列表")
        that.showArticalTalkeList()
      },
      fail: function (res) {
        console.log("显示文章失败")
      }
    })
  },



  showArticalTalkeList: function () {
    console.log("开始显示评论列表")
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'showArticalTalkeList',
        articalID: that.data.articalID
      },
      success: function (res) {
        console.log("showArticalTalkeList success")
        console.log(res)
        that.setData({
          ListParaItem: res.result.data
        })
        console.log("显示ListParaItem的内容")
        console.log(that.data.ListParaItem)
        that.addUsercontentToList()
      },
      fail: function (res) {
        console.log("showArticalTalkeList fail")
      }
    })
  },





  addUsercontentToList: function () {
    console.log("开始调用填充用户信息函数")
    console.log("开始测试for循环")
    console.log(this.data.ListParaItem.length)

    for (var tem = 0; tem < this.data.ListParaItem.length; tem++) {
      console.log(this.data.ListParaItem[tem].userId)
      console.log("输出tem的值")
      console.log(tem)

      this.JDBCaddUsercontentToList(tem)
    }
  },


  JDBCaddUsercontentToList: function (tem) {
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'addUsercontentToList',
        userId: that.data.ListParaItem[tem].userId
      },
      success: function (res) {
        console.log(tem)
        console.log("addUsercontentToList success")


        var mydata = that.data.ListParaItem
        mydata[tem].username = res.result.data[0].username
        that.setData({
          ListParaItem: mydata
        })
        var mydata = that.data.ListParaItem
        mydata[tem].userPhoto = res.result.data[0].userPhoto
        that.setData({
          ListParaItem: mydata
        })
        var mydata = that.data.ListParaItem
        mydata[tem].hiddenName = true
        that.setData({
          ListParaItem: mydata
        })
        var mydata = that.data.ListParaItem
        mydata[tem].loveTalke = '/images/collec.png'
        that.setData({
          ListParaItem: mydata
        })
        var mydata = that.data.ListParaItem
        mydata[tem].loveTalkeBool = true
        that.setData({
          ListParaItem: mydata
        })


        console.log(that.data.ListParaItem)
      },
      fail: function (res) {
        console.log("addUsercontentToList fail")
      }
    })
  },




  inputArticalTalke: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);

    this.setData({
      articalTalke: value
    })
    console.log("文章评论已输入，请继续")

    if (len < this.data.min)
      this.setData({
        texts: "有评论内容才能发布"
      })
    else if (len >= this.data.min)
      this.setData({
        texts: " "
      })

    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
  },




  saveArticalTalke: function (res) {
    if (this.data.articalTalke===''){
      wx.showToast({
        title: '发布内容不能为空',
        icon: 'none',
        duration: 3000
      })
    }else{
    var TIME = util.formatTimeNow(new Date())
    this.setData({
      time: TIME
    })
    console.log("请输出时间戳")
    console.log(TIME)
    console.log(this.data.time)


    console.log("发布评论")
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'saveArticalTalke',
        articalID: that.data.articalID,
        userId: app.globalData.userInfo._id,
        articalTalke: that.data.articalTalke,
        articalTalkeTime: that.data.time
      },
      success: function (res) {
        console.log("发布评论成功")
        console.log(res)
        that.showArtical()
      },
      fail: function (res) {
        console.log("发布评论失败")
      }
    })
    }
  },




  replayShow: function (res) {

    var id = res.target.dataset.id
    var mydata = this.data.ListParaItem
    mydata[id].hiddenName = !mydata[id].hiddenName
    console.log(mydata[id].hiddenName)
    this.setData({
      ListParaItem: mydata
    })
    console.log("点击回复")
  },



  changeImg: function (res) {
    var id = res.target.dataset.id
    console.log(id)
    var mydata = this.data.ListParaItem
    mydata[id].loveTalkeBool = !mydata[id].loveTalkeBool
    console.log(mydata[id].loveTalkeBool)
    this.setData({
      ListParaItem: mydata
    })
    var mydata = this.data.ListParaItem
    if (this.data.ListParaItem[id].loveTalkeBool === true) {
      mydata[id].loveTalke = '/images/collec.png'
      mydata[id].articalTalkeLoveNum = mydata[id].articalTalkeLoveNum - 1
      this.setData({
        ListParaItem: mydata
      })
      console.log(mydata[id].articalTalkeLoveNum)
    }
    else {
      mydata[id].loveTalke = '/images/collec1.png'
      mydata[id].articalTalkeLoveNum = mydata[id].articalTalkeLoveNum + 1
      this.setData({
        ListParaItem: mydata
      })
      console.log(mydata[id].articalTalkeLoveNum)
    }
  },






  inputArticalReplayTalke: function (res) {
    var value = res.detail.value;
    this.setData({
      articalTalkeReplay: value
    })
  },





  saveArticalTalkeReplay: function (res) {
    if (this.data.articalTalkeReplay === '') {
      wx.showToast({
        title: '回复内容不能为空',
        icon: 'none',
        duration: 3000
      })
    }else{
    var TIME = util.formatTimeNow(new Date())
    this.setData({
      time: TIME
    })
    var id = res.target.dataset.id
    console.log("回复评论")
    var that = this;
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'saveArticalTalkeReplay',
        articalReplayToUser: that.data.ListParaItem[id].username,
        articalReplayTocontent: that.data.ListParaItem[id].articalTalke,
        articalTalkeReplay: that.data.articalTalkeReplay,
        articalID: that.data.articalID,
        userId: app.globalData.userInfo._id,
        articalTalkeReplayTime: that.data.time,
        articalReplayList: that.data.ListParaItem[id].articalReplayList
      },
      success: function (res) {
        console.log("saveArticalTalkeReplay success")
        that.showArtical()
      },
      fail: function (res) {
        console.log("saveArticalTalkeReplay fail")
      }
    })
  }

}




})

