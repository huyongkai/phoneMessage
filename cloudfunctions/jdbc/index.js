// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database();


function login(event, context) {
  console.log("进入login函数")
  return db.collection('user').where({
    username: event.username,
    password: event.password
  })
    .get({
      success: function (res) {
        console.log("login success")
      },
      fail: function (res) {
        console.log("login fail")
      }
    })
}

function checkUsername(event, context) {
  console.log("进入用户名检查函数")
  console.log(event.username)
  return db.collection('user').where({
    username: event.username,
  })
    .get({
      success: function (res) {
        console.log("checkUsername success")
      },
      fail: function (res) {
        console.log("checkUsername fail")
      }
    })
}


function insert(event, context) {
  console.log("进入insert函数")
  return new Promise(function (resolve, reject) {
    console.log("进入insert函数"),
      console.log(event.username),
      console.log(event.password),

      db.collection('user').add({
        data: {
          username: event.username,
          password: event.password,
          userLovePeople: [

          ],
          userVideo: [

          ],
          userArtical: [

          ],
          userLovePhone: [

          ],
          phoneNumber: '',
          email: '',
          backgroundImage: '',
          userPhoto: '',
          setUp: [

          ]
        },
        success: function (res) {
          console.log("insert  success")
        },
        fail: function (res) {
          console.log("insert fail")
        }
      })
  })
}

function getData(event, context) {
  console.log("进入getData函数")
  return db.collection('user').get();
}




function addBackgroundImage(event, context) {
  console.log("进入addBackgroundImage函数");
  console.log(event.backgroundImage);
  console.log(event.userID);

  return new Promise(function (resolve, reject) {
    db.collection('user').doc(event.userID).update({
      data: {
        backgroundImage: event.backgroundImage
      },
    })
  })
}



function addUserPhoto(event, context) {
  console.log("进入addUserPhoto函数");
  console.log(event.userPhoto);
  console.log(event.userID);

  return new Promise(function (resolve, reject) {
    db.collection('user').doc(event.userID).update({
      data: {
        userPhoto: event.userPhoto
      },
    })
  })
}



function saveArtical(event, context) {

  console.log("进入文章保存函数")
  console.log(event.articalImage)
  console.log(event.articalTitle)
  console.log(event.articalContent)
  console.log(event.articalAuthor)
  console.log(event.articalAuthorPhoto)
  console.log(event.articalTime)

  return db.collection('artical').add({
    data: {
      articalImage: event.articalImage,
      articalTitle: event.articalTitle,
      articalContent: event.articalContent,
      articalAuthor: event.articalAuthor,
      articalTalke: [],
      articalAuthorPhoto: event.articalAuthorPhoto,
      articalTime: event.articalTime
    },
    success: res => {
      console.log(articalID)
    }
  })
}




function changUserArtical(event, context) {
  console.log("进入修改用户文章列表界面")
  console.log(event.userID)
  console.log(event.articalID)
  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('user').doc(event.userID).update({
      data: {
        userArtical: _.push(event.articalID)
      },
    })
  })
}



function articalList(event, context) {
  console.log("进入获取文章列表页面")
  console.log(event.articalID)

  return db.collection('artical').where({
    _id: event.articalID
  })
    .get({
      success: function (res) {
        console.log("articalList success")
      },
      fail: function (res) {
        console.log("articalList fail")
      }
    })
}


function showArtical(event, context) {
  console.log("进入showArtical函数")
  return db.collection('artical').where({
    _id: event.articalID
  })
    .get({
      success: function (res) {
        console.log("showArtical success")
      },
      fail: function (res) {
        console.log("showArtical fail")
      }
    })
}



function saveArticalTalke(event, context) {

  console.log("进入saveArticalTalke函数")
  console.log(event.articalID)
  console.log(event.userId)
  console.log(event.articalTalke)
  console.log(event.articalTalkeTime)

  return new Promise(function (resolve, reject) {
    db.collection('articalTalke').add({
      data: {
        articalID: event.articalID,
        userId: event.userId,
        articalTalke: event.articalTalke,
        articalReplayList: [],
        articalTime: event.articalTalkeTime,
        articalTalkeLoveNum: 0
      },
      success: function (res) {
        console.log("saveArticalTalke  success")
      },
      fail: function (res) {
        console.log("saveArticalTalke fail")
      }
    })
  })

}



