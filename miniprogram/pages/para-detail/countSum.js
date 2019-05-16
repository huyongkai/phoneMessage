var list = {
  "cpuList": [
    { 'name': "骁龙855", 'proportion': 100 },
    { 'name': "骁龙845", 'proportion': 90 },
    { 'name': "骁龙835", 'proportion': 80 },
    { 'name': "骁龙821", 'proportion': 70 },
    { 'name': "骁龙710", 'proportion': 60 },
    { 'name': "骁龙675", 'proportion': 50 },
    { 'name': "骁龙670", 'proportion': 40 },
    { 'name': "骁龙660", 'proportion': 30 },
    { 'name': "骁龙450B", 'proportion': 20 },
    { 'name': "麒麟980", 'proportion': 100 },
    { 'name': "麒麟970", 'proportion': 90 },
    { 'name': "麒麟960", 'proportion': 80 },
    { 'name': "麒麟710", 'proportion': 70 },
    { 'name': "联发科HelioP70", 'proportion': 60 },
    { 'name': "高通Adreno439", 'proportion': 20 },
    { 'name': "苹果A12", 'proportion': 100 },
    { 'name': "苹果A10", 'proportion': 80 },
  ],
  "screenSizeList": [
    { 'name': "6.5英寸以上", 'proportion': 100 },
    { 'name': "6.1-6.4英寸", 'proportion': 90 },
    { 'name': "5.6-6.0英寸", 'proportion': 80 },
    { 'name': "5.5英寸", 'proportion': 70 },
    { 'name': "5.1-5.4英寸", 'proportion': 60 },
    { 'name': "5.0英寸", 'proportion': 50 },
    { 'name': "4.5-4.9英寸", 'proportion': 40 },
    { 'name': "4.4英寸", 'proportion': 30 },
  ],
  "screenList": [
    { 'name': "全面屏", 'proportion': 100 },
    { 'name': "极点屏", 'proportion': 80 },
    { 'name': "水滴屏", 'proportion': 60 },
    { 'name': "刘海屏", 'proportion': 40 },
    { 'name': "普通屏", 'proportion': 20 },
  ],
  "unLockList": [
    { 'name': "面部识别", 'proportion': 100 },
    { 'name': "虹膜识别", 'proportion': 80 },
    { 'name': "屏幕指纹", 'proportion': 60 },
    { 'name': "前置指纹", 'proportion': 40 },
    { 'name': "后置指纹", 'proportion': 40 },
    { 'name': "侧面指纹", 'proportion': 40 },
    { 'name': "密码识别", 'proportion': 20 },
  ],
  "prePhoto":[
    { 'name': "4800", 'proportion': 100 },
    { 'name': "3200", 'proportion': 80 },
    { 'name': "2500", 'proportion': 70 },
    { 'name': "2400", 'proportion': 60 },
    { 'name': "1200", 'proportion': 40 },
    { 'name': "800", 'proportion': 20 },
  ],
  "postPhoto": [
    { 'name': "4800", 'proportion': 100 },
    { 'name': "3200", 'proportion': 80 },
    { 'name': "2500", 'proportion': 70 },
    { 'name': "2400", 'proportion': 60 },
    { 'name': "2000", 'proportion': 55 },
    { 'name': "1600", 'proportion': 50 },
    { 'name': "1300", 'proportion': 45 },
    { 'name': "1200", 'proportion': 40 },
    { 'name': "800", 'proportion': 20 },
  ],
  "phoneMemory":[
    { 'name': "12GB", 'proportion': 100 },
    { 'name': "10GB", 'proportion': 90 },
    { 'name': "8GB", 'proportion': 80 },
    { 'name': "6GB", 'proportion': 70 },
    { 'name': "4GB", 'proportion': 60 },
    { 'name': "3GB", 'proportion': 50 },
  ],
  "phoneRunningMemory": [
    { 'name': "512GB", 'proportion': 100 },
    { 'name': "256GB", 'proportion': 80 },
    { 'name': "128GB", 'proportion': 60 },
    { 'name': "64GB", 'proportion': 40 },
    { 'name': "32GB", 'proportion': 20 },
  ],
  CrList: [{
    title: 'cpu',
    name: 'red',
    color: '#e54d42',
    des:'cpuProportion'
  },
  {
    title: '手机存储',
    name: 'orange',
    color: '#f37b1d',
    des: 'screenSizeProption'
  },
  {
    title: '屏幕类型',
    name: 'yellow',
    color: '#fbbd08',
    des: 'screenProption'
  },
  {
    title: '运行内存',
    name: 'olive',
    color: '#8dc63f',
    des: 'unlockProption'
  },
  {
    title: '前置摄像',
    name: 'green',
    color: '#39b54a',
    des: 'prePhotoProption'
  },
  {
    title: '后置摄像',
    name: 'cyan',
    color: '#1cbbb4',
    des: 'postPhotoProption'
  },
  ],
  checkbox: [{
    value: 1.0,
    name: 1.0,
  }, {
    value: 1.2,
    name: '1.2',
  }, {
    value: 1.4,
    name: '1.4',
  }, {
    value: 1.6,
    name: '1.6',
  }, {
    value: 1.8,
    name: '1.8',
  }, {
    value: 2.0,
    name: '2.0',
  }]
}


module.exports = list;




