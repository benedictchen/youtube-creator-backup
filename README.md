WORK IN PROGRESS

# YouTube Creator Account Video Downloader

Author: Benedict Chen (benedict@benedictchen.com)

--------------

If this was helpful to you, please buy me (@benedictchen) a beer on PayPal: [Click Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WXQKYYKPHWXHS)

--------------

## Why 

Because Google sucks.  Google Takeout is impossible thanks to "Failed - Network Error" that magically happens every single time you try to download.  
They have also eliminated the ability to sync to other cloud providers.  There is no way to bulk download this stuff yourself.  Not because Googlers
aren't able to write the code for it, but because they're jerks.  

## Instructions

Note: Don't use Firefox. For whatever reason, the script won't work in their browser. 

- Chrome Instructions 
    - View > Always Show Bookmarks Bar (or press Shift + Command + B on a Mac / Shift + Control + B on PC)
    -  Right click on Bookmarks Bar, click "Add Page"
    - Enter the following:
    ```
  javascript:(function()%7Bjavascript%3A(function()%7B(function()%20%7B%0A%0Avar%20DONATION_URL%20%3D%20'https%3A%2F%2Fwww.paypal.com%2Fcgi-bin%2Fwebscr%3Fcmd%3D_s-xclick%26hosted_button_id%3DWXQKYYKPHWXHS'%3B%0A%0Aif%20(window.location.hostname.toLowerCase().indexOf('youtube')%20%3D%3D%3D%20-1)%20%7B%0A%20%20console.warn('Site%20is%20not%20youtube.%20Exiting...')%3B%0A%20%20return%3B%0A%7D%0Aconsole.log('YouTube%20detected.')%3B%0A%0A%0Awindow.oldXHROpen%20%3D%20window.XMLHttpRequest.prototype.open%3B%0A%0Alet%20interceptor%20%3D%20function%20(method%2C%20url%2C%20async)%20%7B%0A%20%20%20%20console.log('Intercepted%20request%3A%20'%2C%20%7Burl%7D)%3B%0A%09if%20(url.indexOf('%2Fyoutubei%2Fv1%2Fcreator%2Flist_creator_videos')%20!%3D%3D%20-1)%20%7B%0A%09%09console.log('Listing%20page%20request%20found...')%3B%0A%09%09console.warn(%7Bthis%3A%20this%7D)%3B%0A%09%09this.addEventListener('load'%2C%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20response%20%3D%20JSON.parse(this.responseText)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log(%7Bresponse%7D)%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20%7B%20videos%20%7D%20%3D%20response%3B%0A%09%09%09let%20waitTime%20%3D%200%3B%0A%09%09%09%2F%2F%20Clear%20old%20buttons%0A%09%09%09const%20oldButtons%20%3D%20document.querySelectorAll('%5Bdata-temporary%5D')%3B%0A%09%09%09if%20(oldButtons)%20%7B%0A%09%09%09%09Array.from(oldButtons).forEach(item%20%3D%3E%20%7B%0A%09%09%09%09%09item.parentNode.removeChild(item)%3B%0A%09%09%09%09%7D)%3B%0A%09%09%09%7D%0A%09%09%09%2F%2F%20Create%20the%20buttons%0A%09%09%09let%20downloadButton%20%3D%20document.createElement('button')%3B%0A%09%09%09downloadButton.setAttribute('data-temporary'%2C%20true)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20downloadButton.textContent%20%3D%20%22Download%20Videos%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20downloadButton.style%20%3D%20%22position%3Aabsolute%3B%20right%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Agreen%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22%0A%20%20%20%20%20%20%20%20%20%20%20%20document.body.appendChild(downloadButton)%3B%0A%09%09%09let%20cancelButton%20%3D%20document.createElement('button')%3B%0A%09%09%09cancelButton.setAttribute('data-temporary'%2C%20true)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20cancelButton.textContent%20%3D%20%22Cancel%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20cancelButton.style%20%3D%20%22position%3Aabsolute%3B%20left%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Ared%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22%0A%09%09%09cancelButton.onclick%20%3D%20()%20%3D%3E%20%7B%0A%09%09%09%09document.body.removeChild(cancelButton)%3B%0A%09%09%09%09document.body.removeChild(downloadButton)%3B%0A%09%09%09%09delete%20downloadButton%3B%0A%09%09%09%09delete%20waitTime%3B%0A%09%09%09%7D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20document.body.appendChild(cancelButton)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20downloadButton.onclick%20%3D%20()%20%3D%3E%20%7B%20%0A%09%09%09%09videos.forEach((item)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log(item)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20dataUrl%20%3D%20%60https%3A%2F%2Fwww.youtube.com%24%7Bitem.downloadUrl%7D%60%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log(%7B%20dataUrl%20%7D)%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20window.open(dataUrl%2C%20item.videoId)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20waitTime)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20waitTime%20%2B%3D%2015000%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(Math.floor(Math.random()%20*%2010)%20%3D%3D%3D%208)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%09%2F%2F%20Please%20donate!%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%09setTimeout(()%20%3D%3E%20window.open(DONATION_URL)%2C%2010000)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%09%09%09%09document.body.removeChild(downloadButton)%3B%0A%09%09%09%09document.body.removeChild(cancelButton)%3B%0A%09%09%09%09delete%20downloadButton%3B%0A%09%09%09%09delete%20cancelButton%3B%0A%09%09%09%09delete%20waitTime%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%0A%09%7D%0A%20%20%20%20return%20oldXHROpen.apply(this%2C%20arguments)%3B%0A%7D%0A%0Aif%20(window.XMLHttpRequest.prototype.open%20!%3D%3D%20interceptor%20%26%26%20!window.XMLHttpRequest.prototype.open.isIntercepted)%20%7B%0A%09window.XMLHttpRequest.prototype.open%20%3D%20interceptor%3B%0A%09interceptor.isIntercepted%20%3D%20true%3B%0A%7D%20else%20%7B%0A%09console.warn('Already%20have%20interceptor')%3B%0A%7D%0A%7D)()%3B%7D)()%3B%7D)()%3B
    ```

###  Downloading the videos
  - Load browser of choice
  - Go to [Youtube Creator Studio ](https://studio.youtube.com)
  - Click the bookmark you created (as per instructions)
  - Log in.
  - Navigate to list of videos you wish to download.
  - A large download button should appear.  Click it.
  - Enjoy!
  




--------------

If this was helpful to you, please buy me (@benedictchen) a beer on PayPal: [Click Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WXQKYYKPHWXHS)

--------------


Credit
- An actually working Bookmarklet Generator: https://caiorss.github.io/bookmarklet-maker/



