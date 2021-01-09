var background_page = chrome.extension.getBackgroundPage()
var video = document.getElementById('video');

background_page.state.zoomEnabled ? video.classList.add("zoomed_mode") : video.classList.add("native_mode");

var player = dashjs.MediaPlayer().create();
player.initialize(video, (new URL(document.location)).searchParams.get("video"), true);

if (background_page.state.quality !== 'auto') {
	var quality;
	if (background_page.state.quality === 'high'){
		quality = 99999999
	} else if (background_page.state.quality === 'low'){
		quality = 0
	}
	player.updateSettings({
		'streaming': {
			'abr': {
				'autoSwitchBitrate': {
					'video': false,
					'audio': false
				},
				'initialBitrate': {
					'video': quality,
					'audio': quality
				}
			}
		}
	});
}