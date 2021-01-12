
var enable_button = document.getElementById('btnToggleRedirects')
enable_button.addEventListener('click', toggleRedirects);

var enable_zoom_button = document.getElementById('btnToggleZoom')
enable_zoom_button.addEventListener('click', toggleZoom);

var perferred_quality_selector = document.getElementById('qualityOptions')
perferred_quality_selector.addEventListener('change', perferredQualityChanged);



chrome.storage.local.get(null, (state) => {
	state.enabled ? enable_button.innerHTML = "Redirects ✓" : enable_button.innerHTML = "Redirects ✗";
	state.zoomEnabled ? enable_zoom_button.innerHTML = "Zoom ✓" : enable_zoom_button.innerHTML = "Zoom ✗";
	perferred_quality_selector.value = state.quality
})


function toggleRedirects() {
	if (enable_button.innerHTML === "Redirects ✓") {
		enable_button.innerHTML = "Redirects ✗"
		change_icon_disabled()
		chrome.storage.local.set({ enabled: false })
	} else {
		enable_button.innerHTML = "Redirects ✓"
		change_icon_enabled()
		chrome.storage.local.set({ enabled: true })
	}
}


function toggleZoom() {
	if (enable_zoom_button.innerHTML === "Zoom ✓") {
		enable_zoom_button.innerHTML = "Zoom ✗"
		chrome.storage.local.set({ zoomEnabled: false })
	} else {
		enable_zoom_button.innerHTML = "Zoom ✓"
		chrome.storage.local.set({ zoomEnabled: true })
	}
}


function perferredQualityChanged() {
	chrome.storage.local.set({
		quality: perferred_quality_selector.value
	})
}

// function play_videos(){
//   chrome.tabs.executeScript(null, {
//       file: 'hls.'+current_version+'.min.js'
//   }, function() {
//       chrome.tabs.executeScript(null, {file: 'embedded_videos.js'});
//       window.close();
//   });
// }

function change_icon_enabled(){
	chrome.browserAction.setIcon({
		path: {
			"16": "img/multimedia16.png",
			"48": "img/multimedia48.png",
			"128": "img/multimedia128.png"
		}
	})
}

function change_icon_disabled(){
	chrome.browserAction.setIcon({
		path: {
			"16": "img/multimediaoff16.png",
			"48": "img/multimediaoff48.png",
			"128": "img/multimediaoff128.png"
		}
	})
}