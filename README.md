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

- Download Firefox (because Chrome sucks and you can have multiple simultaneous downloads).
    - In the search bar, enter `about:config`
    - Confirm
    - Enter `network.http.max-persistent-connections-per-server` and edit the value to `99999999999`

- Chrome Instructions (Why? Do you hate your RAM?)
    - View > Always Show Bookmarks Bar (or press Shift + Command + B on a Mac / Shift + Control + B on PC)
    -  Right click on Bookmarks Bar, click "Add Page"
    - Enter the following:
    
    ```
    javascript:(function()%7Bjavascript%3A(function()%7B(function()%20%7Bif%20(window.location.hostname.toLowerCase().indexOf('youtube')%20%3D%3D%3D%20-1)%20%7Bconsole.warn('Site%20is%20not%20youtube.%20Exiting...')%3Breturn%3B%7Dconsole.log('YouTube%20detected.')%3Bwindow.oldXHROpen%20%3D%20window.XMLHttpRequest.prototype.open%3Blet%20downloadButton%20%3D%20null%3Blet%20cancelButton%20%3D%20null%3Blet%20interceptor%20%3D%20function%20(method%2C%20url%2C%20async)%20%7Bconsole.log('Intercepted%20request%3A%20'%2C%20%7Burl%7D)%3Bif%20(url.indexOf('%2Fyoutubei%2Fv1%2Fcreator%2Flist_creator_videos')%20!%3D%3D%20-1)%20%7Bconsole.log('Listing%20page%20request%20found...')%3Bconsole.warn(%7Bthis%3A%20this%7D)%3Bthis.addEventListener('load'%2C%20function%20()%20%7Blet%20response%20%3D%20JSON.parse(this.responseText)%3Bconsole.log(%7Bresponse%7D)const%20%7B%20videos%20%7D%20%3D%20response%3Blet%20waitTime%20%3D%200%3B%2F%2F%20Clear%20old%20buttonsif%20(downloadButton)%20%7Bdocument.body.removeChild(downloadButton)%3BdownloadButton%20%3D%20null%3B%7Dif%20(cancelButton)%20%7Bdocument.body.removeChild(cancelButton)%3BcancelButton%20%3D%20null%3B%7DdownloadButton%20%3D%20document.createElement('button')%3BdownloadButton.textContent%20%3D%20%22Download%20Videos%22%3BdownloadButton.style%20%3D%20%22position%3Aabsolute%3B%20right%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Agreen%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22document.body.appendChild(downloadButton)%3BcancelButton%20%3D%20document.createElement('button')%3BcancelButton.textContent%20%3D%20%22Cancel%22%3BcancelButton.style%20%3D%20%22position%3Aabsolute%3B%20left%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Ared%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22cancelButton.onclick%20%3D%20()%20%3D%3E%20%7Bdocument.body.removeChild(cancelButton)%3Bdocument.body.removeChild(downloadButton)%3Bdelete%20downloadButton%3Bdelete%20waitTime%3B%7D%3Bdocument.body.appendChild(cancelButton)%3BdownloadButton.onclick%20%3D%20()%20%3D%3E%20%7Bvideos.forEach((item)%20%3D%3E%20%7Bconsole.log(item)%3Blet%20dataUrl%20%3D%20%60https%3A%2F%2Fwww.youtube.com%24%7Bitem.downloadUrl%7D%60%3Bconsole.log(%7B%20dataUrl%20%7D)setTimeout(()%20%3D%3E%20%7Bwindow.open(dataUrl%2C%20item.videoId)%3B%7D%2C%20waitTime)%3BwaitTime%20%2B%3D%2015000%3B%7D)%3Bdocument.body.removeChild(downloadButton)%3Bdocument.body.removeChild(cancelButton)%3Bdelete%20downloadButton%3Bdelete%20cancelButton%3Bdelete%20waitTime%3B%7D%3B%7D)%3B%7Dreturn%20oldXHROpen.apply(this%2C%20arguments)%3B%7Dif%20(window.XMLHttpRequest.prototype.open%20!%3D%3D%20interceptor)%20%7Bwindow.XMLHttpRequest.prototype.open%20%3D%20interceptor%3B%7D%20else%20%7Bconsole.warn('Already%20have%20interceptor')%3B%7D%7D)()%3B%7D)()%7D)()
    ```

