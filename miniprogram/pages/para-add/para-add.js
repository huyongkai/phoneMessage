var util = require('../../utils/util.js');
var app = getApp();

Page({

  data: {
    tempFilePath: '',
    phonefileID: '',
    phoneBrand:'',
    phoneType:'',
    phonePrice:0,
    phoneBatteryCapacity: 0,
    phoneMemory:0,
    phoneRunningMemory:0,
    phoneOperator:'',
    indexMobilePhoneUnlock:0,
    indexCPUModel:0,
    indexScreentype:0,
    indexMainscreensize:0,
    itemMobilePhoneUnlock:'',
    itemCPUModel:'',
    itemScreentype: '',
    itemMainscreensize: '',
    MobilePhoneUnlock: ['面部识别', '虹膜识别', '前置指纹', '后置指纹','侧面指纹','屏幕指纹','密码识别'],
    CPUModel: ['骁龙855', '骁龙845', '骁龙835', '骁龙821','骁龙710','骁龙675','骁龙670','骁龙660','骁龙450B', '麒麟980', '麒麟970', '麒麟960', '麒麟710','联发科HelioP70','高通Adreno439','苹果A12','苹果A10'],
    Screentype: ['水滴屏', '刘海屏', '极点屏', '普通屏','全面屏'],
    Mainscreensize: ['6.5英寸以上', '6.1-6.4英寸', '5.6-6.0英寸', '5.5英寸', '5.1-5.4英寸', '5.0英寸', '4.5-4.9英寸', '4.4英寸'],
  
   multiArray: [['OPPO', 'VIVO', '华为', '荣耀', '三星', '苹果', '一加', '努比亚', '魅族', '联想', '金立', '中兴', '锤子'], 
                 ['OPPO Reno', 'OPPO R17', 'OPPO FindX', 'OPPO A5', 'OPPO K1', 'OPPO R17pro', 'OPPO A7']
                ],
    multiIndex: [0, 0],
    phoneArray:[['3GB','4GB','6GB','8GB','10GB','12GB'],['32GB','64GB','128GB','256GB','512GB'],['电信','移动','联通','全网通']],
    phoneIndex:[0,0,0],
    phoneTypeId:'',
    phoneFrontpixel:0,
    phonePostpixel:0
  },

  bindMultiPickerChangePhone(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      phoneIndex: e.detail.value
    })
    var index1=e.detail.value[0]
    var index2 = e.detail.value[1]
    var index3 = e.detail.value[2]
    console.log(this.data.phoneIndex)
    console.log(this.data.phoneArray[0][index1])
    console.log(this.data.phoneArray[1][index2])
    console.log(this.data.phoneArray[2][index3])
    this.setData({
      phoneMemory: this.data.phoneArray[0][index1],
      phoneRunningMemory: this.data.phoneArray[1][index2],
      phoneOperator:this.data.phoneArray[2][index3]
    })
  },
  
  


PhoneImage: function(res) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("选择手机封面成功，继续进行下一步")
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0]);
        that.setData({
          tempFilePath: tempFilePaths[0]
        })
        console.log("开始调用uploadfile函数")
        that.uploadfile()
      }
    })
},



uploadfile: function () {
    var TIME = util.formatTime(new Date());
    var that = this;
    wx.cloud.uploadFile({
      cloudPath: 'Phone' + '---' + TIME+'.jpg',
      filePath: that.data.tempFilePath,
      success: res => {
        console.log("上传手机封面成功，继续进行下一步")
        that.setData({
          phonefileID: res.fileID
        })
        console.log("上传手机封面成功")
        console.log(that.data.phonefileID)
      },
      fail: function (res) {
        console.log("uploadFile fail")
      }
    })
},


bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    console.log(this.data.multiIndex)
    var index0=this.data.multiIndex[0]
    var index1=this.data.multiIndex[1]
    console.log(index0)
    console.log(this.data.multiArray[0][index0])
    console.log(index1)
    console.log(this.data.multiArray[1][index1])
    this.setData({
      phoneBrand: this.data.multiArray[0][index0],
      phoneType: this.data.multiArray[1][index1]
    })
  console.log(this.data.phoneBrand)
  console.log(this.data.phoneType)
},



bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['OPPO Reno', 'OPPO R17', 'OPPO FindX', 'OPPO A5', 'OPPO K1', 'OPPO R17pro', 'OPPO A7']
            break
          case 1:
            data.multiArray[1] = ['vivo X27', 'vivo iQOO', 'vivo X27Pro', 'vivo S1', 'vivo X23', 'vivo Y93', 'vivo NEX双屏版', 'vivo X23幻彩版']
            break
          case 2:
            data.multiArray[1] = ['华为P30Pro', '华为P30', '华为Mate 20Pro', '华为nova4', '华为Mate X', '华为P20', '华为P20Pro', '华为nova3']
            break
          case 3:
            data.multiArray[1] = ['荣耀V20', '荣耀10', '荣耀Play', '荣耀Note10']
            break
          case 4:
            data.multiArray[1] = ['三星GalaxyS10', '三星Galaxy Fold', '三星Galaxy A8s', '三星Galaxy A60']
            break
          case 5:
            data.multiArray[1] = ['苹果iPhone XS', '苹果iPhone XR', '苹果iPhone SE2', '苹果iPhone X1']
            break
          case 6:
            data.multiArray[1] = ['一加6T', '一加7', '一加5', '一加7PRo']
            break
          case 7:
            data.multiArray[1] = ['努比亚红魔3', '努比亚X', '努比亚Z17', '努比亚Z18']
            break
          case 8:
            data.multiArray[1] = ['魅族16S', '魅族16th', '魅族Note9', '魅族16X']
            break
          case 9:
            data.multiArray[1] = ['联想Z6Pro', '联想Z5Pro', '联想Z5s', '联想K5 Pro']
            break
          case 10:
            data.multiArray[1] = ['金立M2017', '金立M7', '金立S10', '金立M6']
            break
          case 11:
            data.multiArray[1] = ['中兴AXON10Pro', '中兴Blade V10', '中兴AxonM', '中兴AXON9']
            break
          case 12:
            data.multiArray[1] = ['锤子Pro2S', '锤子R1', '锤子坚果3', '锤子R3']
            break
        }
        data.multiIndex[1]=0
        break
    }
    console.log(data.multiIndex)
    this.setData(data)
    console.log(data)
},
 












bindPickerChangeMainscreensize:function(e){
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    indexMainscreensize: e.detail.value
  })
  console.log(this.data.Mainscreensize[this.data.indexMainscreensize])
  this.setData({
    itemMainscreensize: this.data.Mainscreensize[this.data.indexMainscreensize]
  })
  console.log(this.data.itemMainscreensize)
},
bindPickerChangeScreentype:function(e){
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    indexScreentype: e.detail.value
  })
  console.log(this.data.Screentype[this.data.indexScreentype])
  this.setData({
    itemScreentype: this.data.Screentype[this.data.indexScreentype]
  })
  console.log(this.data.itemScreentype)
},
bindPickerChangeCPUModel:function(e){
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    indexCPUModel: e.detail.value
  })
  console.log(this.data.CPUModel[this.data.indexCPUModel])
  this.setData({
    itemCPUModel: this.data.CPUModel[this.data.indexCPUModel]
  })
  console.log(this.data.itemCPUModel)
},
bindPickerChangeMobilePhoneUnlock:function(e){
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    indexMobilePhoneUnlock: e.detail.value
  })
  console.log(this.data.MobilePhoneUnlock[this.data.indexMobilePhoneUnlock])
  this.setData({
    itemMobilePhoneUnlock: this.data.MobilePhoneUnlock[this.data.indexMobilePhoneUnlock]
  })
  console.log(this.data.itemMobilePhoneUnlock)
},


inputphonePrice:function(e){
  console.log(e.detail.value)
  this.setData({
    phonePrice: e.detail.value
  })
  console.log(this.data.phonePrice)
},


inputphoneBatteryCapacity:function(e){
  console.log(e.detail.value)
  this.setData({
    phoneBatteryCapacity: e.detail.value
  })
  console.log(this.data.phoneBatteryCapacity)
},


inputphoneFrontpixel:function(e){
  console.log(e.detail.value)
  this.setData({
    phoneFrontpixel: e.detail.value
  })
  console.log(this.data.phoneFrontpixel)
},
inputphonePostpixel:function(e){
  console.log(e.detail.value)
  this.setData({
    phonePostpixel: e.detail.value
  })
  console.log(this.data.phonePostpixel)
},





savePhone:function(){
  var that=this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:'searchPhoneId',
      phoneBrand: that.data.phoneBrand,
    },
    success:function(res){
      console.log("searchPhoneId success")
      console.log(res.result.data[0])
      that.setData({
        phoneTypeId: res.result.data[0]._id,
      })
     that.toSavePhone()
    },
    fail:function(res){ 
      console.log("searchPhoneId fail") 
    }
  })
},



toSavePhone:function(){
  var that=this
  wx.cloud.callFunction({
    name:'jdbc',
    data:{
      type:'savePhone',
      phonefileID: that.data.phonefileID,
      phoneBrand: that.data.phoneBrand,
      phoneType: that.data.phoneType,
      phonePrice: that.data.phonePrice,
      phoneBatteryCapacity:that.data.phoneBatteryCapacity,
      phoneMemory: that.data.phoneMemory,
      phoneRunningMemory: that.data.phoneRunningMemory,
      phoneOperator: that.data.phoneOperator,
      itemMobilePhoneUnlock: that.data.itemMobilePhoneUnlock,
      itemCPUModel: that.data.itemCPUModel,
      itemScreentype: that.data.itemScreentype,
      itemMainscreensize: that.data.itemMainscreensize,
      phoneTypeId:that.data.phoneTypeId,
      phoneFrontpixel: that.data.phoneFrontpixel,
      phonePostpixel:that.data.phonePostpixel
    },
    success:function(res){
      console.log("savePhone success")
      that.setData({
        phoneFrontpixel:0,
        phonePostpixel:0,
        phonePrice:0,
        phoneBatteryCapacity:0,
        indexMainscreensize:0,
        indexMobilePhoneUnlock:0,
        indexCPUModel:0,
        indexScreentype:0,
        phoneIndex: [0, 0, 0],
        multiIndex: [0, 0],
      })
    },
    fail:function(res){
      console.log("savePhone fail")
    }
  })
}









})



