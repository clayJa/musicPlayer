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
 function initAudio() {
  window.audioObject = new Audio('https://m8.music.126.net/20190101215025/2531b7f86cd3f49d04a325d8511273cc/ymusic/2987/5611/69c5/16ef39280e7cf1ecd8a02250ebc91d07.mp3');
  window.currentSong = index;
  audioObject.autoPlay = true; 
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