tabstatus = {};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  if( changeInfo.status == "complete" ){
    
    chrome.pageAction.show(tabId);
    
    if( tabstatus.hasOwnProperty(tabId) && tabstatus[tabId] != false ){
      
      chrome.pageAction.setIcon({'tabId':tab.id, 'path':'icons/reload.png'});
      
    }
    else{
      
      tabstatus[tabId] = false;
      
    }
    
  }
  
});

chrome.tabs.onRemoved.addListener(function(tabId){
  if( tabstatus[tabId] != false ){
    clearInterval(tabstatus[tabId]);
  }
  delete tabstatus[tabId];
  
});

//Listen for click for a given tab.
chrome.pageAction.onClicked.addListener(function(tab){
  
  if(tabstatus[tab.id] == false){
    
    tabstatus[tab.id] = setInterval( function(){ajaxPing(tab.id);}, 180000 );
    //tabstatus[tab.id] = setInterval( function(){ajaxPing(tab.id);}, 10000 );
    chrome.pageAction.setIcon({'tabId':tab.id, 'path':'icons/reload.png'});
    
  }
  else{
    
    clearInterval(tabstatus[tab.id]);
    tabstatus[tab.id] = false;
    chrome.pageAction.setIcon({'tabId':tab.id, 'path':'icons/pause.png'});
    
  }
  
});

ajaxPing = function(tabId){
  
  chrome.tabs.sendMessage(tabId, {ping: true}, function(response) {
    console.log(response.message);
  });
  
}
