
javascript:(function(){(function() {

if (window.location.hostname.toLowerCase().indexOf('youtube') === -1) {
  console.warn('Site is not youtube. Exiting...');
  return;
}
console.log('YouTube detected.');


window.oldXHROpen = window.XMLHttpRequest.prototype.open;

let downloadButton = null;
let cancelButton = null;

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
			if (downloadButton) {
				document.body.removeChild(downloadButton);	
				downloadButton = null;
			}
			if (cancelButton) {
				document.body.removeChild(cancelButton);	
				cancelButton = null;
			}
			
			downloadButton = document.createElement('button');
            downloadButton.textContent = "Download Videos";
            downloadButton.style = "position:absolute; right: 30px; bottom: 30px; font-size:50px; background-color:green; color: white; border-radius: 5px; padding: 30px;"
            document.body.appendChild(downloadButton);
			cancelButton = document.createElement('button');
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
                    waitTime += 15000;
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
if (window.XMLHttpRequest.prototype.open !== interceptor) {
	window.XMLHttpRequest.prototype.open = interceptor;
} else {
	console.warn('Already have interceptor');
}
})();})();