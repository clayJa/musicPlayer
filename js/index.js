// 请求歌单
function getMusicList(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET','//easy-mock.com/mock/5ad86860c1196e47fdb233cc/mock/musicPlayer',true);
  xhr.send();
  xhr.onload = function() {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      callback(xhr.responseText);
    } else {
      console.log('server error')
    }
  }
}

 // init audio 
 function initAudio(res) {
  window.musicList = JSON.parse(res).data.musicList;
  window.audioObject = new Audio(musicList[0].url);
  window.currentSong = 0;
  audioObject.autoPlay = true; 
  changeInfo(musicList[0]);
}
// song detail info
function changeInfo(song) {
  window.DOM.name.innerText = song.name;
  window.DOM.author.innerText = song.author;
  console.log(song)
  audioObject.play();
  window.DOM.timer.innerText = formatTime(audioObject.duration);
  // document.addEventListener('DOMContentLoaded',function(){  
  //   console.log('document')
  //   audioObject.addEventListener('canplay', function(){
  //     console.log('audioObject')
  //     audioObject.play();
  //     window.DOM.timer.innerText = formatTime(audioObject.duration);
  //   })
  // });
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
  getMusicList(initAudio);
}