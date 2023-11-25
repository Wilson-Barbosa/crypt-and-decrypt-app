//grabbing the code's element (textarea)
const codeBox = document.getElementById("code");

function determinant(matrix){
    return det(matrix);
}



/* -------------------------------------- Recreate Key -------------------------------------- */

//function that creates key from the code provided by the user
function reconstruct_key(){

    //getting the value from the input
    const codeString = codeBox.value;

    let keyMatrix = [];
    
    //using the slice method I can get the key back from the code.
    for(let i = 0; i <= 121; i+=11){
        
        //first I slice the string by 11 elements
        //them I group the individual slices into a single array
        //them I push the array to keyMatrix
        keyMatrix.push(Array.from(codeString.slice(i, i+11)));
    }
    
    return keyMatrix;
}

//function findes the invertible key matrix
function invertibleKey(matrix){
    return inv(matrix);
}


/* ------------------------------------ Recreate Message ------------------------------------- */

//function that creates the message from the code provided by the user
function reconstruct_message_times_key(){

    //getting the value from the input
    const codeString = codeBox.value;

    let messageMatrix = [];

    //this gets the numbers by slicing the code and stores them in a message matrix
    for(let i = 121; i < 165; i+=4){
        messageMatrix.push(codeString.slice(i, i+4));
    }
    return messageXkey;
}


/* ------------------------------------ recover message ------------------------------------- */

function show_cpf(){
    const messageXkey = reconstruct_message_times_key();
    const invertible = invertibleKey(matrix)
}

function close_code_modal(){
    document.getElementById("modalCode").style.display = 'none';
}