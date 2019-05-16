//获取应用实例  
var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');

var list = require('./countSum.js');

Page({
  firstIndex: -1,
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol: 3,
    skin: false,

    phoneBrand:'',
    phoneType:'',
   
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, //tab切换  
  
   itemData: {},
   phoneDetail:[],



    cardCur: 0,
    swiperList: [],


    ColorList: app.globalData.ColorList,
    color: 'red',

    cpuList:[],
    screenSizeList:[],
    screenList:[],
    unLockList:[],
    prePhoto:[],
    postPhoto:[],
    phoneMemory:[],
    phoneRunningMemory:[],
    PhoneList:[],
    sum:0,
    checkbox:[],
    numData:[],
    itemPrice:0,
    itemNum:0,
    itemPrice:0,
    itemPriceProgress:0,
  },

//????????????????????????????????????????????????????????????????????????轮播图??????????????????????????????
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

//??????????????????????????????????????进度条????????????????????????????????????????????????????????
  showModel(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  },


//???????????????????????????????????????????onLoad函数的??????????????????????????????????????????????????????????
onLoad: function (options) {
    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)

    this.setData({
      phoneType: options.phoneType,
      phoneBrand: options.phoneBrand,
      cpuList: list.cpuList,
      screenSizeList: list.screenSizeList,
      screenList: list.screenList,
      unLockList: list.unLockList,
      prePhoto: list.prePhoto,
      postPhoto: list.postPhoto,
      phoneMemory: list.phoneMemory,
      phoneRunningMemory: list.phoneRunningMemory,
      PhoneList:list.CrList,
      checkbox: list.checkbox
    })
    console.log("输出phoneType的值")
    console.log(this.data.phoneType)
    console.log(this.data.phoneBrand)
    console.log("调用getPhoneDetail函数")
    this.getPhoneDetail()
    console.log("输出cpuList的值")
    console.log(this.data.cpuList)
},



getPhoneDetail:function(){
  var that=this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:'getPhoneDetail',
      phoneBrand: that.data.phoneBrand
    },
    success:function(res){
      console.log("getPhoneDetail success")
      console.log(res.result.data[0].data)
      var length = res.result.data[0].data.length
      console.log(length)
      for(var i=1;i<length;i++){
        if (res.result.data[0].data[i].phoneType===that.data.phoneType)
        {
          that.setData({
            phoneDetail: res.result.data[0].data[i]
          })
          break
        }
      }
      console.log(that.data.phoneDetail)
      that.getSwiperList()
      that.setCpuProption()
      that.setScreenSizeProption()
      that.setScreenProption()
      that.setUnLockListProption()
      that.setPrePhotoProption()
      that.setPostPhotoProption()
      that.setPhoneMemoryProption()
      that.setPhoneRunningMemoryProption()
    },
    fail:function(res){
      console.log("getPhoneDetail fail")
    }
  })
},


getSwiperList:function(){
  var mydata=[]
  for(var i=0;i<6;i++){
    mydata.push({
      id: i,
      type: 'image',
      url: this.data.phoneDetail.phonefileID
    })
  }
  this.setData({
    swiperList: mydata
  })
  console.log(this.data.swiperList)
  this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
},

