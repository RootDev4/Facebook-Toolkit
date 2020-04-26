# Facebook Toolkit
JavaScript Userscript for Facebook automation.

![Facebook Toolkit](https://www1.xup.in/exec/ximg.php?fid=14551942)

## Usage

Install browser addon Greasemonkey or Tampermonkey, I'm recommending Google Chrome browser at this point. After installation, open the [script file](https://github.com/RootDev4/Facebook-Toolkit/blob/master/fbtoolkit.user.js) in your browser (GitHub) and click the **Raw** button. The user script gets installed automatically by Greasemonkey/Tampermonkey addon. Facebook Toolkit is now accessible from the bluebar. Visit any Facebook user profile to test.

## Troubleshooting

If Facebook Toolkit isn't present in the bluebar or doesn't respond, please reload the page manually by pressing Shift+F5. This will reload the whole page from the server and not from your browser's cache.

Due to Facebook's regular modifications of HTML structure / DOM, some xpath selectors may not work correctly. If so, please visit my GitHub profile and leave me a hint over email. Thanks in advance!

## Functionality

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
Extract all visible friends or followers and print out as CSV formatted string.

### Download user's photos
Download all uploaded photos. After scraping user's photos, please save page manually to your computer (Ctrl+S) to download all photos.

### Jump to page bottom / Jump to page top
Self-explaining.

### Force page reload
Reload the current page from the server (not from the cache).