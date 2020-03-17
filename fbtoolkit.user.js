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

// Facebook loading image
const fbLoaderImg = 'https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/GsNJNwuI-UM.gif'

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
 * Show/hide Facebook image loader next to toolkit menu item
 */
function toggleImg() {
    try {
        const img = document.querySelector('img#fbToolkitImg')
        if (img.classList.contains('hidden_elem')) {
            img.classList.remove('hidden_elem')
        } else {
            img.classList.add('hidden_elem')
        }
    } catch (exception) {
        console.error(exception)
    }
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
    try {
        toggleImg()
        let loadTimeline = setInterval(() => {
            window.scrollBy(0, document.body.scrollHeight)
            if (document.querySelector('i.img.sp_jgaSVtiDmn_.sx_fa8e49')) {
                clearInterval(loadTimeline)
                window.scrollBy(0, document.body.scrollHeight)
                window.scrollTo(0, 0)
                toggleImg()
                alert('Auto scrolling finished')
            }
        }, 100)
    } catch (exception) {
        alertError(exception, 'Scrolling the user timeline failed.')
    }
}

/**
 * Expand hidden content like comments etc.
 */ 
function expandTimeline() {
    try {
        toggleImg()
        let expand = setInterval(() => {
            document.querySelectorAll('a._4sxc._42ft, a._5v47.fss, a.see_more_link, li.showAll > a').forEach(node => node.click())
            if (!document.querySelectorAll('a._4sxc._42ft').length) {
                clearInterval(expand)
                window.scrollTo(0, 0)
                toggleImg()
                alert('All content expanded')
            }
        }, 100)
    } catch (exception) {
        alertError(exception, 'Expanding hidden content failed.')
    }
}

/**
 * Print out an user's friendlist as CSV formatted string
 * @param {*} fList Array with user's friends/followers
 */
function printList(fList) {
    try {
        const username = document.querySelector('span#fb-timeline-cover-name').textContent
        let output = `<html><head><title>${username}</title></head><body>`
        output += `<h1>${fList[0]} list of ${username}</h1><p>CSV formatted list of public ${fList[0].toLowerCase()}. `
        output += `Extracted ${fList.length - 1} visible ${fList[0].toLowerCase()} at all.</p><hr>`
        fList.shift()
        fList.forEach(user => output += `${[user.id, user.vanity, user.name, user.image].join()}<br>`)
        document.write(`${output}</body></html>`)
    } catch (exception) {
        alertError(exception, 'Printing list failed.')
    }
}

/**
 * Extract Facebook vanity username out of user's profile URL
 * @param {*} userUrl User's profile URL
 */
function getVanityName(userUrl) {
    try {
        const name = /facebook.com\/(.*?)\?/g.exec(userUrl)[1] || null
        if (name !== null && !name.contains('profile.php')) return name
        throw new Exception()
    } catch (exception) {
        return null
    }
}

/**
 * Extract an user's data out of HTML user card node
 * @param {*} userCard HTML user card node
 */
function getUserData(userCard) {
    try {
        const userId = /id=(.*?)\&/g.exec(userCard.getAttribute('data-hovercard'))[1] || null
        const vanityName = getVanityName(userCard.getAttribute('href'))
        const userName = userCard.querySelector('img:first-child').getAttribute('aria-label') || null
        const userImage = userCard.querySelector('img:first-child').getAttribute('src') || null

        return {'id': userId, 'vanity': vanityName, 'name': userName, 'image': userImage}
    } catch (exception) {
        console.error(`Parsing user card for ${userCard} failed with error ${exception}.`)
        return {}
    }
}

/**
 * Extract an user's friend-/followerlist
 */
function extractFriendlist() {
    try {
        const followersList = document.querySelector('div#pagelet_collections_followers') || null
        const friendsList = document.querySelector('div#pagelet_timeline_medley_friends') || null

        // Followers
        if (followersList !== null) {
            toggleImg()
            let loadFollowersList = setInterval(() => {
                window.scrollBy(0, document.body.scrollHeight)

                if (document.querySelector('div.morePager') === null) {
                    clearInterval(loadFollowersList)
                    window.scrollBy(0, document.body.scrollHeight)
                    window.scrollTo(0, 0)

                    let list = ['Followers']
                    followersList.querySelectorAll('ul.uiList > li.fbProfileBrowserListItem > div > a').forEach(follower => {
                        list.push(getUserData(follower))
                    })
                    return printList(list)
                }
            }, 100)
        }
        
        // Friends
        else if (friendsList !== null) {
            toggleImg()
            let loadFriendsList = setInterval(() => {
                window.scrollBy(0, document.body.scrollHeight)

                if (document.querySelectorAll('div#pagelet_timeline_medley_photos').length) {
                    clearInterval(loadFriendsList)
                    window.scrollBy(0, document.body.scrollHeight)
                    window.scrollTo(0, 0)

                    let list = ['Friends']
                    friendsList.querySelectorAll('ul.uiList > li > div[data-testid="friend_list_item"] > a').forEach(friend => {
                        list.push(getUserData(friend))
                    })
                    return printList(list)
                }
            }, 100)
        }

        else {
            return alertError('Friendlist not found.', 'You\'re not showing an user\'s friend- or followerslist.')
        }
    } catch (exception) {
        alertError(exception, 'Extracting the user\'s friendlist failed.')
    }
}


