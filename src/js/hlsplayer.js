var video = document.querySelector('video');

var md = new MobileDetect(window.navigator.userAgent);

if (md.mobile()) {
	document.documentElement.classList.add('mobile');
}

// cant use chrome.extension.getBackgroundPage(), is null in firefox private window
chrome.storage.local.get(null, (state) => {
	state.zoomEnabled ? video.classList.add("zoomed_mode") : video.classList.add("native_mode");

	var hls = new Hls({enableWorker: false});
	hls.loadSource((new URL(document.location)).searchParams.get("video"));
	hls.attachMedia(video);
	hls.on(Hls.Events.MANIFEST_PARSED, function() {
		if (state.quality === 'high'){
			hls.currentLevel = hls.levels.length - 1
			hls.firstLevel = hls.levels.length - 1
		} else if (state.quality === 'low'){
			hls.currentLevel = 0
			hls.firstLevel = 0
		}
		video.play();
	});
})
