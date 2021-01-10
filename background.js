var state;

chrome.storage.local.get(null, (storage) => {
	if (storage.enabled !== undefined) state = storage
	else {
		state = {
			enabled: true,
			zoomEnabled: true,
			quality: 'auto'
		}
		chrome.storage.local.set(state)
	}
	if (state.enabled) change_icon_enabled()
	else change_icon_disabled()
});

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


chrome.webRequest.onBeforeRequest.addListener(
	function (info) {
		if (state.enabled) {
			var playerUrl = chrome.runtime.getURL('hls.html') + "?video=" + info.url
			// if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			// 	chrome.tabs.update(info.tabId, { url: playerUrl });
			// 	return { cancel: true }
			// } else {
			return { redirectUrl: playerUrl }
		}
	},
	{ urls: ["*://*/*.m3u8"], types: ["main_frame"] },
	["blocking"]
);


chrome.webRequest.onBeforeRequest.addListener(
	function (info) {
		if (state.enabled) {
			var playerUrl = chrome.runtime.getURL('dash.html') + "?video=" + info.url
			return { redirectUrl: playerUrl }
		}
	},
	{ urls: ["*://*/*.mpd"], types: ["main_frame"] },
	["blocking"]
);

// chrome.omnibox.onInputEntered.addListener(function (input) {
// 	var playerUrl = chrome.runtime.getURL('player.html') + "#" + input;
// 	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
// 		chrome.tabs.update(tabs[0].id, { url: playerUrl });
// 	});
// });
