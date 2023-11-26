import { matrix, inv } from 'mathjs'

//grabbing the code's element (textarea)
const codeBox = document.getElementById("code");




/* -------------------------------------- Recreate Key -------------------------------------- */

//function that creates key from the code provided by the user
function reconstruct_key() {

    //getting the value from the input
    const codeString = codeBox.value;

    let keyMatrix = [];

    //using the slice method I can get the key back from the code.
    for (let i = 0; i <= 121; i += 11) {

        //first I slice the string by 11 elements
        //them I group the individual slices into a single array
        //them I push the array to keyMatrix
        keyMatrix.push(Array.from(codeString.slice(i, i + 11)));
    }

    return keyMatrix;
}

//function finds the invertible key matrix
function generate_inverse_key(matrix) {
    math.inv(matrix);
}


/* ------------------------------------ Recreate Message ------------------------------------- */

//function that creates the message from the code provided by the user
function reconstruct_message_times_key() {

    //getting the value from the input
    const codeString = codeBox.value;

    let messageXkey = [];

    //this gets the numbers by slicing the code and stores them in a message matrix
    for (let i = 121; i < 165; i += 4) {
        messageXkey.push(codeString.slice(i, i + 4));
    }
    return messageXkey;
}



function message_times_key(messageXkey, inversekey) {


    //the result of this function will be stored here
    let message = [];

    /* The loop below mutiplies the messageXkey by the inverseKey and returns the result as a new matrix called message */
    for (let i = 0; i < 11; i++) {

        let result = 0;

        for (let j = 0; j < 11; j++) {
            result += messageXkey[j] * inversekey[j][i];
        }
        message.push(result);  //each internal iteration calculates one element of the final array
    }

    return message;            //the message that will be display to the user as a response
}

/* ------------------------------------ Decrypt message ------------------------------------- */


function show_cpf() {

    const messageXkey = reconstruct_message_times_key();
    const inverseKey = generate_inverse_key(reconstruct_key());

    const messageDecrypted = message_times_key(messageXkey, inverseKey);



    console.log(messageDecrypted);


    //updates the value on the screen
    document.getElementById("cpfOutput").innerText = messageDecrypted;

    //displays the cpf for the user
    document.getElementById("modalCpf").style.display = 'block';
}

//closes the model
function close_code_modal() {
    document.getElementById("modalCpf").style.display = 'none';
}




console.log(sqrt(-4).toString()) // 2i
