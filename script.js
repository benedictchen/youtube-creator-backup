/**
 * © Copyright 2021 Benedict Chen. All Rights Reserved.
 * @author Benedict Chen (benedict@benedictchen.com) 
 */

(function() {



const DONATION_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WXQKYYKPHWXHS';
const LOCALSTORAGE_KEY = 'YoutubeVideos';


const existingVideos = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

const allVideos = new Map();
const allHeaders = new Map();
let waitTime = 0;

if (existingVideos) {
	Object.keys(existingVideos).forEach((key) => {
		const value = existingVideos[key];
		allVideos.set(key, value);
	});
}

window._oldXHROpen = window.XMLHttpRequest.prototype.open;
window._oldSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;

function removeElement(el) {
	if (el !== document.body) {
		el.parentNode.removeChild(el)	
	}
}

function renderListOfVideos(allVideos) {
	if (!allVideos) {
		allVideos = new Map();
	}
	const existing = document.querySelectorAll('.ytcreatordownloader-list');
	Array.from(existing).forEach(item => removeElement(item));
	const el = document.createElement('div');
	el.classList.add('ytcreatordownloader-list');
	const listItems = Array.from(allVideos.values()).map((video) => {
		return `<li>${video.title}</li>`;
	});
	el.innerHTML = `
		<div>
			Total videos: ${Array.from(allVideos.keys()).length}
		</div>
		<ul>
			${listItems.join('')}
		</ul>
	`;
	document.body?.appendChild(el)
}

function createButtons(videos) {
	let downloadButton = document.createElement('button');
	downloadButton.setAttribute('data-temporary', true);
    downloadButton.textContent = "Download Videos";
    downloadButton.style = "position:absolute; right: 30px; bottom: 30px; font-size:50px; background-color:green; color: white; border-radius: 5px; padding: 30px;"
    document.body?.appendChild(downloadButton);
	let cancelButton = document.createElement('button');
	cancelButton.setAttribute('data-temporary', true);
    cancelButton.textContent = "Cancel";
    cancelButton.style = "position:absolute; left: 30px; bottom: 30px; font-size:50px; background-color:red; color: white; border-radius: 5px; padding: 30px;"
	cancelButton.onclick = () => {
		document.body?.removeChild(cancelButton);
		document.body?.removeChild(downloadButton);
		delete downloadButton;
		waitTime = 0;
	};
    document.body?.appendChild(cancelButton);
    downloadButton.onclick = () => { 
		videos.forEach((item) => {
            console.log(item);
            let dataUrl = `https://www.youtube.com${item.downloadUrl}`;
            console.log({ dataUrl })
            setTimeout(() => {
                window.open(dataUrl, item.videoId);
            }, waitTime);
            waitTime += 10000;
            if (Math.floor(Math.random() * 10000) === 8) {
            	// Please donate!
            	setTimeout(() => window.open(DONATION_URL, 'donate'), 1000);
            }
        });
		removeButtons();
		waitTime = 0;
    };
}

function removeButtons() {
	const oldButtons = document.querySelectorAll('[data-temporary]');
	if (oldButtons) {
		Array.from(oldButtons).forEach(item => {
			removeElement(item);
		});
	}
}

function handleInterceptedRequest () {
    let response = JSON.parse(this.responseText);
    console.log('Server listing response:', {response})
    const { videos } = response;
    videos.forEach((video) => allVideos.set(video.videoId, video));
    console.log('videos added:', {allVideos, allHeaders});
    window.postMessage({ type: "VIDEOS", videos }, "*");
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(Object.fromEntries(allVideos)));
}


window._interceptor = function (method, url, async) {
	if (url.indexOf('/youtubei/v1/creator/list_creator_videos') !== -1) {
		console.log('Listing page request found...', { method, url, isAsync: async});
		console.log({this: this});
		this.addEventListener('load', handleInterceptedRequest);
	}
    return oldXHROpen.apply(this, arguments);
}

window._setHeaderInterceptor = function(key, value) {
	allHeaders.set(key, value);
	return window._oldSetHeader.apply(this, arguments);	
}

function injectInterceptor() {
	if (window.location.hostname.toLowerCase().indexOf('youtube') === -1) {
	  console.log('Site is not youtube. Exiting...');
	  return;
	}

	console.log('YouTube detected.');
	if (!window.XMLHttpRequest.prototype.open) {
		console.error('Cannot inject. We cannot access XHR', window.XMLHttpRequest.prototype.open);
		return;
	}

	if (XMLHttpRequest.prototype.setRequestHeader !== window._setHeaderInterceptor) {
		console.log('Intercepting setHeader');
		window._oldSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;
		 window.XMLHttpRequest.prototype.setRequestHeader = window._setHeaderInterceptor;
	}


	if (window.XMLHttpRequest.prototype.open !== window._interceptor && window.XMLHttpRequest.prototype.open.isIntercepted !== true) {
		window.oldXHROpen = window.XMLHttpRequest.prototype.open;
		window.oldSetHeader = window.XMLHttpRequest.prototype.setHeader;
		window.XMLHttpRequest.prototype.open = window._interceptor;
		console.log('Interceptor injected.', {
			new: window._interceptor, 
			old: window.oldXHROpen});
	} else {
		console.log('Already have interceptor');
	}
		
}

window.addEventListener('DOMContentLoaded', (event) => {
    injectInterceptor();
	window._allVideos = allVideos;
});

window.addEventListener('load', (event) => {
    injectInterceptor();
	window._allVideos = allVideos;
});

window.addEventListener('message', (event) => {
    console.log(`Received message: ${event.data}`, {event});
});

})();