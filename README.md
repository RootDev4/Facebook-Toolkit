# Facebook Toolkit
JavaScript Userscript for Facebook automation.

![Facebook Toolkit](https://www1.xup.in/exec/ximg.php?fid=14551942)

## Usage

Install browser addon Greasemonkey or Tampermonkey (I recommend to use Google Chrome browser). After installation, open [fbtoolkit.user.js script file](https://github.com/RootDev4/Facebook-Toolkit/blob/master/fbtoolkit.user.js) and click the **Raw** button. The user script gets installed automatically by Greasemonkey/Tampermonkey addon. Facebook Toolkit is now accessible from the bluebar. Visit any Facebook user profile to test.

## Troubleshooting

If Facebook Toolkit isn't present in the bluebar or doesn't respond, please reload the page manually by pressing Shift+F5. This will reload the whole page from the server and not from your browser's cache.

Due to Facebook's regular modifications of HTML structure / DOM, some element selectors may not work correctly (especially for expanding user's timeline). If so, please visit my GitHub profile and leave me a hint over email. Thanks in advance!

## Functionality

Scrolling/extracting actions are confirmed by a popup message when finished. So please be patient, if the script will run a little longer...

### Get numeric user ID
Return the numeric Facebook user ID in a popup window.

### Show user ID on cover
Display the numeric Facebook user ID inside the timeline cover right below the username.

### Scroll user timeline
Scroll the user's timeline to the very beginning automatically.

### Expand hidden content
Expand hidden content like "See more" text or covered comments.

### Clear timeline
Remove boxes and buttons with unwanted content for printing the user's profile.

### Extract user's friendlist
Extract all visible friends or followers and print out as CSV formatted string. After you had copied the output, reload the page manually to get back to Facebook.

### Download user's photos
Download all uploaded photos. After scraping user's photos, please save page manually to your computer (Ctrl+S) to download all photos. After you had downloaded the page, reload the page manually to get back to Facebook.

### Jump to page bottom / Jump to page top
Self-explaining.

### Force page reload
Reload the current page from the server (not from the cache).