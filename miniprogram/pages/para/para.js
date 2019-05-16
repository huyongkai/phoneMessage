var app = getApp();


Page({


  data: {
    curNav: 'A',
    getList:[],
    showToolbar:false,
  },


  onLoad: function (options) {
    this.getList()
  },


wite:function(){

  //wx.getSystemInfo(object)获取系统信息
  var that = this;
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        winHeight: res.windowHeight,
      })
    }
  })
},

  
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var id = e.target.id;
    console.log(id)
    console.log(typeof id)
    this.setData({
      // 动态把获取到的 id 传给 scrollTopId
      scrollTopId: id,
      // 左侧点击类样式
      curNav: id
    })
  },




getList:function(){
    var that=this
    wx.cloud.callFunction({
      name:'jdbc',
      data:{
        type:'getList',
      },
      success:function(res){
        
        console.log("getList success")
        var newlist = res.result.data
        console.log(newlist)
  
        var list ={
          A: newlist[12].data,
          B: newlist[0].data,
          C: newlist[1].data,
          D: newlist[2].data,
          E: newlist[3].data,
          F: newlist[4].data,
          G: newlist[5].data,
          H: newlist[6].data,
          I: newlist[7].data,
          J: newlist[8].data,
          K: newlist[9].data,
          L: newlist[10].data,
          M: newlist[11].data,
        }
        console.log(list)

        that.setData({
          getList:list
        })

        console.log("输出两个值比较")
        console.log(that.data.getList)
        that.wite()
  
      },
      fail:function(res){
        console.log("getList fail")
      }
    })
  },

  

onToggle:function(){
this.setData({
  showToolbar:!this.data.showToolbar
})
},
onAdd:function(){
wx.navigateTo({
  url: '/pages/para-add/para-add',
})
},
onSearch: function () {
  wx.navigateTo({
    url: '/pages/para-search/para-search',
  })
},
onDelete: function () {
 wx.showToast({
   title: '该页面不提供此功能',
   icon: 'none',
   duration: 3000
 })
},



   
})