


let start_button  = document.getElementById('StartRecord')   

// let play_button  = document.getElementById('PlayRecord')

// chrome.storage.sync.get("key", function (obj) {
//     console.log(obj);
// });

console.log(start_button)
start_button.addEventListener('click',function(){
chrome.runtime.sendMessage({'event':'StartRecord'});

});


// play_button.addEventListener('click',function(){
// 	chrome.runtime.sendMessage({'event':'PlayRecord'});	
// })




chrome.storage.local.get('status', function(result) {

 if ( result['status']  == 'StartRecord'){start_button.innerText = 'Остановить'}
 	else if (result['status'] = 'PlayRecord'){
 		play_button = 'Остановить воспроизведение'
 	}
});






// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.msg === "StartRecord") {
//        	try {
//        		 start_button.innerText = 'Остановить'; 
  		
//   		} catch (e) {
//     	console.log('Что-то пошло не так (')
//   }
//             //  To do something
//             // console.log(request.data.subject)
//             // console.log(request.data.content)

//         }else{ 
//      	try {
//        		 start_button.innerText = 'Начать запись';
//        		 play_button.innerText = 'Остановить воспроизведение'
  		
//   		} catch (e) {
//     	console.log('Что-то пошло не так (')
//   		}



//         }
//     }
// );


let test_arr_field_record = [200,1500,4800,10000]
const length_filer_record = 220
const delimeter = 44
const one_ms_to_px = length_filer_record / 10000
 for(let i = test_arr_field_record.length - 1; i >= 0; i--) {
 
  let current_block_time = test_arr_field_record[i]
  let position_x =  current_block_time * one_ms_to_px
  let block = document.createElement('div')
  let block_style_left =  position_x + 'px'  
  block.setAttribute('class', 'block-her')
  block.style.setProperty('--element-left', block_style_left);
  document.getElementById('recordField').appendChild(block)

  }

  setInterval(function(){
    
    let line = document.getElementById('lineRecord')
    let record_field = document.getElementById('recordField')
    // let blocks = record_field.querySelector('.block-her')
    let blocks = document.getElementsByClassName('block-her')
   
    line.style.right =  line.style.right ? parseInt(line.style.right) + parseFloat(2.2) + 'px': one_ms_to_px
    for (var i = blocks.length - 1; i >= 0; i--) {
      let block =blocks[i]
      let block_left = block.style.getPropertyValue('--element-left')
    
      block.style.setProperty('--element-left', parseFloat(block_left) - parseFloat(2.2)  + 'px' );
    }
  },100 )






