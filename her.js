


let start_button  = document.getElementById('StartRecord')   

let play_button  = document.getElementById('PlayRecord')




start_button.addEventListener('click',function(){
if(start_button.innerText.toLowerCase() === 'начать запись') {
    start_button.innerText = 'Остановить';
  }else{
  	start_button.innerText = 'начать запись';
  }
	chrome.runtime.sendMessage({'event':'StartRecord'});	

})


play_button.addEventListener('click',function(){
	
	chrome.runtime.sendMessage({'event':'PlayRecord'});	

})