function showArticalTalkeList(event, context) {
  console.log("进入showArticalTalkeList函数")
  console.log(event.articalID)
  return db.collection('articalTalke').where({
    articalID: event.articalID,
  })
    .get({
      success: function (res) {
        console.log("checkUsername success")
      },
      fail: function (res) {
        console.log("checkUsername fail")
      }
    })
}




function addUsercontentToList(event, context) {
  console.log("进入addUsercontentToList函数")
  console.log(event.userId)
  return db.collection('user').where({
    _id: event.userId
  })
    .get({
      success: function (res) {
        console.log("addUsercontentToList success")
      },
      fail: function (res) {
        console.log("addUsercontentToList fail")
      }
    })

}





function saveArticalTalkeReplay(event, context) {
  console.log("进入saveArticalTalkeReplay函数")
  console.log(event.articalReplayToUser)
  console.log(event.articalReplayTocontent)
  console.log(event.articalTalkeReplay)
  console.log(event.articalID)
  console.log(event.userId)
  console.log(event.articalTalkeReplayTime)
  console.log(event.articalReplayList)
  console.log("测试结束")
  var mydata = event.articalReplayList
  mydata.push({
    'articalReplayToUser': event.articalReplayToUser,
    'articalReplayTocontent': event.articalReplayTocontent
  })
  console.log(mydata)

  return new Promise(function (resolve, reject) {
    db.collection('articalTalke').add({
      data: {
        articalID: event.articalID,
        userId: event.userId,
        articalTalke: event.articalTalkeReplay,
        articalTime: event.articalTalkeReplayTime,
        articalReplayList: mydata,
        articalTalkeLoveNum: 0
      },
      success: function (res) {
        console.log("saveArticalTalkeReplay  success")
      },
      fail: function (res) {
        console.log("saveArticalTalkeReplay fail")
      }
    })
  })
}




function saveVideo(event, context) {
  console.log("进入视频保存函数")
  console.log(event.videoPath)
  console.log(event.videoTitle)
  console.log(event.videoContent)
  console.log(event.videoAuthor)
  console.log(event.userID)
  console.log(event.videoAuthorPhoto)
  console.log(event.videoTime)
  console.log(event.videoLebal)

  return db.collection('video').add({
    data: {
      videoPath: event.videoPath,
      videoTitle: event.videoTitle,
      videoContent: event.videoContent,
      videoAuthorname: event.videoAuthor,
      videoTalke: [],
      videoAuthorid: event.userID,
      videoAuthorPhoto: event.videoAuthorPhoto,
      videoTime: event.videoTime,
      videoLebal: event.videoLebal
    },
    success: res => {
      console.log("saveVideo success")
    }
  })
}





function changUserVideo(event, context) {
  console.log("进入修改用户视频列表界面")
  console.log(event.userID)
  console.log(event.videoID)
  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('user').doc(event.userID).update({
      data: {
        userVideo: _.push(event.videoID)
      },
    })
  })
}



function videoList(event, context) {
  console.log("进入获取视频列表页面")
  console.log(event.videoID)

  return db.collection('video').where({
    _id: event.videoID
  })
    .get({
      success: function (res) {
        console.log("videoList success")
      },
      fail: function (res) {
        console.log("videoList fail")
      }
    })
}





function showVideo(event, context) {
  console.log("进入showVideo函数")
  console.log(event.videoID)
  return db.collection('video').where({
    _id: event.videoID
  })
    .get({
      success: function (res) {
        console.log("showVideo success")
      },
      fail: function (res) {
        console.log("showVideo fail")
      }
    })
}




function saveDanmu(event, context) {
  console.log("进入saveDanmu函数")
  console.log(event.videoID)
  console.log(event.text)
  console.log(event.color)
  console.log(event.time)

  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('video').doc(event.videoID).update({
      data: {
        videoTalke: _.push({
          'text': event.text,
          'color': event.color,
          'time': event.time
        })
      },
    })
  })


}





function showAboutVideoItem(event, context) {
  console.log("进入showAboutVideoItem函数")
  console.log(event.videoLebal)
  console.log(event.videoId)

  const _ = db.command
  return db.collection('video').where({
    _id: _.neq(event.videoId),
    videoLebal: event.videoLebal
  })
    .get({
      success: function (res) {
        console.log("showAboutVideoItem success")
      },
      fail: function (res) {
        console.log("showAboutVideoItem fail")
      }
    })



}







function searchPhoneId(event, context) {
  console.log("进入searchPhoneId函数")
  console.log(event.phoneBrand)
  return db.collection('phone').where({
    name: event.phoneBrand,
  })
    .get({
      success: function (res) {
        console.log("searchPhoneId success")
      },
      fail: function (res) {
        console.log("searchPhoneId fail")
      }
    })
}






