var enabled = chrome.storage.local.get("enabled");
if (enabled == undefined) enabled = true;
var zoomEnabled = chrome.storage.local.get("zoomEnabled");
if (zoomEnabled == undefined) zoomEnabled = true;

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		
		if (request == "getState") {
			sendResponse([enabled, zoomEnabled]);

		} else if (request == "Redirects Enabled" || request == "Redirects Disabled"){
			enabled = request === "Redirects Enabled";
			enabled ? chrome.browserAction.setIcon({ path: "img/multimedia.svg" }) : chrome.browserAction.setIcon({ path: "img/multimediaoff.svg" })
			chrome.storage.local.set({
				enabled: enabled
			  })

		} else if (request == "Zoom Enabled" || request == "Zoom Disabled"){
			zoomEnabled = request === "Zoom Enabled";
			chrome.storage.local.set({
				zoomEnabled: zoomEnabled
			  })
		}
	}
);

chrome.webRequest.onBeforeRequest.addListener(
	function (info) {
		if (enabled) {
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
		if (enabled) {
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