/**
 * Hide an element from DOM
 * @param {*} cssSelector DOM node identified by CSS selector
 */
function hide(cssSelector) {
    try {
        let selector = cssSelector
        let pNode = false

        if (selector.includes(':parent')) {
            pNode = true
            selector = selector.replace(':parent', '')
        }

        document.querySelectorAll(selector).forEach(element => {
            if (element != null) {
                if (pNode) element = element.parentNode
                element.style.display = 'none'
            }
        })
    } catch (exception) {}
}

/**
 * Clear/anonymize timeline
 */
function clearTimeline() {
    hide('form.commentable_item div._1dnh') // Like/Share buttons
    hide('form.commentable_item div:last-child > div.clearfix') // Comment input field
    hide('button.PageLikeButton:parent') // "Like Page" button
    hide('a[data-testid="post_chevron_button"]:parent') // Post options menu
    hide('div#pagelet_bluebar') // Facebook top bluebar
    hide('div#pagelet_timeline_profile_actions')
    hide('div#profile_timeline_overview_switcher_pagelet')
    hide('div#timeline_sticky_header_container')
    hide('ul[data-referrer="timeline_light_nav_top"]')
    hide('div#pagelet_escape_hatch') // Follow profile
    hide('a[href="/subscriptions/suggestions/"]') // "Find People to Follow" link
    hide('a[ajaxify*="/ajax/follow/follow_profile.php"]') // Follow button in followers list
    hide('a[href="/find-friends/browser/"]:parent') // "Friend Requests / Find Friends" buttons
    hide('button[aria-label="Manage"]:parent') // Manage sections button
    hide('div#pagelet_pymk_timeline')
    hide('div#pagelet_timeline_composer')
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
                <div class="uiToggle _cy7 _3nzl  hidden_elem" id="fbToolkit">
                    <a class="_2s25" rel="toggle" href="#" role="button" data-target="fbToolkitFlyout">
                        <img src="${fbLoaderImg}" class="hidden_elem" style="margin-right: 8px;" id="fbToolkitImg">
                        <span>Toolkit</span>
                    </a>
                    <div class="__tw toggleTargetClosed _3nzk" role="dialog" id="fbToolkitFlyout" style="margin: 5px 10px 0 0; padding: 10px; width: 160px">
                        <div class="beeperNub"></div>
                        <ul>
                            <li style="padding: 3px"><a href="#" id="fbToolkitUserId" class="fbToolkitLink">Get numeric user ID</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitIdCover" class="fbToolkitLink">Show user ID on cover</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitScroll" class="fbToolkitLink">Scroll user timeline</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitExpand" class="fbToolkitLink">Expand hidden content</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitClear" class="fbToolkitLink">Clear user profile</a></li>
                            <li style="padding: 3px"><a href="#" id="fbToolkitFriends" class="fbToolkitLink">Extract user's friendlist</a></li>
                            <hr>
                            <li style="padding: 3px"><a href="#" class="fbToolkitLink" onclick="window.scrollTo(0, body.scrollHeight)">Jump to bottom</a></li>
                            <li style="padding: 3px"><a href="#" class="fbToolkitLink" onclick="window.scrollTo(0, 0)">Jump to top</a></li>
                            <li style="padding: 3px"><a href="#" class="fbToolkitLink" onclick="location.reload(true)">Force reload</a></li>
                            <hr>
                            <li style="padding: 3px"><a href="https://github.com/RootDev4/Facebook-Toolkit" target="_blank">About & Help</a></li>
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
 * Show Facebook toolkit only, if user is visiting an user profile
 */
function showToolkit() {
    try {
        window.onload = () => {
            if (document.querySelector('div#pagelet_timeline_main_column')) {
                document.querySelector('div#fbToolkit').classList.remove('hidden_elem')
            } else {
                document.querySelector('div#fbToolkit').classList.add('hidden_elem')
            }
        }
    } catch (exception) {
        console.error(exception)
    }
}

/**
 * Run Facebook toolkit if visiting an user profile and add click listeners after initialization
 */
init().then(() => {
    showToolkit()
    document.body.addEventListener('click', () => showToolkit()) // Check user location and show/hide toolkit

    document.querySelectorAll('a.fbToolkitLink').forEach(link => {
        link.addEventListener('click', () => document.body.click()) // Hide flyout after action selected
    })

    document.querySelector('a#fbToolkitUserId').addEventListener('click', () => alert(getUserId()))
    document.querySelector('a#fbToolkitIdCover').addEventListener('click', () => showUserId())
    document.querySelector('a#fbToolkitScroll').addEventListener('click', () => scrollTimeline())
    document.querySelector('a#fbToolkitExpand').addEventListener('click', () => expandTimeline())
    document.querySelector('a#fbToolkitClear').addEventListener('click', () => clearTimeline())
    document.querySelector('a#fbToolkitFriends').addEventListener('click', () => extractFriendlist())
}).catch(exception => alertError(exception, 'Facebook Toolkit failed. Please reload page.'))
