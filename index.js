
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

const port = chrome.runtime.connect();

window.addEventListener("message", (event) => {
	console.log('message received', {event});
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data);
    port.postMessage(event.data.text);
  }
}, false);




