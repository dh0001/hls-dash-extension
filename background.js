var state = {
	enabled: true,
	zoomEnabled: true
}

function updateicon() {
	if (state.enabled) {
		chrome.browserAction.setIcon({
			path: {
				"16": "img/multimedia16.png",
				"48": "img/multimedia48.png",
				"128": "img/multimedia128.png"
			  }
		})
	}
	else {
		chrome.browserAction.setIcon({
			path: {
				"16": "img/multimediaoff16.png",
				"48": "img/multimediaoff48.png",
				"128": "img/multimediaoff128.png"
			  }
		})
	}
}

chrome.storage.local.get(null, (storage) => {
	if (state.enabled !== undefined) state = storage
	updateicon()
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {

		if (request == "getState") {
			sendResponse([state.enabled, state.zoomEnabled]);

		} else if (request == "Redirects Enabled" || request == "Redirects Disabled") {
			state.enabled = request === "Redirects Enabled";
			updateicon()
			chrome.storage.local.set({
				enabled: state.enabled
			})

		} else if (request == "Zoom Enabled" || request == "Zoom Disabled") {
			state.zoomEnabled = request === "Zoom Enabled";
			chrome.storage.local.set({
				zoomEnabled: state.zoomEnabled
			})
		}
	}
);

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
