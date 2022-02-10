
var history_action = []
var start = false
chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log(start)
  if (!start){
    return
  }

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    var  Data  = new Date();
    history_action.push({'date': `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}:${Data.getMilliseconds()}`,'events':newValue })
   
  }
  console.log(history_action)
  });



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.event == 'StartRecord' ){ 

    if (start==true){start=false;return}
    console.log(start)
    start = true
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "startRecord"});
    });
    } if (request.event == 'PlayRecord' ){
        console.log('stop')
        start = false
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log(activeTab)
     chrome.tabs.sendMessage(activeTab.id,{"message":'PlayRecord','history':history_action})
    });

    }    
  });