- Firefox 
    - Press `CMD + SHIFT + B` to show Bookmarks Toolbar
    - Click `Manage bookbarks...`
    - Press the gear shaped button on the top left
    - Select `New Bookmark`
    - For name, you can enter anything. Suggested: `F**k Youtube`
    - For location, enter the following:
    ```
    javascript:(function()%7Bjavascript%3A(function()%7B(function()%20%7Bif%20(window.location.hostname.toLowerCase().indexOf('youtube')%20%3D%3D%3D%20-1)%20%7Bconsole.warn('Site%20is%20not%20youtube.%20Exiting...')%3Breturn%3B%7Dconsole.log('YouTube%20detected.')%3Bwindow.oldXHROpen%20%3D%20window.XMLHttpRequest.prototype.open%3Blet%20downloadButton%20%3D%20null%3Blet%20cancelButton%20%3D%20null%3Blet%20interceptor%20%3D%20function%20(method%2C%20url%2C%20async)%20%7Bconsole.log('Intercepted%20request%3A%20'%2C%20%7Burl%7D)%3Bif%20(url.indexOf('%2Fyoutubei%2Fv1%2Fcreator%2Flist_creator_videos')%20!%3D%3D%20-1)%20%7Bconsole.log('Listing%20page%20request%20found...')%3Bconsole.warn(%7Bthis%3A%20this%7D)%3Bthis.addEventListener('load'%2C%20function%20()%20%7Blet%20response%20%3D%20JSON.parse(this.responseText)%3Bconsole.log(%7Bresponse%7D)const%20%7B%20videos%20%7D%20%3D%20response%3Blet%20waitTime%20%3D%200%3B%2F%2F%20Clear%20old%20buttonsif%20(downloadButton)%20%7Bdocument.body.removeChild(downloadButton)%3BdownloadButton%20%3D%20null%3B%7Dif%20(cancelButton)%20%7Bdocument.body.removeChild(cancelButton)%3BcancelButton%20%3D%20null%3B%7DdownloadButton%20%3D%20document.createElement('button')%3BdownloadButton.textContent%20%3D%20%22Download%20Videos%22%3BdownloadButton.style%20%3D%20%22position%3Aabsolute%3B%20right%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Agreen%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22document.body.appendChild(downloadButton)%3BcancelButton%20%3D%20document.createElement('button')%3BcancelButton.textContent%20%3D%20%22Cancel%22%3BcancelButton.style%20%3D%20%22position%3Aabsolute%3B%20left%3A%2030px%3B%20bottom%3A%2030px%3B%20font-size%3A50px%3B%20background-color%3Ared%3B%20color%3A%20white%3B%20border-radius%3A%205px%3B%20padding%3A%2030px%3B%22cancelButton.onclick%20%3D%20()%20%3D%3E%20%7Bdocument.body.removeChild(cancelButton)%3Bdocument.body.removeChild(downloadButton)%3Bdelete%20downloadButton%3Bdelete%20waitTime%3B%7D%3Bdocument.body.appendChild(cancelButton)%3BdownloadButton.onclick%20%3D%20()%20%3D%3E%20%7Bvideos.forEach((item)%20%3D%3E%20%7Bconsole.log(item)%3Blet%20dataUrl%20%3D%20%60https%3A%2F%2Fwww.youtube.com%24%7Bitem.downloadUrl%7D%60%3Bconsole.log(%7B%20dataUrl%20%7D)setTimeout(()%20%3D%3E%20%7Bwindow.open(dataUrl%2C%20item.videoId)%3B%7D%2C%20waitTime)%3BwaitTime%20%2B%3D%2015000%3B%7D)%3Bdocument.body.removeChild(downloadButton)%3Bdocument.body.removeChild(cancelButton)%3Bdelete%20downloadButton%3Bdelete%20cancelButton%3Bdelete%20waitTime%3B%7D%3B%7D)%3B%7Dreturn%20oldXHROpen.apply(this%2C%20arguments)%3B%7Dif%20(window.XMLHttpRequest.prototype.open%20!%3D%3D%20interceptor)%20%7Bwindow.XMLHttpRequest.prototype.open%20%3D%20interceptor%3B%7D%20else%20%7Bconsole.warn('Already%20have%20interceptor')%3B%7D%7D)()%3B%7D)()%7D)()
    ```
    - Click `Done`
    - You should now see the bookmark in your toolbar or bookmarks menu.
  
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





