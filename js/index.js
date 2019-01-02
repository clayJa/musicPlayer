// static musicList
var musicList = [
  {
    url: '//cloud.hunger-valley.com/music/玫瑰.mp3',
    name: '玫瑰',
    pic: '//img.jammyfm.com/wordpress/wp-content/uploads/2017/10/201710202139057644.jpg',
    author: '贰佰'
  },
  {
    url: '//cloud.hunger-valley.com/music/ifyou.mp3',
    name: 'IF YOU',
    pic: '//i2.wp.com/www.kpopscene.com/wp-content/uploads/2015/12/Bigbang.jpg',
    author: 'Big Bang'
  }
  
];
var music = new Audio();
music.autoplay = true;
var musicIndex = 0;
music.onplaying = function(){
  timer = setInterval(function(){
    updateProgress()
  }, 1000)
};
music.onpause = function(){
  console.log('pause')
  clearInterval(timer)
}
// 请求歌单
// function getMusicList(callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET','//easy-mock.com/mock/5ad86860c1196e47fdb233cc/mock/musicPlayer',true);
//   xhr.send();
//   xhr.onload = function() {
//     if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
//       callback(xhr.responseText);
//     } else {
//       console.log('server error')
//     }
//   }
// }

// song detail info
function changeMusic(song) {
  music.src = musicList[musicIndex].url;
  DOM.name.innerText = song.name;
  DOM.author.innerText = song.author;
  document.addEventListener('mouseover',function(){  
    console.log('document')
    music.play();
  });
 }
 
 // get next music
 function next() {
   musicIndex = ++musicIndex % musicList.length;
   changeMusic(musicList[musicIndex]);
  }
  function updateProgress(){
    var percent = (music.currentTime/music.duration)*100+'%';
    DOM.active.style.width = percent;
    DOM.timer.innerText = formatTime(music.currentTime);
  }
  function queryDom() {
    window.DOM = {
     name: $('.music .info .name'),
     author: $('.music .info .author'),
     active: $('.player .progress .active'),
     timer: $('.player .tools .timer'),
     playBtn: $('.music .control .playBtn')
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

 window.onload = function() {
    queryDom();
    changeMusic(musicList[musicIndex]);
    DOM.playBtn.onclick = function(){
    if(DOM.playBtn.classList.contains('icon-pause')){
      music.pause()
    }else{
      music.play()
    }
    DOM.playBtn.classList.toggle('icon-pause')
    DOM.playBtn.classList.toggle('icon-play')
  }
}