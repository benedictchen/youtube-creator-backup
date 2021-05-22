
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




