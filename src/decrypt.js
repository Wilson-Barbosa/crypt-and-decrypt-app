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

  //this is to remove an extra row, so the code wont bug out
  keyMatrix.pop();
  
  return keyMatrix;
}

//function that generates the inverse of the key
function generate_inverse_key(matrix) {
  const n = matrix.length;

  // Create an identity matrix of the same size
  const identityMatrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  // Augment the original matrix with the identity matrix
  const augmentedMatrix = matrix.map((row, i) => row.concat(identityMatrix[i]));

  // Apply row operations to transform the left half into the identity matrix
  for (let i = 0; i < n; i++) {
    // Make the diagonal element 1
    const pivot = augmentedMatrix[i][i];
    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[i][j] /= pivot;
    }

    // Make other elements in the column 0
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmentedMatrix[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
        }
      }
    }
  }

  // Extract the right half of the augmented matrix as the inverse matrix
  const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));

  return inverseMatrix;
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


/* ------------------------------------ Decrypt message ------------------------------------- */

//function that multiplies the matrices to generate a new one
function message_times_key(messageXkey, inversekey) {
  //the result of this function will be stored here
  let message = [];

  /* The loop below mutiplies the messageXkey by the inverseKey and returns the result as a new matrix called message */
  for (let i = 0; i < 11; i++) {
    let result = 0;

    for (let j = 0; j < 11; j++) {
      result += messageXkey[j] * inversekey[j][i];
    }
    message.push(result); //each internal iteration calculates one element of the final array
  }

  return message; //the message that will be display to the user as a response
}


/* ------------------------------------ Execute ------------------------------------- */

//function that exectutes when the user presses the button
function show_cpf() {
  const messageXkey = reconstruct_message_times_key();
  const inverseKey = generate_inverse_key(reconstruct_key());

  const messageDecrypted = message_times_key(messageXkey, inverseKey);
  
  //rouding the numbers
  for(let i=0; i < messageDecrypted.length; i++){
    messageDecrypted[i] = Math.round(messageDecrypted[i]);
  }

 //using the unicode method to return the CPF:
  let message = []
  for(let j=0; j < messageDecrypted.length; j++){
    message[j] = String.fromCharCode(messageDecrypted[j]);
  }
  
  //updates the value on the screen
  document.getElementById("cpfOutput").value = message.join('');

  //displays the cpf for the user
  document.getElementById("modalCpf").style.display = "block";
}

//closes the modal
function close_code_modal() {
  document.getElementById("modalCpf").style.display = "none";
}
