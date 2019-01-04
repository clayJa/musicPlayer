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
  DOM.container.style.backgroundImage = 'url('+song.pic+')';
  if(document.querySelectorAll('.musicList li').length) {
    document.querySelectorAll('.musicList li').forEach(function(dom){
      dom.classList.remove('active');
    })
    $('.musicList li[data-index="'+musicIndex+'"]').classList.add('active');
  }
 }
 
 // get next music
 function next() {
   musicIndex = ++musicIndex % musicList.length;
   changeMusic(musicList[musicIndex]);
  }
 // get previous music
 function prev() {
   musicIndex = (musicList.length + --musicIndex) % musicList.length;
   console.log(musicIndex);
   changeMusic(musicList[musicIndex]);
  }
  function updateProgress(){
    var percent = (music.currentTime/music.duration)*100+'%';
    DOM.active.style.width = percent;
    DOM.timer.innerText = formatTime(music.currentTime);
    if(music.ended) {
      if(DOM.loopBtn.classList.contains('icon-danquxunhuan')) {
        changeMusic(musicList[musicIndex]);

      } else {
        next();
      }
    }
  }
  // get dom
  function queryDom() {
    window.DOM = {
     name: $('.music .info .name'),
     author: $('.music .info .author'),
     active: $('.player .progress .active'),
     timer: $('.player .tools .timer'),
     playBtn: $('.music .control .playBtn'),
     nextBtn: $('.music .control .nextBtn'),
     prevBtn: $('.music .control .prevBtn'),
     voiceBtn: $('.player .tools .voiceBtn'),
     musicListBtn: $('.player .tools .musicListBtn'),
     musicList: $('.container .musicList'),
     progress: $('.player .progress'),
     progressActive: $('.player .progress .active'),
     loopBtn: $('.player .tools .loopBtn'),
     container: $('.container'),
    }
    return DOM;
  }
  // select dom
  function $(selector) {
   return document.querySelector(selector);
 }
 // format time
 function formatTime(time) {
    var min = time / 60 < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
    var sec = time % 60 < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    return min + ':' + sec;
 }

 window.onload = function() {
    queryDom();
    //init music
    changeMusic(musicList[musicIndex]);
    // play or pause
    DOM.playBtn.onclick = function() {
      if(DOM.playBtn.classList.contains('icon-pause')){
        music.pause();
      }else{
        music.play();
      }
      DOM.playBtn.classList.toggle('icon-pause');
      DOM.playBtn.classList.toggle('icon-play');
    }
    // next song
    DOM.nextBtn.onclick = function(){
      next();
    }
    // previous song
    DOM.prevBtn.onclick = function() {
      prev();
    }
    // turn on / off music
    DOM.voiceBtn.onclick = function() {
      if(music.volume === 1) {
        music.volume = 0
      } else {
        music.volume = 1
      }
      DOM.voiceBtn.classList.toggle('icon-sey-voice-b');
      DOM.voiceBtn.classList.toggle('icon-voice-close');
    }
    // show song list
    DOM.musicListBtn.onclick = function() {
      var htmlContent = '<ul>'; 
      musicList.forEach(function(item,index){
        htmlContent += '<li data-index="'+index+'"><span class="name">'+item.name+'</span><span class="author">'+item.author+'</span></li>';
      });
      DOM.musicList.innerHTML = htmlContent + '</ul>';
      DOM.musicList.classList.toggle('show');
      DOM.musicList.classList.toggle('hide');
      document.querySelectorAll('.musicList li').forEach(function(dom){
        dom.classList.remove('active');
      })
      $('.musicList li[data-index="'+musicIndex+'"]').classList.add('active');
    }
    // change music by list
    DOM.musicList.onclick = function(e) {
      musicIndex = e.target.parentNode.getAttribute('data-index');
      changeMusic(musicList[musicIndex]);
    }
    // progress update
    DOM.progress.onclick = function(e) {
      var percent = e.offsetX/parseInt(getComputedStyle(this).width);
      music.currentTime = percent * music.duration;
      DOM.progressActive.style.width = percent * 100 + '%';
    }
    // loop method
    DOM.loopBtn.onclick = function() {
      DOM.loopBtn.classList.toggle('icon-xunhuanbofang');
      DOM.loopBtn.classList.toggle('icon-danquxunhuan');
    }
    
}