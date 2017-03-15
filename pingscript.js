chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.ping){
      urlString = location.protocol + '//' + location.host + "/ping_" + new Date().getTime();
      
      fetch( urlString ).then( function(response){
        sendResponse({message: "Pinged: " + urlString +
        " returning response " + response.status + ": " + response.statusText});
      });
    }
    return true;
});
