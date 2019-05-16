const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    phoneList:[],
    articalList:[],
    videoList:[],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },

  onLoad: function (options) {

  },
  inputValue:function(e){
    console.log(e.detail.value)
    this.setData({
      message: e.detail.value
    })
    console.log(this.data.message)
  },
  search:function(){
    this.setData({
      phoneList: [],
      articalList: [],
      videoList: [],
    })
    this.searchPhone()
  },
  searchPhone:function(){
    var that=this
    wx.cloud.callFunction({
      name:'jdbc',
      data:{
        type:'searchPhone',
        message:that.data.message
      },
      success:function(res){
        console.log("searchPhone success")
        var length = res.result.data.length
        if(length>0){
          console.log(res.result.data[0].data)
          var mydata = res.result.data[0].data
          var my=[]
          for (var i = 1; i < mydata.length; i++){
            my.push(mydata[i])
          }
          that.setData({
            phoneList: my
          })
        }
        console.log(that.data.phoneList)
        that.searchArtical()
      },
      fail:function(){
        console.log("searchPhone fail")
      }
    })
  },
  searchArtical:function(){
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'searchArticalPart',
        message: that.data.message
      },
      success: function (res) {
        console.log("searchArticalPart success")
        console.log(res.result.data)
        var length = res.result.data.length
        if(length>0){
          that.setData({
            articalList: res.result.data
          })
        }
        that.searchVideo()
      },
      fail: function () {
        console.log("searchArticalPart fail")
      }
    })
  },
  searchVideo:function(){
    var that = this
    wx.cloud.callFunction({
      name: 'jdbc',
      data: {
        type: 'searchVideoPart',
        message: that.data.message
      },
      success: function (res) {
        console.log("searchVideoPart success")
        console.log(res.result.data)
        var length = res.result.data.length
        if(length>0){
          that.setData({
            videoList: res.result.data
          })
        }
        that.setData({
          message: ''
        })
      },
      fail: function () {
        console.log("searchVideoPart fail")
      }
    })
  },
  navPhone:function(e){
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    wx.navigateTo({
      url:"/pages/para-detail/para-detail?phoneBrand=" + this.data.phoneList[id].phoneBrand + "&&phoneType=" + this.data.phoneList[id].phoneType,
    })
  },
  navArtical:function(e){
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var articalID = this.data.articalList[id]._id
    wx.navigateTo({
      url: '/pages/talke-artical/talke-artical?articalID=' + articalID,
    })
  },
  navVideo: function (e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var videoID = this.data.videoList[id]._id
    wx.navigateTo({
      url: '/pages/talke-video_details/talke-video_details?videoID=' + videoID,
    })
  },

})