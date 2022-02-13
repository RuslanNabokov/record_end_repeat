
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

  });


function start_record(){

    start = true
    chrome.runtime.sendMessage({
    msg: "StartRecord", 
    data: {}
    });
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message":   "startRecord"});
    });

chrome.storage.local.set({'status': 'StartRecord'}, function() {
    console.log('Update storage: status: StartRecord')
});

}


function stop_record(){
    start = false
    chrome.runtime.sendMessage({
    msg: "StopRecord", 
    data: {}
    });
chrome.storage.local.set({'status': 'StopRecord'}, function() {});
console.log('Update storage: status: StartRecord')
}
function play_record(){
    stop_record()
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
     chrome.tabs.sendMessage(activeTab.id,{"message":'PlayRecord','history':history_action})
    });
chrome.storage.local.set({'status': 'PlayRecord'}, function() {});

}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.event == 'StartRecord' ){ 

    if (start){
        stop_record()
        return
    }
    start_record()

    
    } if (request.event == 'PlayRecord' ){
        play_record()
    
    }    
  });



