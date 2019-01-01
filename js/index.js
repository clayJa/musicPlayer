function $get(url,callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',url,true);
  xhr.send();
  xhr.onload = function() {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log(JSON.parse(xhr.responseText));
      callback(xhr.responseText);
    } else {
      console.log('server error')
    }
  }
}
function getMusicList(id) {
  $get('//api.imjad.cn/cloudmusic/?type=playlist&id='+id,formatMusicList)
}
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
  storage.setItem(song.id,JSON.stringify(obj))
}
function songUrlStorage(res) {
  var song = JSON.parse(res).data[0];
  var obj = {};
  var storage = window.localStorage;
  var temp = localStorage.getItem(song.id);
  temp == undefined ? 
  obj = Object.assign({},{url: song.url}) 
  : 
  obj = Object.assign(JSON.parse(temp),{url: song.url});
  storage.setItem(song.id,JSON.stringify(obj))
}
function formatMusicList (res) {
  console.log(res)
  var storage = window.localStorage;
  window.songIds = [];
  JSON.parse(res).playlist.trackIds.forEach(function(item){
    if(!storage.getItem(item.id)) {
      $get('//api.imjad.cn/cloudmusic/?type=detail&id='+item.id,songDetailStorage);
      $get('//api.imjad.cn/cloudmusic/?type=song&id='+item.id,songUrlStorage);
    }
  })
 }
window.onload = function() {
  getMusicList('360706213')
}