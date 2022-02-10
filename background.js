
var history_action = []
var start = false
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (!start){
    return
  }

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    var  Data  = new Date();
    history_action.push({'date': `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}:${Data.getMilliseconds()}`,'events':newValue })
   
  }
});




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.event = 'StartRecord' ){ 
    if (start){start=false;return}
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "startRecord"});
  });
    }    
  });