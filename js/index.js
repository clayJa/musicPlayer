// init audio 
function initAudio(res) {
 window.musicList = JSON.parse(res).data.musicList;
 window.audioObject = new Audio(musicList[0].url);
 window.currentSong = 0;
 audioObject.autoPlay = true; 
 changeInfo(musicList[0]);
}
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

// song detail info
function changeInfo(song) {
  audioObject.src = musicList[currentSong].url;
  window.DOM.name.innerText = song.name;
  window.DOM.author.innerText = song.author;
  console.log(song)
  document.addEventListener('mouseover',function(){  
    console.log('document')
  audioObject.addEventListener("canplaythrough",function(){
    audioObject.play();
    window.DOM.timer.innerText = formatTime(audioObject.duration);
  },false);
  audioObject.addEventListener("error",function(){
      next();
  },false);
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

 // get next music
 function next() {
  currentSong = ++currentSong % musicList.length;
  changeInfo(musicList[currentSong]);
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