chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.ping){
      urlString = location.protocol + '//' + location.host + "/ping_" + new Date().getTime();
      $.ajax({
        url: urlString,
        complete: function(response, statusString){
          sendResponse({message: "Pinged: " + urlString + " returning status " + statusString + "."});
        }
      });
    }
    return true;
});
