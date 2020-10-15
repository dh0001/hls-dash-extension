var video = document.getElementById('video');

chrome.runtime.sendMessage("getState", function(state){
  state[1] ? video.classList.add("zoomed_mode") : video.classList.add("native_mode");
});


var player = dashjs.MediaPlayer().create();
player.initialize(video, (new URL(document.location)).searchParams.get("video"), true);