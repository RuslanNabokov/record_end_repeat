//setTimeout(function(){ Array.from(document.getElementsByTagName('a')).forEach(function(element){  element.click() } ) },3000)
console.log(1)

var current_location  = window.location.href
var stor_action = []
stor_action[current_location] =  []

// if (Array.isArray(obj[key])){
               
//                 let arr = []
//                 for(i in obj[key]){
                    // if (typeof(obj[key][i]) == 'object'){
                    //     arr[i] = copy_obj(obj[key][i])
//                     }else{
//                         arr[i] = obj[key][i]
//                     }
//                     console.log(arr)
//                 }
//                 new_ob[key]  = arr
//             }

function copy_obj(obj){
        let new_ob = {}
        if (typeof(obj) == 'object') {

        for (key  in obj){
            if (obj[key] == 'object') {
                  new_ob['key'] = copy_obj(obj[key])
                  return new_ob
            }else if(Array.isArray(obj[key])){
                new_ob[key] = copy_obj(obj[key])

            }else{
            new_ob[key] = obj[key]
        }
        }
        return new_ob

    }else{
        let arr = []
        for (i  in obj){
        if (typeof(obj[i]) == 'object'){
            arr[i] = copy_obj(obj[i])
        }else{
            arr[i] = obj[i]
        }
        return arr
        } 
    }
}

function get_prop(obj,key) {
    try {

    return  obj[key];
  } catch (e) {
    return '';
  }

}


Object.keys(window).forEach(key => {
    if(/^on/.test(key)){
        window.addEventListener(key.slice(2), event => {

           if (event.type =='click'){ 
            event_transfer = copy_obj(event)
          
            event_transfer.path_class_name_or_id  = []
            for (i in event.path){
               
    event_transfer.path_class_name_or_id.push({'id':get_prop(event.path[i],'id'),'className':get_prop(event.path[i],'className')})
            }
            event_transfer.current_location = current_location
            
            chrome.storage.sync.set({data: event_transfer},function(result){ console.log(`update store for ${current_location}`)} ) 
        }
        })
    }
})


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)
    if( request.message == "PlayRecord" ) {
        console.log(request)
        
    }
  })

// setInterval(()=>{stor_action[current_location][stor_action[current_location].length -1] },1000)



// chrome.storage.sync.get(['d'] , function(result) {
//    console.log(result) 
// });




//stor_action[current_location][stor_action[current_location].length -1].event.path[0].remove()


