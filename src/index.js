/* ------------------------- UPDATES THE TEXT LENGTH ON THE SCREEN  ------------------------- */


let messageContainer = document.getElementById("message-box");

/*Every time the textarea is update (any time it changes) the function bellow is called by the event*/
function show_text_length_on_screen() {

    let messageContent = messageContainer.value;    //takes the string within 
    let charNumber = messageContent.length;         //calculates the length (including spaces) of said string

    document.getElementById("current-counter").textContent = charNumber; //updates the value to the screen


    //just a little touch of inline styling to change the color
    if (charNumber === 150) {
        document.getElementById("word-counter").style.color = "red";
    } else {
        document.getElementById("word-counter").style.color = "black";
    }
}

//on input event listener
messageContainer.addEventListener("input", show_text_length_on_screen);















/* ------------------------- ENCRYPTING THE MESSAGE ------------------------- */


//function that converts each character on the string to a corresponding number
function convert_char_to_number() {

    //user message string
    let stringMessage = document.getElementById("message-box").value;

    //array containing the corresponding numbers
    let messageWithNumbers = [];

    //loops throught the string and converts the letters to numbers with the codePointAt method
    for (let i = 0; i < stringMessage.length; i++) {
        messageWithNumbers.push(stringMessage.codePointAt(i));
    }

    return messageWithNumbers;
}


/* Function that generates a randomNumber between 1 and 9 */
function generate_number() {
    return randomNumber = Math.floor(Math.random() * (9)) + 1;
}


/* function that generates a key matrix based on the size of the user's message */
function generate_key() {

    let keyMatrix = [];

    /* the thing here is that I need to create a key matrix with n^2 elements
    where n is the lenght of my message */
    for (let i = 0; i < messageContainer.value.length; i++) {
        let columns = [];
        for (let j = 0; j < messageContainer.value.length; j++) {
            columns.push(generate_number());    //create a column array on each iteration
        }
        keyMatrix.push(columns);                //pushes the entire columns array into key matrix 
    }

    return keyMatrix;
}


/* ------------------------- EXECUTION FUNCTION ------------------------- */

/* Function that will be executed when the user enters a message and presses the encrypt button */
function executionGo() {
    const modalbody = document.getElementById("responseToUser");

    convert_char_to_number();
    generate_key();


    modalbody.innerHTML = `Your numeric message is:\n <p>${convert_char_to_number()}</p>`;
    modalbody.innerHTML += `\nThe key is:\n <p>${generate_key()}</p>`;

}


const encryptButton = document.getElementById("encrypt-button");
encryptButton.addEventListener("click", executionGo);