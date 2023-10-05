//grabbing the textarea element where the typed message is:
let messageContainer = document.getElementById("message-box");

/*
    Every time the textarea is update (any time it changes) the function bellow is called byt the event
*/
function calculateCharNumber(){

    let messageContent = messageContainer.value;    //takes the string within 
    let charNumber = messageContent.length;         //calculates the length (including spaces) of said string

    document.getElementById("current-counter").textContent = charNumber; //updates the value to the screen


    //just a little touch inline styling to change the color
     if (charNumber === 150){
        document.getElementById("word-counter").style.color = "red";
    } else {
        document.getElementById("word-counter").style.color = "black";
    }
}

//event listener
messageContainer.addEventListener("input", calculateCharNumber);