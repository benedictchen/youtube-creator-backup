/**
 * © Copyright 2021 Benedict Chen. All Rights Reserved.
 * @author Benedict Chen (benedict@benedictchen.com) 
 */

var DONATION_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WXQKYYKPHWXHS';

const allVideos = new Map();
let waitTime = 0;

function removeElement(el) {
	if (el !== document.body) {
		el.parentNode.removeChild(el)	
	}
}


function renderListOfVideos() {
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
			console.warn({item: item, parent: item.parent})
			removeElement(item);
		});
	}
}

function handleInterceptedRequest () {
    let response = JSON.parse(this.responseText);
    console.warn('Server listing response:', {response})
    const { videos } = response;
    videos.forEach((video) => allVideos.set(video.videoId, video));
    renderListOfVideos()
    console.log('videos added:', {allVideos})
	
	// Clear old buttons
	removeButtons();
	// Create the buttons
	createButtons(videos);
}


let interceptor = function (method, url, async) {
	if (url.indexOf('/youtubei/v1/creator/list_creator_videos') !== -1) {
		console.log('Listing page request found...', { method, url, isAsync: async});
		console.warn({this: this});
		this.addEventListener('load', handleInterceptedRequest);

	}
    return oldXHROpen.apply(this, arguments);
}


function injectInterceptor() {
	window.oldXHROpen = window.XMLHttpRequest.prototype.open;
	if (window.location.hostname.toLowerCase().indexOf('youtube') === -1) {
	  console.warn('Site is not youtube. Exiting...');
	  return;
	}

	console.log('YouTube detected.');
	if (!window.XMLHttpRequest.prototype.open) {
		console.error('Cannot inject. We cannot access XHR', window.XMLHttpRequest.prototype.open);
		return;
	}

	if (window.XMLHttpRequest.prototype.open !== interceptor && !window.XMLHttpRequest.prototype.open.isIntercepted) {
		window.XMLHttpRequest.prototype.open = interceptor;
		interceptor.isIntercepted = true;
		console.log('Interceptor injected.', {
			new: interceptor, 
			old: window.oldXHROpen});
	} else {
		console.warn('Already have interceptor');
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
