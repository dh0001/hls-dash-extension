var video = document.getElementById('video');

// cant use chrome.extension.getBackgroundPage(), is null in firefox private window
chrome.storage.local.get(null, (state) => {
	state.zoomEnabled ? video.classList.add("zoomed_mode") : video.classList.add("native_mode");

	var player = dashjs.MediaPlayer().create();
	player.initialize(video, (new URL(document.location)).searchParams.get("video"), true);

	if (state.quality !== 'auto') {
		var quality;
		if (state.quality === 'high'){
			quality = 99999999
		} else if (state.quality === 'low'){
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
})