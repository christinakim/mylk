// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var urlMatches = [
		"macys.com/bag/",
        "amazon.com/gp/cart/",
        "arcteryx.com/Checkout.aspx",
        "patagonia.com/us/order/us/shopcart.jsp",
        "rei.com/CheckCart",
        "pizzahut.com/site/order_summary",
        "instacart.com/store/checkout",
        "toysrus.com/cart/index.jsp"
        ]
    if (urlMatches.some(function(v) { return tab.url.indexOf(v) >= 0; })) {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'popup.html'
        });
        if (changeInfo.status === "complete") {
            showNotification();
        }
    } else {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'popup_random.html'
        });
    }
});

var notificationID = null;

function showNotification() {
    chrome.notifications.create("", {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icons/icon128.png'),
        title: 'mylk',
        message: 'Before you check out, consider donating $5 to help.',
        priority: 0,
        buttons: [{
                title: 'Go Donate!'
            }, {
                title: 'Check a Related Charity!'
            }
        ]
    }, function(id) {
        notificationID = id;
    });
}

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    //console.log("notifId:" + notifId);
    //console.log("notifId:" + notifId);
    if (notifId === notificationID) {
        if (btnIdx === 0) {
            chrome.tabs.create({
                url: 'https://api.venmo.com/v1/oauth/authorize?client_id=2713&scope=make_payments'
            });
        } else if (btnIdx === 1) {
            chrome.tabs.create({
                url: 'https://www.google.com'
            });
        }
    }
});
