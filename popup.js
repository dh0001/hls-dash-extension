var background_page = chrome.extension.getBackgroundPage()

var enable_button = document.getElementById('btnToggleRedirects')
enable_button.addEventListener('click', toggleRedirects);

var enable_zoom_button = document.getElementById('btnToggleZoom')
enable_zoom_button.addEventListener('click', toggleZoom);

var perferred_quality_selector = document.getElementById('qualityOptions')
perferred_quality_selector.value = background_page.state.quality
perferred_quality_selector.addEventListener('change', perferredQualityChanged);



background_page.state.enabled ? enable_button.innerHTML = "Redirects ✓" : enable_button.innerHTML = "Redirects ✗";
background_page.state.zoomEnabled ? enable_zoom_button.innerHTML = "Zoom ✓" : enable_zoom_button.innerHTML = "Zoom ✗";


function toggleRedirects() {
	if (enable_button.innerHTML === "Redirects ✓") {
		enable_button.innerHTML = "Redirects ✗"
		background_page.change_icon_disabled()
		background_page.state.enabled = false
	} else {
		enable_button.innerHTML = "Redirects ✓"
		background_page.change_icon_enabled()
		background_page.state.enabled = true
	}
	chrome.storage.local.set({
		enabled: background_page.state.enabled
	})
}


function toggleZoom() {
	if (enable_zoom_button.innerHTML === "Zoom ✓") {
		enable_zoom_button.innerHTML = "Zoom ✗"
		background_page.state.zoomEnabled = false
	} else {
		enable_zoom_button.innerHTML = "Zoom ✓"
		background_page.state.zoomEnabled = true
	}
	chrome.storage.local.set({
		zoomEnabled: background_page.state.zoomEnabled
	})
}


function perferredQualityChanged() {
	background_page.state.quality = perferred_quality_selector.value
	
	chrome.storage.local.set({
		zoomEnabled: perferred_quality_selector.value
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