// 发送GET请求
function $get(url,callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',url,true);
  xhr.send();
  xhr.onload = function() {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      // console.log(JSON.parse(xhr.responseText));
      callback(xhr.responseText);
    } else {
      console.log('server error')
    }
  }
}
// 请求歌单
function getMusicList(id) {
  $get('//api.imjad.cn/cloudmusic/?type=playlist&id='+id,formatMusicList)
}
// 处理歌曲详细信息
function songDetailStorage(res) {
  song = JSON.parse(res).songs[0];
  var storage = window.localStorage;
  var obj = {};
  var temp = localStorage.getItem(song.id);
  temp == undefined ? 
  obj = Object.assign({},{
    name: song.name,
    pic: song.al.picUrl,
    author: song.ar[0].name
  }) 
  : 
  obj = Object.assign(JSON.parse(temp),{
    name: song.name,
    pic: song.al.picUrl,
    author: song.ar[0].name
  });
  storage.setItem(song.id,JSON.stringify(obj));
  // if(isComplete(song.id)) {
  //   initAudio(song.id);
  // }
}
// 获取音频文件地址
function songUrlStorage(res) {
  var song = JSON.parse(res).data[0];
  var obj = {};
  var storage = window.localStorage;
  var temp = localStorage.getItem(song.id);
  temp == undefined ? 
  obj = Object.assign({},{url: song.url}) 
  : 
  obj = Object.assign(JSON.parse(temp),{url: song.url});
  storage.setItem(song.id,JSON.stringify(obj));
  // if(isComplete(song.id)) {
  //   initAudio(song.id);
  // }
}
// 处理歌单信息
function formatMusicList (res) {
  console.log(res)
  var storage = window.localStorage;
  window.songIds = [];
  JSON.parse(res).playlist.trackIds.forEach(function(item){
    if(!storage.getItem(item.id)) {
      window.songIds.push(item.id);
      storage.setItem('songIds',JSON.stringify(songIds))
      $get('//api.imjad.cn/cloudmusic/?type=detail&id='+item.id,songDetailStorage);
      $get('//api.imjad.cn/cloudmusic/?type=song&id='+item.id,songUrlStorage);
    }
  })
 }
 // 判断歌曲信息是否完整
 function isComplete(id) {
  var temp = JSON.parse(window.localStorage.getItem(id));
  if(!!temp &&!!temp.url && !!temp.name) {
    return true
  } else if(!!temp && !temp.url){
    $get('//api.imjad.cn/cloudmusic/?type=song&id='+id,songUrlStorage);
    return false;
  } else if (!!temp && !temp.name) {
    $get('//api.imjad.cn/cloudmusic/?type=detail&id='+id,songDetailStorage);
    return false;
  } else {
    $get('//api.imjad.cn/cloudmusic/?type=song&id='+id,songUrlStorage);
    $get('//api.imjad.cn/cloudmusic/?type=detail&id='+id,songDetailStorage);
    return false;
  }
 }
 // init audio 
 function initAudio() {
  var storage = window.localStorage;
  var songIds = JSON.parse(storage.getItem('songIds')).filter(function(id){
    return isComplete(id)
  });
  console.log(songIds)
  var songArray = [];
  songIds.forEach(function(item){
    var song = JSON.parse(storage.getItem(item));
    songArray.push(song);
  })
  console.log("songArray:\n",songArray)
  // storage.setItem('songIds',JSON.stringify(songIds));
  // var song = JSON.parse(storage.getItem(id ? id : songIds[0]));
  // window.audioObject = new Audio(song.url);
  // window.currentSong = index;
  // audioObject.autoPlay = true; 
}
// song detail info
function changeInfo(song) {
  window.DOM.name.innerText = song.name;
  window.DOM.author.innerText = song.author;
  console.log(song)
  document.addEventListener('DOMContentLoaded',function(){  
    console.log('document')
    audioObject.addEventListener('canplay', function(){
      console.log('audioObject')
      audioObject.play();
      window.DOM.timer.innerText = formatTime(audioObject.duration);
    })
  });
 }
 function queryDom() {
   window.DOM = {
    name: $('.music .info .name'),
    author: $('.music .info .author'),
    active: $('.player .progress .active'),
    timer: $('.player .tools .timer')
   }
   return DOM;
 }
 // select dom
 function $(selector) {
   return document.querySelector(selector);
 }
 function formatTime(time) {
    var min = time / 60 < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
    var sec = time % 60 < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    return min + ':' + sec;
 }
//  function loadingStatus() {
//    if(!audioObject.currentTime) {

//    }
//  }
window.onload = function() {
  queryDom();
  getMusicList('360706213');
  if(localStorage.length) {
    initAudio()
  }
}