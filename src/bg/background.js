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
    } else {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'popup_random.html'
        });
    }
});