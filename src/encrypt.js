//since i'll be using this variable a couple of times throught my code i made it global
const cpfInput = document.getElementById("cpf");



/* -------------------------------- ENCRYPTING THE MESSAGE ---------------------------------- */


//function that converts each character on the string to a corresponding number
function convert_char_to_number() {

    //user message string
    let stringMessage = cpfInput.value;

    //array containing the corresponding numbers
    let messageAsNumbers = [];

    //loops throught the string and converts the letters to numbers with the codePointAt method
    for (let i = 0; i < stringMessage.length; i++) {
        messageAsNumbers.push(stringMessage.codePointAt(i));
    }

    return messageAsNumbers;
}




/* ----------------------------------- GENERATE KEY ----------------------------------- */


/* Function that generates a randomNumber between 1 and 9 */
function generate_number() {
    return randomNumber = Math.floor(Math.random() * (9)) + 1;
}


/* function that generates a key matrix based on the size of the user's message */
function generate_key() {

    let keyMatrix = [];

    for (let i = 0; i < cpfInput.value.length; i++) {

        //after each iteration the row array is cleared and filled again
        let row = [];

        for (let j = 0; j < cpfInput.value.length; j++) {
            row.push(generate_number());    //create a row array on each iteration
        }
        keyMatrix.push(row);                //pushes the entire row array into key matrix, after that i clear the row for the next iteration
    }

    return keyMatrix;
}




/* -------------------------------- PRODUCT OF MASSAGE x KEY -------------------------------- */

//here I need to multiply messageAsNumbers X keyMatrix
function message_times_key(message, key) {

    //this gives me the size of my message, so that i can use to loop throught my arrays and calculate the product of the message vs key
    const size = cpfInput.value.length;

    //the result of this function will be stored here
    let finalMatrix = [];

    /* The loop below mutiplies the message by the key and returns the result as a new matrix called finalMatrix */
    for (let i = 0; i < size; i++) {

        let result = 0;

        for (let j = 0; j < size; j++) {
            result += message[j] * key[j][i];
        }
        finalMatrix.push(result);  //each internal iteration calculates one element of the final array
    }

    return finalMatrix;            //the message that will be display to the user as a response
}




/* -------------------------------------- ERROR MESSAGE -------------------------------------- */

//function that adds an error based on the type of parameter it receives
function add_error_message(error) {

    //grabbing the element 
    const form = document.querySelector("form");

    //creating a small tag and appeding some attributes to it 
    let errorMessage = document.createElement("small");
    errorMessage.id = "error";
    errorMessage.innerText = error;
    errorMessage.style.color = "red";

    //adding the error message just bellow the cep input
    form.insertBefore(errorMessage, cpfInput.nextSibling);
}




/* --------------------------------------- REMOVE ERROR --------------------------------------- */

function remove_error_message() {

    /* this searches the document and if it finds any small tags the code below is executed */
    /* querySelectorAll returns a nodelist, so if a nodelist exists all small tags are removed */
    if (document.querySelectorAll("small").length != 0) {
        const form = document.querySelector("form");
        const error = document.getElementById("error");
        form.removeChild(error);
    }

}




/* ----------------------------------------- ENCRYPT ----------------------------------------- */

//function that actually encrypts the message
function encrypt(){

    const message = convert_char_to_number();                   //message converted to numbers
    const key = generate_key();                                 //key matrix
    const matrixProduct = message_times_key(message, key);    //product between the two matrices above

    //transforms the product into a string
    const matrixProductString = matrixProduct.join('');
    
    //transforms the key into a string
    let keyString = '';
    for(let i = 0; i < key.length; i++){
        keyString += key[i].join('');
    }

    //concatenates both strings into a single message
    const output = keyString + matrixProductString;

    document.getElementById("code").innerText = output;

}



/* ----------------------------------------- Execution ----------------------------------------- */

/* Function that will be executed when the user enters a message and presses the encrypt button */
function show_code() {

    //this line is needed to clear the ouputBox content before a new execution
    document.getElementById("code").innerText = '';

    //in this line I ALWAYS remove all small (if any) element in the code (ALWAYS)
    remove_error_message();

    //sends the appropriate output
    if (cpfInput.value.length == 0) {

        //treats an error for an empty input
        add_error_message("Input is Empty");
        return;
    } else if (cpfInput.value.length < 10) {

        //treats an error for an input smaller than 11 characters
        add_error_message("Must contain exactly 11 characters");
        return;
    } else {

        //sends the right response to the user
        encrypt();
    }

}