function savePhone(event, context) {
  console.log("进入savePhone函数")
  console.log(event.phonefileID)
  console.log(event.phoneBrand)
  console.log(event.phoneType)
  console.log(event.phonePrice)
  console.log(event.phoneBatteryCapacity)
  console.log(event.phoneMemory)
  console.log(event.phoneRunningMemory)
  console.log(event.phoneOperator)
  console.log(event.itemMobilePhoneUnlock)
  console.log(event.itemCPUModel)
  console.log(event.itemScreentype)
  console.log(event.itemMainscreensize)
  console.log(event.phoneTypeId)
  console.log(event.phoneFrontpixel)
  console.log(event.phonePostpixel)

  var mydata = {
    'phonefileID': event.phonefileID,
    'phoneBrand': event.phoneBrand,
    'phoneType': event.phoneType,
    'phonePrice': event.phonePrice,
    'phoneBatteryCapacity': event.phoneBatteryCapacity,
    'phoneMemory': event.phoneMemory,
    'phoneRunningMemory': event.phoneRunningMemory,
    'phoneOperator': event.phoneOperator,
    'itemMobilePhoneUnlock': event.itemMobilePhoneUnlock,
    'itemCPUModel': event.itemCPUModel,
    'itemScreentype': event.itemScreentype,
    'itemMainscreensize': event.itemMainscreensize,
    'phoneFrontpixel': event.phoneFrontpixel,
    'phonePostpixel': event.phonePostpixel
  }
  console.log(mydata)

  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('phone').doc(event.phoneTypeId).update({
      data: {
        data: _.push(mydata)
      },
    })
  })

}






function getList(event, context) {
  console.log("进入getList函数")
  return db.collection('phone').get({
    success(res) {
      console.log(res.data)
    }
  })
}



function getPhoneDetail(event, context) {
  console.log("进入getPhoneDetail函数")
  console.log(event.phoneBrand)

  return db.collection('phone').where({
    name: event.phoneBrand
  })
    .get({
      success: function (res) {
        console.log("getPhoneDetail success")
      },
      fail: function (res) {
        console.log("getPhoneDetail fail")
      }
    })
}




function getAllArticalList(event, context) {
  console.log("进入getAllArticalList函数")
  return db.collection('artical').get();
}




function searchArtical(event, context) {
  console.log("进入searchArtical函数")
  return db.collection('artical').where({
    articalTitle: event.title,
  })
    .get({
      success: function (res) {
        console.log("searchArtical success")
      },
      fail: function (res) {
        console.log("searchArtical fail")
      }
    })
}

function getAllVideoList(event, context) {
  console.log("进入getAllVideoList函数")
  return db.collection('video').get();
}




function searchVideo(event, context) {
  console.log("进入searchVideo函数")
  return db.collection('video').where({
    videoTitle: event.title,
  })
    .get({
      success: function (res) {
        console.log("searchVideo success")
      },
      fail: function (res) {
        console.log("searchVideo fail")
      }
    })
}






function getAllPeople(event, context) {
  console.log("进入getAllPeople函数")
  console.log(event.username)

  const _ = db.command
  return db.collection('user').where({
    username: _.neq(event.username)
  })
    .get({
      success: function (res) {
        console.log("getAllPeople success")
      },
      fail: function (res) {
        console.log("getAllPeople fail")
      }
    })
}





function allWatchPeople(event, context) {
  console.log("进入allWatchPeople函数")
  console.log(event.username)

  const _ = db.command
  return db.collection('user').where({
    username: _.eq(event.username)
  })
    .get({
      success: function (res) {
        console.log("allWatchPeople success")
      },
      fail: function (res) {
        console.log("allWatchPeople fail")
      }
    })
}



function deleteWatchPeople(event, context) {
  console.log("进入deleteWatchPeople函数")
  console.log(event.userID)
  console.log(event.userLovePeople)
  return new Promise(function (resolve, reject) {
    db.collection('user').doc(event.userID).update({
      data: {
        userLovePeople: event.userLovePeople
      },
    })
  })

}




function addWatchPeople(event, context) {
  console.log("进入addWatchPeople函数")
  console.log(event.userID)
  console.log(event.userLovePeople)
  return new Promise(function (resolve, reject) {
    db.collection('user').doc(event.userID).update({
      data: {
        userLovePeople: event.userLovePeople
      },
    })
  })
}





