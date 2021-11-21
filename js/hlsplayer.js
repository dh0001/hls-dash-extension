
var video = document.getElementById('video');

// cant use chrome.extension.getBackgroundPage(), is null in firefox private window
chrome.storage.local.get(null, (state) => {
	state.zoomEnabled ? video.classList.add("zoomed_mode") : video.classList.add("native_mode");

	var hls = new Hls();
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

// hls.js is not supported on platforms that do not have Media Source
// Extensions (MSE) enabled.
//
// When the browser has built-in HLS support (check using `canPlayType`),
// we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
// element through the `src` property. This is using the built-in support
// of the plain video element, without using hls.js.
//
// Note: it would be more normal to wait on the 'canplay' event below however
// on Safari (where you are most likely to find built-in HLS support) the
// video.src URL must be on the user-driven white-list before a 'canplay'
// event will be emitted; the last video event that can be reliably
// listened-for when the URL is not on the white-list is 'loadedmetadata'.
// else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//   video.src = videoSrc;
//   video.addEventListener('loadedmetadata', function() {
//     video.play();
//   });
// }

// var hls;
// var debug;
// var recoverDecodingErrorDate,recoverSwapAudioCodecDate;
// var pendingTimedMetadata = [];

// function handleMediaError(hls) {
//   var now = performance.now();
//   if(!recoverDecodingErrorDate || (now - recoverDecodingErrorDate) > 3000) {
//     recoverDecodingErrorDate = performance.now();
//     var msg = "trying to recover from media Error ..."
//     console.warn(msg);
//     hls.recoverMediaError();
//   } else {
//     if(!recoverSwapAudioCodecDate || (now - recoverSwapAudioCodecDate) > 3000) {
//       recoverSwapAudioCodecDate = performance.now();
//       var msg = "trying to swap Audio Codec and recover from media Error ..."
//       console.warn(msg);
//       hls.swapAudioCodec();
//       hls.recoverMediaError();
//     } else {
//       var msg = "cannot recover, last media error recovery failed ..."
//       console.error(msg);
//     }
//   }
// }

// function handleTimedMetadata(event, data) {
//   for (var i = 0; i < data.samples.length; i++) {
//     var pts = data.samples[i].pts;
//     var str =  new TextDecoder('utf-8').decode(data.samples[i].data.subarray(22));
//     pendingTimedMetadata.push({pts: pts, value: str});
//   }
// }

// function timeUpdateCallback() {
//   if (pendingTimedMetadata.length == 0 || pendingTimedMetadata[0].pts > video.currentTime) {
//     return;
//   }
//   var e = pendingTimedMetadata[0];
//   pendingTimedMetadata = pendingTimedMetadata.slice(1);
//   console.log('Metadata ' + e.value + " at " + e.pts + "s");
// }

// function playM3u8(url){
//   var video = document.getElementById('video');
//   if(native){
//     video.classList.add("native_mode");
//     video.classList.remove("zoomed_mode");
//   } else {
//     video.classList.remove("native_mode");
//     video.classList.add("zoomed_mode");
//   }
//   if(hls){ hls.destroy(); }
//   hls = new Hls({debug:debug});
//   hls.on(Hls.Events.ERROR, function(event,data) {
//     var  msg = "Player error: " + data.type + " - " + data.details;
//     console.error(msg);
//     if(data.fatal) {
//       switch(data.type) {
//         case Hls.ErrorTypes.MEDIA_ERROR:
//           handleMediaError(hls);
//           break;
//         case Hls.ErrorTypes.NETWORK_ERROR:
//            console.error("network error ...");
//           break;
//         default:
//           console.error("unrecoverable error");
//           hls.destroy();
//           break;
//       }
//     }
//    });
//   var m3u8Url = decodeURIComponent(url)
//   hls.loadSource(m3u8Url);
//   hls.attachMedia(video);
//   video.ontimeupdate = timeUpdateCallback;
//   hls.on(Hls.Events.MANIFEST_PARSED,function() {
//     video.play();
//   });
//   hls.on(Hls.Events.FRAG_PARSING_METADATA, handleTimedMetadata);
//   document.title = url
// }

// chrome.storage.local.get({
//   hlsjs: currentVersion,
//   debug: false,
//   native: false
// }, function(settings) {
//   debug = settings.debug;
//   native = settings.native;
//   var s = document.createElement('script');
//   var version = currentVersion
//   if (supportedVersions.includes(settings.hlsjs)) {
//     version = settings.hlsjs
//   }
//   s.src = chrome.runtime.getURL('hlsjs/hls.'+version+'.min.js');
//   s.onload = function() { playM3u8(window.location.href.split("#")[1]); };
//   (document.head || document.documentElement).appendChild(s);
// });

// $(window).bind('hashchange', function() {
//   playM3u8(window.location.href.split("#")[1]);
// });