var list = require('./choosePhone.js');

var ls = require('../para-detail/countSum.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
//传过来的手机名称和分数
    oldsum:0,
    oldPhoneName:'',

//供选择的手机各个参数列表
    cpuList:[],
    screenSizeList:[],
    screenList:[],
    unLockList:[],
    prePhoto:[],
    postPhoto:[],
    phoneMemory:[],
    phoneRunningMemory:[],
//获得用户输入的各个参数的值
    cpuid:-1,
    cpuValue:'',
    screenSizeId:-1,
    screenSizeValue:'',
    screenId:-1,
    screenValue:'',
    prePhotoId:-1,
    prePhotoValue:'',
    postPhotoId:-1,
    postPhotoValue:'',
    unLockListId:-1,
    unLockListValue:'',
    phoneMemoryId:-1,
    phoneMemoryValue:'',
    phoneRunningMemoryId:-1,
    phoneRunningMemoryValue:'',

//用来计算分数的各个参数的评分对照表
    newcpuList: [],
    newscreenSizeList: [],
    newscreenList: [],
    newunLockList: [],
    newprePhoto: [],
    newpostPhoto: [],
    newphoneMemory: [],
    newphoneRunningMemory: [],
    newsum: 0,


    options:'',
  },

 
onLoad: function (options) {
  this.setData({
    options: options
  })
    
  this.nextOnLoad()
},
nextOnLoad:function(){
  this.setData({
    oldsum: this.data.options.sum,
    oldPhoneName: this.data.options.oldPhoneName,
    oldProportion: 0,
    newProportion: 0,
    newsum: 0,
    allSum: 100,

    cpuList: list.cpuList,
    screenSizeList: list.screenSizeList,
    screenList: list.screenList,
    unLockList: list.unLockList,
    prePhoto: list.prePhoto,
    postPhoto: list.postPhoto,
    phoneMemory: list.phoneMemory,
    phoneRunningMemory: list.phoneRunningMemory,


    newcpuList: ls.cpuList,
    newscreenSizeList: ls.screenSizeList,
    newscreenList: ls.screenList,
    newunLockList: ls.unLockList,
    newprePhoto: ls.prePhoto,
    newpostPhoto: ls.postPhoto,
    newphoneMemory: ls.phoneMemory,
    newphoneRunningMemory: ls.phoneRunningMemory,
  })
},
onPullDownRefresh: function () {
  this.setData({
    cpuid: -1,
    cpuValue: '',
    screenSizeId: -1,
    screenSizeValue: '',
    screenId: -1,
    screenValue: '',
    prePhotoId: -1,
    prePhotoValue: '',
    postPhotoId: -1,
    postPhotoValue: '',
    unLockListId: -1,
    unLockListValue: '',
    phoneMemoryId: -1,
    phoneMemoryValue: '',
    phoneRunningMemoryId: -1,
    phoneRunningMemoryValue: '',
  })
   
    console.log("下拉刷新")
    var that = this;
    wx.showNavigationBarLoading()

    setTimeout(() => {
      that.nextOnLoad()

      that.reFreshCpu()
      that.reFreshScreenSize()
      that.reFreshscreenList()
      that.reFreshunLockList()
      that.reFreshprePhoto()
      that.reFreshpostPhoto()
      that.reFreshphoneMemory()
      that.reFreshphoneRunningMemory()

      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
 
},
reFreshCpu:function(){
  var length = this.data.cpuList.length
  for(var i=0;i<length;i++){
    this.data.cpuList[i].name = 'grey'
  }
},
reFreshScreenSize: function () {
    var length = this.data.screenSizeList.length
    for (var i = 0; i < length; i++) {
      this.data.screenSizeList[i].name = 'grey'
    }
},
reFreshscreenList: function () {
    var length = this.data.screenList.length
    for (var i = 0; i < length; i++) {
      this.data.screenList[i].name = 'grey'
    }
},
reFreshunLockList: function () {
    var length = this.data.unLockList.length
    for (var i = 0; i < length; i++) {
      this.data.unLockList[i].name = 'grey'
    }
},
reFreshprePhoto: function () {
    var length = this.data.prePhoto.length
    for (var i = 0; i < length; i++) {
      this.data.prePhoto[i].name = 'grey'
    }
},
reFreshpostPhoto: function () {
    var length = this.data.postPhoto.length
    for (var i = 0; i < length; i++) {
      this.data.postPhoto[i].name = 'grey'
    }
},
reFreshphoneMemory: function () {
    var length = this.data.phoneMemory.length
    for (var i = 0; i < length; i++) {
      this.data.phoneMemory[i].name = 'grey'
    }
},
reFreshphoneRunningMemory: function () {
    var length = this.data.phoneRunningMemory.length
    for (var i = 0; i < length; i++) {
      this.data.phoneRunningMemory[i].name = 'grey'
    }
},



//????????????????????????????获得手机参数????????????????????
chooseCpu:function(e){
  console.log("输出ID的值")
  console.log(e.currentTarget.id)
  var id = e.currentTarget.id
  if(this.data.cpuid===-1){
    var mydata = this.data.cpuList
    mydata[id].name = 'blue'
    this.setData({
      cpuList: mydata,
      cpuid:id,
      cpuValue:this.data.cpuList[id].title
    })
  } else if (this.data.cpuid===id){
    var mydata = this.data.cpuList
    mydata[id].name = 'grey'
    this.setData({
      cpuList: mydata,
      cpuid: -1,
      cpuValue:''
    })
  }
  console.log(this.data.cpuValue)
},
choosescreenSize:function(e){
  var id = e.currentTarget.id
  if (this.data.screenSizeId === -1) {
    var mydata = this.data.screenSizeList
    mydata[id].name = 'blue'
    this.setData({
      screenSizeList: mydata,
      screenSizeId: id,
      screenSizeValue: this.data.screenSizeList[id].title
    })
  } else if (this.data.screenSizeId === id) {
    var mydata = this.data.screenSizeList
    mydata[id].name = 'grey'
    this.setData({
      screenSizeList: mydata,
      screenSizeId: -1,
      screenSizeValue:'',
    })
  }
},
choosescreen: function (e) {
    var id = e.currentTarget.id
   if (this.data.screenId === -1) {
      var mydata = this.data.screenList
      mydata[id].name = 'blue'
      this.setData({
        screenList: mydata,
        screenId: id,
        screenValue: this.data.screenList[id].title
      })
   } else if (this.data.screenId === id) {
     var mydata = this.data.screenList
     mydata[id].name = 'grey'
     this.setData({
       screenList: mydata,
       screenId: -1,
       screenValue:'',
     })
   }
},
chooseprePhoto: function (e) {
    var id = e.currentTarget.id
    if (this.data.prePhotoId === -1) {
      var mydata = this.data.prePhoto
      mydata[id].name = 'blue'
      this.setData({
        prePhoto: mydata,
        prePhotoId: id,
        prePhotoValue: this.data.prePhoto[id].title
      })
    } else if (this.data.prePhotoId === id) {
      var mydata = this.data.prePhoto
      mydata[id].name = 'grey'
      this.setData({
        prePhoto: mydata,
        prePhotoId: -1,
        prePhotoValue: '',
      })
    }
},
choosepostPhoto: function (e) {
    var id = e.currentTarget.id
    if (this.data.postPhotoId === -1) {
      var mydata = this.data.postPhoto
      mydata[id].name = 'blue'
      this.setData({
        postPhoto: mydata,
        postPhotoId: id,
        postPhotoValue: this.data.postPhoto[id].title
      })
    } else if (this.data.postPhotoId === id) {
      var mydata = this.data.postPhoto
      mydata[id].name = 'grey'
      this.setData({
        postPhoto: mydata,
        postPhotoId: -1,
        postPhotoValue: '',
      })
    }
},
chooseunLockList: function (e) {
    var id = e.currentTarget.id
    if (this.data.unLockListId === -1) {
      var mydata = this.data.unLockList
      mydata[id].name = 'blue'
      this.setData({
        unLockList: mydata,
        unLockListId: id,
        unLockListValue: this.data.unLockList[id].title
      })
    }
    else if (this.data.unLockListId === id) {
      var mydata = this.data.unLockList
      mydata[id].name = 'grey'
      this.setData({
        unLockList: mydata,
        unLockListId: -1,
        unLockListValue:'',
      })
    }
},
choosephoneMemory:function(e){
  var id = e.currentTarget.id
  if (this.data.phoneMemoryId === -1) {
    var mydata = this.data.phoneMemory
    mydata[id].name = 'blue'
    this.setData({
      phoneMemory: mydata,
      phoneMemoryId: id,
      phoneMemoryValue: this.data.phoneMemory[id].title
    })
  } else if (this.data.phoneMemoryId === id) {
    var mydata = this.data.phoneMemory
    mydata[id].name = 'grey'
    this.setData({
      phoneMemory: mydata,
      phoneMemoryId: -1,
      phoneMemoryValue: '',
    })
  }
},
choosephoneRunningMemory: function (e) {
    var id = e.currentTarget.id
  if (this.data.phoneRunningMemoryId === -1) {
      var mydata = this.data.phoneRunningMemory
      mydata[id].name = 'blue'
      this.setData({
        phoneRunningMemory: mydata,
        phoneRunningMemoryId: id,
        phoneRunningMemoryValue: this.data.phoneRunningMemory[id].title
      })
  } else if (this.data.phoneRunningMemoryId === id) {
    var mydata = this.data.phoneRunningMemory
    mydata[id].name = 'grey'
    this.setData({
      phoneRunningMemory: mydata,
      phoneRunningMemoryId: -1,
      phoneRunningMemoryValue: '',
    })
  }


  console.log(this.data.cpuValue)
  console.log(this.data.screenSizeValue)
  console.log(this.data.screenValue)
  console.log(this.data.prePhotoValue)
  console.log(this.data.postPhotoValue)
  console.log(this.data.unLockListValue)
  console.log(this.data.phoneMemoryValue) 
  console.log(this.data.phoneRunningMemoryValue)
},


//????????????????????????????????????????计算分数?????????????????????????????????????
setCpuProption: function () {
    var cpu = this.data.cpuValue
    for (var i = 0; i < this.data.newcpuList.length; i++) {
      if (cpu === this.data.newcpuList[i].name) {
        this.setData({
          newsum: this.data.newcpuList[i].proportion + this.data.newsum,
        })
      }
    }
},
setScreenSizeProption: function () {
  var value = this.data.screenSizeValue
  for (var i = 0; i < this.data.newscreenSizeList.length; i++) {
    if (value === this.data.newscreenSizeList[i].name) {
      this.setData({
        newsum: this.data.newscreenSizeList[i].proportion + this.data.newsum,
      })
    }
  }
},
setScreenProption: function () {
  var value = this.data.screenValue
  for (var i = 0; i < this.data.newscreenList.length; i++) {
    if (value === this.data.newscreenList[i].name) {
      this.setData({
        newsum: this.data.newscreenList[i].proportion + this.data.newsum,
      })
    }
  }
},
setUnLockListProption: function () {
  var value = this.data.unLockListValue
  for (var i = 0; i < this.data.newunLockList.length; i++) {
    if (value === this.data.newunLockList[i].name) {
      this.setData({
        newsum: this.data.newunLockList[i].proportion + this.data.newsum,
      })
    }
  }
},
setPrePhotoProption: function () {
  var value = this.data.prePhotoValue
  for (var i = 0; i < this.data.newprePhoto.length; i++) {
    if (value === this.data.newprePhoto[i].name) {
      this.setData({
        newsum: this.data.newprePhoto[i].proportion + this.data.newsum,
      })
    }
  }
},
setPostPhotoProption: function () {
  var value = this.data.postPhotoValue
  for (var i = 0; i < this.data.newpostPhoto.length; i++) {
    if (value === this.data.newpostPhoto[i].name) {
      this.setData({
        newsum: this.data.newpostPhoto[i].proportion + this.data.newsum,
      })
    }
  }
},
setPhoneMemoryProption: function () {
  var value = this.data.phoneMemoryValue
  for (var i = 0; i < this.data.newphoneMemory.length; i++) {
    if (value === this.data.newphoneMemory[i].name) {
      this.setData({
        newsum: this.data.newphoneMemory[i].proportion + this.data.newsum,
      })
    }
  }
},
setPhoneRunningMemoryProption: function () {
  var value = this.data.phoneRunningMemoryValue
  for (var i = 0; i < this.data.newphoneRunningMemory.length; i++) {
    if (value === this.data.newphoneRunningMemory[i].name) {
      this.setData({
        newsum: this.data.newphoneRunningMemory[i].proportion + this.data.newsum,
      })
    }
  }
},



showNum:function(){
  if (this.data.cpuValue===''){
    wx.showToast({
      title: '请选择CPU类型',
    })
  } else if (this.data.screenSizeValue===''){
    wx.showToast({
      title: '请选择手机尺寸',
    })
  } else if (this.data.screenValue === '') {
    wx.showToast({
      title: '请选择手机屏幕类型',
    })
  } else if (this.data.prePhotoValue === '') {
    wx.showToast({
      title: '请选择前置摄像像素',
    })
  } else if (this.data.postPhotoValue === '') {
    wx.showToast({
      title: '请选择后置摄像像素',
    })
  } else if (this.data.unLockListValue === '') {
    wx.showToast({
      title: '请选择手机解锁方式',
    })
  } else if (this.data.phoneMemoryValue === '') {
    wx.showToast({
      title: '请选择手机运行内存',
    })
  } else if (this.data.phoneRunningMemoryValue === '') {
    wx.showToast({
      title: '请选择手机存储容量',
    })
  }else{
    this.setCpuProption()
    this.setScreenSizeProption()
    this.setScreenProption()
    this.setUnLockListProption()
    this.setPrePhotoProption()
    this.setPostPhotoProption()
    this.setPhoneMemoryProption()
    this.setPhoneRunningMemoryProption()
    console.log(this.data.oldsum)
    console.log(this.data.newsum)
    console.log(parseInt(this.data.oldsum) + parseInt(this.data.newsum))

    this.setData({
      oldProportion: Math.round((parseInt(this.data.oldsum)) / (parseInt(this.data.oldsum) + parseInt(this.data.newsum))*100),
    })
    this.setData({
      newProportion: (parseInt(this.data.allSum) - parseInt(this.data.oldProportion)),
    })
    console.log(this.data.newsum)
    console.log("输出旧手机的比例")
    console.log(this.data.oldProportion)
    console.log(this.data.newProportion)

  }
}


})