function getUserLovePeople(event, context) {
  console.log("进入getUserLovePeople函数")
  console.log(event.username)
  const _ = db.command
  return db.collection('user').where({
    username: _.eq(event.username)
  })
    .get({
      success: function (res) {
        console.log("getUserLovePeople success")
      },
      fail: function (res) {
        console.log("getUserLovePeople fail")
      }
    })
}






function getAllWatchPeople(event, context) {
  console.log("进入getAllWatchPeople函数")
  console.log(event.userID)
  const _ = db.command
  return db.collection('user').where({
    _id: _.eq(event.userID)
  })
    .get({
      success: function (res) {
        console.log("getAllWatchPeople success")
      },
      fail: function (res) {
        console.log("getAllWatchPeople fail")
      }
    })
}




function addChat(event, context){
  console.log("进入addChat函数")
  console.log(event.mgs)
  console.log(event.chatPeopleName)
  console.log(event.chatPeoplePhoto)
  console.log(event.toChatPeopleName)
  console.log(event.toChatPeoplePhoto)
  console.log(event.chatId)
  

  return db.collection('chat').add({
    data: {
      chatPeopleName: event.chatPeopleName,
      chatPeoplePhoto: event.chatPeoplePhoto,
      toChatPeopleName: event.toChatPeopleName,
      toChatPeoplePhoto: event.toChatPeoplePhoto,
      mgs: event.mgs
    },
    success: res => {
      console.log("addChat success")
    }
  })

}





function searchChat(event, context){
  console.log("进入searchChat函数")
  console.log(event.chatPeopleName)
  console.log(event.toChatPeopleName)
  return db.collection('chat').where({
    chatPeopleName: event.chatPeopleName,
    toChatPeopleName: event.toChatPeopleName
  })
    .get({
      success: function (res) {
        console.log("searchChat success")
      },
      fail: function (res) {
        console.log("searchChat fail")
      }
    })
}




function changChat(event, context){
  console.log("进入changChat函数")
  console.log(event.mgs)
  console.log(event.chatPeopleName)
  console.log(event.chatPeoplePhoto)
  console.log(event.toChatPeopleName)
  console.log(event.toChatPeoplePhoto)
  console.log(event.chatId)


  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('chat').doc(event.chatId).update({
      data: {
        mgs: event.mgs
      },
    })
  })
}






function addFirstToPeopleChat(event, context){
  console.log("进入addFirstToPeopleChat函数")
  return db.collection('chat').add({
    data: {
      chatPeopleName: event.chatPeopleName,
      chatPeoplePhoto: event.chatPeoplePhoto,
      toChatPeopleName: event.toChatPeopleName,
      toChatPeoplePhoto: event.toChatPeoplePhoto,
      mgs: event.mgs
    },
    success: res => {
      console.log("addFirstToPeopleChat success")
    }
  })
}





function cC(event, context){
  console.log("进入cC函数")
  return new Promise(function (resolve, reject) {
    const _ = db.command
    db.collection('chat').doc(event.chatId).update({
      data: {
        mgs: event.mgs
      },
    })
  })

}


function getAllChat(event, context){
  console.log("进入getAllChat函数")
  console.log(event.username)

  return db.collection('chat').where({
    chatPeopleName: event.username,
  })
    .get({
      success: function (res) {
        console.log("getAllChat success")
      },
      fail: function (res) {
        console.log("getAllChat fail")
      }
    })


}


function toGetAllChat(event, context){
  console.log("进入toGetAllChat函数")
  console.log(event.username)

  return db.collection('chat').where({
    toChatPeopleName: event.username,
  })
    .get({
      success: function (res) {
        console.log("toGetAllChat success")
      },
      fail: function (res) {
        console.log("toGetAllChat fail")
      }
    })
}

function  deleteChat (event, context){
  console.log("进入deleteChat函数")
  console.log(event.chatId)
  return new Promise(function (resolve, reject) {
    db.collection('chat').doc(event.chatId).remove({
      success(res) {
        console.log("删除成功")
      }
    })
  })
  
}




function searchPhone(event, context){
  console.log("进入searchPhone函数")
  console.log(event.message)
  return db.collection('phone').where({
    name: event.message
  })
    .get({
      success: function (res) {
        console.log("searchPhone success")
      },
      fail: function (res) {
        console.log("searchPhone fail")
      }
    })
}



function searchArticalPart(event, context){
  console.log("进入searchArticalPart函数")
  console.log(event.message)
  return db.collection('artical').where({
    articalTitle: event.message
  })
    .get({
      success: function (res) {
        console.log("searchArticalPart success")
      },
      fail: function (res) {
        console.log("searchArticalPart fail")
      }
    })
}