//?????????????????????????????/设置进度条里面的参数？？？？？？？？？？？？？？？？？？？？？？？？？？？
setCpuProption:function(){
  var cpu = this.data.phoneDetail.itemCPUModel
  console.log("输出CPU的值")
  console.log(cpu)
  for(var i=0;i<this.data.cpuList.length;i++){
    if(cpu===this.data.cpuList[i].name){
      var mydata = this.data.phoneDetail
      mydata.cpuProportion = this.data.cpuList[i].proportion
      var num=this.data.numData
      num.push({
        name:'cpuProportion',
        int: this.data.cpuList[i].proportion,
      })
      this.setData({
        phoneDetail:mydata,
        sum: this.data.cpuList[i].proportion+this.data.sum,
        numData:num
      })
    }
  }
  console.log("输出phoneDetail的值")
  console.log(this.data.phoneDetail)
  console.log("输出sum的值")
  console.log(this.data.sum)
  console.log("输出numData的值")
  console.log(this.data.numData)
},
setScreenSizeProption: function () {
  var itemMainscreensize = this.data.phoneDetail.itemMainscreensize
  for (var i = 0; i < this.data.screenSizeList.length; i++) {
    if (itemMainscreensize === this.data.screenSizeList[i].name) {
        var mydata = this.data.phoneDetail
        mydata.screenSizeProption = this.data.screenSizeList[i].proportion
        var num = this.data.numData
        num.push({
          name: 'screenSizeProption',
          int: this.data.screenSizeList[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.screenSizeList[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setScreenProption: function () {
  var itemScreentype = this.data.phoneDetail.itemScreentype
    for (var i = 0; i < this.data.screenList.length; i++) {
      if (itemScreentype === this.data.screenList[i].name) {
        var mydata = this.data.phoneDetail
        mydata.screenProption = this.data.screenList[i].proportion
        var num = this.data.numData
        num.push({
          name: 'screenProption',
          int: this.data.screenList[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.screenList[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setUnLockListProption: function () {
  var itemMobilePhoneUnlock = this.data.phoneDetail.itemMobilePhoneUnlock
  for (var i = 0; i < this.data.unLockList.length; i++) {
    if (itemMobilePhoneUnlock === this.data.unLockList[i].name) {
        var mydata = this.data.phoneDetail
        mydata.unlockProption = this.data.unLockList[i].proportion
        var num = this.data.numData
        num.push({
          name: 'unlockProption',
          int: this.data.unLockList[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.unLockList[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setPrePhotoProption: function () {
  var phoneFrontpixel = this.data.phoneDetail.phoneFrontpixel
  for (var i = 0; i < this.data.prePhoto.length; i++) {
    if (phoneFrontpixel === this.data.prePhoto[i].name) {
        var mydata = this.data.phoneDetail
         mydata.prePhotoProption = this.data.prePhoto[i].proportion
         var num = this.data.numData
         num.push({
           name: 'prePhotoProption',
           int: this.data.prePhoto[i].proportion,
          })
         this.setData({
          phoneDetail: mydata,
          sum: this.data.prePhoto[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setPostPhotoProption: function () {
  var phonePostpixel = this.data.phoneDetail.phonePostpixel
  for (var i = 0; i < this.data.postPhoto.length; i++) {
    if (phonePostpixel === this.data.postPhoto[i].name) {
        var mydata = this.data.phoneDetail
        mydata.postPhotoProption = this.data.postPhoto[i].proportion
        var num = this.data.numData
        num.push({
          name: 'postPhotoProption',
          int: this.data.postPhoto[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.postPhoto[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setPhoneMemoryProption: function () {
  var phoneMemory = this.data.phoneDetail.phoneMemory
  for (var i = 0; i < this.data.phoneMemory.length; i++) {
    if (phoneMemory === this.data.phoneMemory[i].name) {
        var mydata = this.data.phoneDetail
        mydata.phoneMemoryProption = this.data.phoneMemory[i].proportion
        var num = this.data.numData
        num.push({
          name: 'phoneMemoryProption',
          int: this.data.phoneMemory[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.phoneMemory[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
},
setPhoneRunningMemoryProption: function () {
  var phoneRunningMemory = this.data.phoneDetail.phoneRunningMemory
  for (var i = 0; i < this.data.phoneRunningMemory.length; i++) {
    if (phoneRunningMemory === this.data.phoneRunningMemory[i].name) {
        var mydata = this.data.phoneDetail
        mydata.phoneRunningMemoryProption = this.data.phoneRunningMemory[i].proportion
        var num = this.data.numData
        num.push({
          name: 'phoneRunningMemoryProption',
          int: this.data.phoneRunningMemory[i].proportion,
        })
        this.setData({
          phoneDetail: mydata,
          sum: this.data.phoneRunningMemory[i].proportion + this.data.sum,
          numData: num
        })
      }
    }
    console.log("输出phoneDetail的值")
    console.log(this.data.phoneDetail)
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出numData的值")
    console.log(this.data.numData)
    this.setData({
      itemPrice: (this.data.phoneDetail.phonePrice)*(1.0)/(this.data.sum),
      itemPriceProgress: (this.data.phoneDetail.phonePrice) * (1.0) / (this.data.sum)*(10),
    })
    console.log("输出sum的值")
    console.log(this.data.sum)
    console.log("输出单价的值")
    console.log(this.data.phoneDetail.phonePrice)
    console.log("输出性价比的值")
    console.log(this.data.itemPrice)
},


//???????????????????????????????????????????????底部单选框,选择权重???????????????????????????
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    console.log("输出id的值")
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    var des = this.data.PhoneList[id].des
    console.log(des)
    console.log("输出numData的长度")
    console.log(this.data.numData.length)
    for (var i = 0; i < this.data.numData.length;i++){
      if(this.data.numData[i].name===des){
        console.log(this.data.numData[i].int)
        this.setData({
          itemPrice: this.data.numData[i].int
        })
        break;
      }
    }
    console.log("输出单价的值")
    console.log(this.data.itemPrice)
  },
  toShowResult:function(e){
     wx.showModal({
       title: '评测结果',
       content: '该手机最后得分为:'+this.data.sum+"分"
     })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.setData({
      sum:this.data.sum+(this.data.itemNum-1)*this.data.itemPrice
    })
    console.log("输出最终sum的值")
    console.log(this.data.sum)
    wx.showModal({
      title: '评测结果',
      content: '该手机最后得分为:' + this.data.sum + "分"
    })
  },
  chooseRadio(e) {
    console.log("输出id的值")
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    this.setData({
      itemNum: this.data.checkbox[id].value,
    })
    console.log("输出单选框的值")
    console.log(this.data.itemNum)
  },
//????????????????????????????????????????????????????/切换卡片？？??????????????????????????????？
  bindChange: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },


  initNavHeight: function () {////获取系统信息
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  bannerClosed: function () {
    this.setData({
      bannerApp: false,
    })
  },

  swichNav: function (e) {//点击tab切换
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },



//???????????????????????????????????????轮播,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },




//??????????????????????????进行手机PK??????????????????????????????????????
PK:function(){
  wx.navigateTo({
    url: '/pages/para-detail-pk/para-detail-pk?sum=' + this.data.sum + '&&oldPhoneName=' + this.data.phoneDetail.phoneType,
  })
}












})