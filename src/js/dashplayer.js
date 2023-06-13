var video = document.querySelector('video')

var md = new MobileDetect(window.navigator.userAgent)

if (md.mobile()) {
	document.documentElement.classList.add('mobile')
}

// cant use chrome.extension.getBackgroundPage(), is null in firefox private window
chrome.storage.local.get(null, (state) => {
	state.zoomEnabled ? video.classList.add("zoomed_mode") : video.classList.add("native_mode")

	var player = dashjs.MediaPlayer().create();

	player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function () {
		var video_bitrates = player.getBitrateInfoListFor("video")
		var audio_bitrates = player.getBitrateInfoListFor("audio")

		if (state.quality !== 'auto') {
			var video_quality
			var audio_quality

			if (state.quality === 'high') {
				// bitrates are sorted from lowest to the best values
				// so the last one has the best quality
				// set max quality
				video_quality = video_bitrates[video_bitrates.length - 1].qualityIndex
				audio_quality = audio_bitrates[audio_bitrates.length - 1].qualityIndex
			} else if (state.quality === 'low') {
				video_quality = video_bitrates[0].qualityIndex
				audio_quality = audio_bitrates[0].qualityIndex
			}
			player.updateSettings({
				'streaming': {
					'abr': {
						'autoSwitchBitrate': {
							'video': false,
							'audio': false
						},
						'initialBitrate': {
							'video': video_quality,
							'audio': audio_quality
						}
					}
				}
			})
			player.setQualityFor("video", video_quality, true)
			player.setQualityFor("audio", audio_quality, true)
		}
	});

	var url = (new URL(document.location)).searchParams.get("video")
	player.initialize(video, url, true)
})