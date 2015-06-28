// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


var charityKeyword = "";

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

    var charityJSON = {
    	"malaria": "malaria_id",
    	"lung cancer" : "lung_cancer_id",
    	"gang violence" : "",
    	"poverty": "poverty_id"
    }
    
    if (urlMatches.some(function(v) { return tab.url.indexOf(v) >= 0; })) {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'popup.html'
        });
        if (changeInfo.status === "complete") {
            showNotification();
        }
    } else {
        var charityKeywordFound = false; // boolean showing whether the webpage contains a keyword

    	// This requests the title and meta description from the content script
    	chrome.tabs.getSelected(null, function(tab) {
		  chrome.tabs.sendRequest(tab.id, {method: "getTitleAndMeta"}, function(response) {
		  	if (response == null) return;

		  	// Because the keywords are lower case
		    var title = response.title == null ? "" : response.title.toLowerCase();
		    var metaDesc = response.metaDesc == null ? "" : response.metaDesc.toLowerCase();

		    // This is synchronous...in case you thought it might by async like me
		    Object.keys(charityJSON).forEach(function(element, index, array){
		    	if(title.includes(element) || metaDesc.includes(element)){
		    		charityKeywordFound = true;
		    		charityKeyword = element.split(' ').join('+');
		    		var charityId = charityJSON[element];
		    	}
		    })

		    if (changeInfo.status === "complete" && charityKeywordFound) {
	            showNotification();
	        }

		    var popupFile = charityKeywordFound ? "popup.html" : "popup_random.html"
		    chrome.browserAction.setPopup({
	            tabId: tabId,
	            popup: popupFile
	        });

		  })
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
    if (notifId === notificationID) {
        if (btnIdx === 0) {
            chrome.tabs.create({
                url: 'https://api.venmo.com/v1/oauth/authorize?client_id=2713&scope=make_payments'
            });
        } else if (btnIdx === 1) {
            var category = charityKeyword || 'hunger';
            console.log(category);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/get-charity-recommendation?category="+category, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var resp = JSON.parse(xhr.responseText);
                    chrome.tabs.create({
                        url: resp.url
                    });
                }
            };
            xhr.send();
        }
    }
});