function searchVideoPart(event, context){
  console.log("进入searchVideoPart函数")
  console.log(event.message)
  return db.collection('video').where({
    videoLebal: event.message
  })
    .get({
      success: function (res) {
        console.log("searchVideoPart success")
      },
      fail: function (res) {
        console.log("searchVideoPart fail")
      }
    })
}

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type === "insert") {
    return insert(event, context);
  }
  else if (event.type === "checkUsername") {
    return checkUsername(event, context);
  }
  else if (event.type === 'login') {
    return login(event, context);
  }
  else if (event.type === 'addBackgroundImage') {
    return addBackgroundImage(event, context);
  }
  else if (event.type === 'addUserPhoto') {
    return addUserPhoto(event, context);
  }
  else if (event.type === 'saveArtical') {
    return saveArtical(event, context);
  }
  else if (event.type === 'changUserArtical') {
    return changUserArtical(event, context);
  }
  else if (event.type === 'articalList') {
    return articalList(event, context);
  }
  else if (event.type === 'showArtical') {
    return showArtical(event, context);
  }
  else if (event.type === 'saveArticalTalke') {
    return saveArticalTalke(event, context);
  }
  else if (event.type === 'showArticalTalkeList') {
    return showArticalTalkeList(event, context);
  }
  else if (event.type === 'addUsercontentToList') {
    return addUsercontentToList(event, context);
  }
  else if (event.type === 'saveArticalTalkeReplay') {
    return saveArticalTalkeReplay(event, context);
  }
  else if (event.type === 'saveVideo') {
    return saveVideo(event, context);
  }
  else if (event.type === 'changUserVideo') {
    return changUserVideo(event, context);
  }
  else if (event.type === 'videoList') {
    return videoList(event, context);
  }
  else if (event.type === 'showVideo') {
    return showVideo(event, context);
  }
  else if (event.type === 'saveDanmu') {
    return saveDanmu(event, context);
  }
  else if (event.type === 'showAboutVideoItem') {
    return showAboutVideoItem(event, context);
  }
  else if (event.type === 'searchPhoneId') {
    return searchPhoneId(event, context);
  }
  else if (event.type === 'savePhone') {
    return savePhone(event, context);
  }
  else if (event.type === 'getList') {
    return getList(event, context);
  }
  else if (event.type === 'getPhoneDetail') {
    return getPhoneDetail(event, context);
  }
  else if (event.type === 'getAllArticalList') {
    return getAllArticalList(event, context);
  }
  else if (event.type === 'searchArtical') {
    return searchArtical(event, context);
  }
  else if (event.type === 'getAllVideoList') {
    return getAllVideoList(event, context);
  }
  else if (event.type === 'searchVideo') {
    return searchVideo(event, context);
  }
  else if (event.type === 'getAllPeople') {
    return getAllPeople(event, context);
  }
  else if (event.type === 'allWatchPeople') {
    return allWatchPeople(event, context);
  }
  else if (event.type === 'deleteWatchPeople') {
    return deleteWatchPeople(event, context);
  }
  else if (event.type === 'addWatchPeople') {
    return addWatchPeople(event, context);
  }
  else if (event.type === 'getUserLovePeople') {
    return getUserLovePeople(event, context);
  }
  else if (event.type === 'getAllWatchPeople') {
    return getAllWatchPeople(event, context);
  }
  else if (event.type ==='addChat'){
    return addChat(event, context);
  }
  else if (event.type ==='searchChat'){
    return searchChat(event, context);
  }
  else if (event.type ==='changChat'){
    return changChat(event, context);
  }
  else if (event.type ==='addFirstToPeopleChat'){
    return addFirstToPeopleChat(event, context);
  }
  else if (event.type ==='cC'){
    return cC(event, context);
  }
  else if (event.type ==='getAllChat'){
    return getAllChat(event, context);
  }
  else if (event.type ==='deleteChat'){
    return deleteChat(event, context);
  }
  else if (event.type ==='toGetAllChat'){
    return toGetAllChat(event, context);
  }
  else if (event.type ==='searchPhone'){
    return searchPhone(event, context);
  }
  else if (event.type ==='searchArticalPart'){
    return searchArticalPart(event, context);
  }
  else if (event.type ==='searchVideoPart'){
    return searchVideoPart(event, context);
  }
  else {
    return getData(event, context);
  }




}