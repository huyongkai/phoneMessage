const app = getApp();
Page({
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: '/images/phone1.png',
      },
      {
        id: 1,
        type: 'image',
        url: '/images/phone2.png',
      },
      {
        id: 2,
        type: 'image',
        url: '/images/phone3.png'
      },
      {
        id: 3,
        type: 'image',
        url: '/images/phone4.png'
      },
      {
        id: 4,
        type: 'image',
        url: '/images/phone5.png'
      },
      {
        id: 5,
        type: 'image',
        url: '/images/phone6.png'
      }
    ],
    ColorList: [
    {
      title: '荣耀',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '苹果',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '华为',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '小米',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: 'OPPO',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '三星',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: 'VIVO',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '一加',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '努比亚',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '魅族',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '联想',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '金立',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '中兴',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '黑莓',
      name: 'black',
      color: '#333333'
    },
    {
      title: '锤子',
      name: 'white',
      color: '#ffffff'
    }
    ],
    username:'胡永凯',
    password:'hyk',
    partArticalList:[]
},


  onLoad() {
    console.log("输出通过登录之后的用户信息")
    console.log(app.globalData.userInfo)
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.getPartArtical()
  },
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



getPartArtical:function(){
      var that=this
      wx.cloud.callFunction({
        name: 'jdbc',
        data: {
          type:'articalList',
          username:this.data.username,
          password:this.data.password
        },
        success:function(res) {
          console.log("调用getPartArtical成功")
          console.log(res.result.data)
          var length=res.result.data.length
          console.log(length)
          if(length>3) length=3
          console.log(length)
          var mydata=[]
          for(var i=0;i<length;i++){
            mydata.push(res.result.data[i])
            console.log(mydata)
          }
          that.setData({
            partArticalList: mydata
          })
          console.log(that.data.partArticalList)
        },
        fail:function(){
          console.log('fail')
        }
      })
},
 

nav:function(e){
  console.log(e.currentTarget.id)
  var id = e.currentTarget.id
  var articalID=this.data.partArticalList[id]._id
  wx.navigateTo({
    url: '/pages/talke-artical/talke-artical?articalID=' + articalID,
  })
}
  
})