// ==UserScript==
// @name        Facebook Toolkit
// @namespace   https://github.com/RootDev4/Facebook-Toolkit
// @version     0.1
// @description JavaScript Userscript for Facebook automation
// @author      RootDev4 (Chris)
// @match       https://www.facebook.com/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

/**
 * Alert an error message to user
 * @param {*} exception Message of thrown exception
 * @param {*} message Message to show to user
 */
function alertError(exception, message) {
    console.error(exception)
    alert(message + '\nPlease see console log for details.')
}

/**
 * Get numeric Facebook user ID
 */
function getUserId() {
    try {
        const pagelet = document.getElementById('pagelet_timeline_main_column')
        return JSON.parse(pagelet.getAttribute('data-gt')).profile_owner
    } catch (exception) {
        alertError(exception, 'Getting Facebook user ID failed.')
    }
    return 0
}

/**
 * Show numeric Facebook user ID on timeline cover
 */
function showUserId() {
    try {
        const userIdNode = document.createElement('span')
        userIdNode.innerHTML = `<span style="color:#fff; font-size:120%;">Facebook ID: ${getUserId()}</span>`
        document.getElementById('fb-timeline-cover-name').parentNode.parentNode.append(userIdNode)
    } catch (exception) {
        alertError(exception, 'Showing Facebook user ID on timeline cover failed.')
    }
}

/**
 * Scroll user timeline
 */
function scrollTimeline() {
    let task = null
    try {
        task = setInterval(() => {
            window.scrollBy(0, document.body.scrollHeight)
            if (document.querySelector('i.img.sp_jgaSVtiDmn_.sx_fa8e49')) {
                clearInterval(task)
                window.scrollBy(0, document.body.scrollHeight)
                window.scrollTo(0, 0)
            }
        }, 100)
    } catch (exception) {
        alertError(exception, 'Scrolling the user timeline failed.')
    }
}

/**
 * Hide an element from DOM
 * @param {*} item DOM node
 */
function hide(element) {
    try {
        if (element != null) {
            element.style.display = 'none'
        }
    } catch (exception) {}
}

/**
 * Clear/anonymize timeline
 */
function clearTimeline() {
    hide(document.getElementById('pagelet_bluebar'))
    hide(document.getElementById('pagelet_timeline_profile_actions'))
    hide(document.getElementById('timeline_sticky_header_container'))
    hide(document.querySelector('ul[data-referrer="timeline_light_nav_top"]'))
    hide(document.getElementById('pagelet_escape_hatch'))
    hide(document.getElementById('pagelet_pymk_timeline'))
    hide(document.getElementById('pagelet_timeline_composer'))
    // Add more elements here...
}

/**
 * Insert toolkit menu point and flyout into Facebook bluebar
 */
async function init() {
    new Promise((resolve, reject) => {
        try {
            const menuItem = document.querySelector('div[role="navigation"] > div')
            const newItem = document.createElement('div')
            newItem.classList.add('_4kny', '_2s24')
            newItem.innerHTML = `<!--Facebook Toolkit by RootDev4-->
                <div class="uiToggle _cy7 _3nzl">
                    <a class="_2s25" rel="toggle" href="#" role="button" data-target="fbToolkitFlyout">Toolkit</a>
                    <div class="__tw toggleTargetClosed _3nzk" role="dialog" id="fbToolkitFlyout" style="margin: 5px 10px 0 0; width: 160px">
                        <div class="beeperNub"></div>
                        <ul style="padding: 10px">
                            <li style="padding: 3px"><a href="#" id="fbToolkitUserId">Get numeric user ID</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitIdCover">Show user ID on cover</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitScroll">Scroll user timeline</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitExpand">Expand hidden contents</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitClear">Clear timeline</a></li>
                            <hr>
                            <li style="padding: 3px"><a href="#" onclick="window.scrollTo(0, body.scrollHeight)">Jump to page bottom</a></li>
                            <li style="padding: 3px"><a href="#" onclick="window.scrollTo(0, 0)">Jump to page top</a></li>
                            <li style="padding: 3px"><a href="#" onclick="location.reload(true)">Force page reload</a></li>
                        </ul>
                    </div>
                </div>`
            resolve(menuItem.appendChild(newItem))
        } catch (exception) {
            reject(exception)
        }
    })
}

/**
 * Run Facebook toolkit and add click listeners after initialization
 */
init().then(() => {
    document.querySelector('a#fbToolkitUserId').addEventListener('click', () => alert(getUserId()))
    document.querySelector('a#fbToolkitIdCover').addEventListener('click', () => showUserId())
    document.querySelector('a#fbToolkitScroll').addEventListener('click', () => scrollTimeline())
    document.querySelector('a#fbToolkitExpand').addEventListener('click', () => alert('Function not implemented yet, sorry'))
    document.querySelector('a#fbToolkitClear').addEventListener('click', () => clearTimeline())
}).catch(exception => alertError(exception, 'Facebook Toolkit failed. Please reload page.'))
