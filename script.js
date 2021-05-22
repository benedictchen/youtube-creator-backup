/**
 * © Copyright 2021 Benedict Chen. All Rights Reserved.
 * @author Benedict Chen (benedict@benedictchen.com) 
 */

(function(){(function() {

var DONATION_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WXQKYYKPHWXHS';

if (window.location.hostname.toLowerCase().indexOf('youtube') === -1) {
  console.warn('Site is not youtube. Exiting...');
  return;
}
console.log('YouTube detected.');


window.oldXHROpen = window.XMLHttpRequest.prototype.open;

let interceptor = function (method, url, async) {
    console.log('Intercepted request: ', {url});
	if (url.indexOf('/youtubei/v1/creator/list_creator_videos') !== -1) {
		console.log('Listing page request found...');
		console.warn({this: this});
		this.addEventListener('load', function () {
            let response = JSON.parse(this.responseText);
            console.log({response})
            const { videos } = response;
			let waitTime = 0;
			// Clear old buttons
			const oldButtons = document.querySelectorAll('[data-temporary]');
			if (oldButtons) {
				Array.from(oldButtons).forEach(item => {
					item.parentNode.removeChild(item);
				});
			}
			// Create the buttons
			let downloadButton = document.createElement('button');
			downloadButton.setAttribute('data-temporary', true);
            downloadButton.textContent = "Download Videos";
            downloadButton.style = "position:absolute; right: 30px; bottom: 30px; font-size:50px; background-color:green; color: white; border-radius: 5px; padding: 30px;"
            document.body.appendChild(downloadButton);
			let cancelButton = document.createElement('button');
			cancelButton.setAttribute('data-temporary', true);
            cancelButton.textContent = "Cancel";
            cancelButton.style = "position:absolute; left: 30px; bottom: 30px; font-size:50px; background-color:red; color: white; border-radius: 5px; padding: 30px;"
			cancelButton.onclick = () => {
				document.body.removeChild(cancelButton);
				document.body.removeChild(downloadButton);
				delete downloadButton;
				delete waitTime;
			};
            document.body.appendChild(cancelButton);
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
				document.body.removeChild(downloadButton);
				document.body.removeChild(cancelButton);
				delete downloadButton;
				delete cancelButton;
				delete waitTime;
            };
        });

	}
    return oldXHROpen.apply(this, arguments);
}

if (window.XMLHttpRequest.prototype.open !== interceptor && !window.XMLHttpRequest.prototype.open.isIntercepted) {
	window.XMLHttpRequest.prototype.open = interceptor;
	interceptor.isIntercepted = true;
} else {
	console.warn('Already have interceptor');
}
})();})();
