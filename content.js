//setTimeout(function(){ Array.from(document.getElementsByTagName('a')).forEach(function(element){  element.click() } ) },3000)
var stor_action = []
Object.keys(window).forEach(key => {
    if(/^on/.test(key)){
        window.addEventListener(key.slice(2), event => {
           if (event.type =='click') stor_action.push({event}) 
        })
    }
})


