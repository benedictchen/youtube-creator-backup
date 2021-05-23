
(function() {

function loadScript(url) {
	let s = document.createElement('script');
	s.src = chrome.runtime.getURL(url);
	(document.head||document.documentElement).appendChild(s);
	s.onload = function() {
	    s.remove();
	};
}

function loadCss(url) {
	let s = document.createElement('link');
	s.setAttribute('href', chrome.runtime.getURL(url));
	s.setAttribute('type', 'text/css');
	s.setAttribute('rel', 'stylesheet');
	(document.head||document.documentElement).appendChild(s);
}

loadScript('script.js');
loadCss('styles.css');


const allVideos = new Map();

window.addEventListener("message", (event) => {
	console.log('message received from index.js', {event});
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "VIDEOS")) {
  	console.log("Content script received: " + event.data);
  	event.data.videos.forEach((video) => {
  		allVideos.set(video.videoId, video);	
  	});
  	console.log('Updated videos inside index.js', allVideos);
  	// console.log('what is index.js videos', window.localStorage.getItem('YoutubeVideos'));
  	// console.log('downloads folder: ', chrome.downloads.show)
  	// chrome.downloads.download({ url: Object.values(Object.fromEntries(allVideos))[0].downloadUrl })
  }
}, true);

})();