chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendRequest(tab.id, {method: "getCharity"}, function(response) {
    if(response != null){
      if(response.url.indexOf("rei.com/CheckCart") != -1){
        var charity = "give clean drinking water to developing areas!"
        document.getElementById("charity").innerHTML = charity;
      }
    }
  });
});
