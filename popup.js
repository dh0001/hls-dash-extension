enable_button = document.getElementById('btnToggleRedirects')
enable_button.addEventListener('click', toggleRedirects);
enable_zoom_button = document.getElementById('btnToggleZoom')
enable_zoom_button.addEventListener('click', toggleZoom);

chrome.runtime.sendMessage("getState", (state) => {
   state[0] ? enable_button.innerHTML = "Redirects Enabled" : enable_button.innerHTML = "Redirects Disabled";
   state[1] ? enable_zoom_button.innerHTML = "Zoom Enabled" : enable_zoom_button.innerHTML = "Zoom Disabled";
});


function toggleRedirects() {
  if (enable_button.innerHTML == "Redirects Enabled") {
  	enable_button.innerHTML = "Redirects Disabled"
  } else {
  	enable_button.innerHTML = "Redirects Enabled"
  }
  chrome.runtime.sendMessage(enable_button.innerHTML);
}


function toggleZoom() {
  if (enable_zoom_button.innerHTML == "Zoom Enabled") {
  	enable_zoom_button.innerHTML = "Zoom Disabled"
  } else {
  	enable_zoom_button.innerHTML = "Zoom Enabled"
  }
  chrome.runtime.sendMessage(enable_zoom_button.innerHTML);
}

// function play_videos(){
//   chrome.tabs.executeScript(null, {
//       file: 'hls.'+current_version+'.min.js'
//   }, function() {
//       chrome.tabs.executeScript(null, {file: 'embedded_videos.js'});
//       window.close();
//   });
// }