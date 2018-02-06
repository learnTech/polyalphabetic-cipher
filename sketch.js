let inputMessage, outputMessage;
let keywordArray = []; //secretKey from user 
let keywordNumbersArray = []; // store the alphabetic numbers 
let messageArray = []; //message from user 
let messageNumbersArray = []; //numerical position of letters  
let outputArray = []; //stores encrypted or decrypted message 
let alphabetArray = []; // hold the alphabet
let inputKeyword = []; //hold the keyword
let encodeButton, decodeButton; //buttons for user to decide which option


function setup() {
    setupInterface(); // sets up the user interface
    alphabetArray = Array.from("abcdefghijklmnopqrstuvwxyz "); // array that holds the alphabet, the 26th character is a space
    encodeButton.mousePressed(encode); //event listener that calls encode function when the encode button is pressed
    decodeButton.mousePressed(decode); //event listener that calls decode function when the decode button is pressed
}


function setupInterface() {
    //this function deals with the setup of user interface. Positioning and sizing all input and output text boxes and buttons.
    noCanvas(); // no need for a canvas as we are not animating
    inputMessage = createElement('textarea');
    inputMessage.elt.placeholder = 'enter your secret message here with letters and spaces only'; // adds the placeholder to the html element
    inputMessage.size(500, 200);
    inputMessage.position(20, 65);
    inputKeyword = createElement('textarea');
    inputKeyword.elt.placeholder = 'enter your secret keyword here';
    inputKeyword.size(250, 20);
    inputKeyword.position(600, 65);
    encodeButton = createButton('encode');
    decodeButton = createButton('decode');
    encodeButton.position(inputMessage.x + inputMessage.width, 65);
    decodeButton.position(inputMessage.x + inputMessage.width, 100);
    outputMessage = createP('output'); //outputs message to a html paragraph
}


function encode() {
    /* this function is called when the user presses the encode button. It places the input message and keyword into arrays and
    calls the convert2numbers function to assign numbers for each letter in the arrays. Then the encrypt function is called to 
    perform the polyalphabet shift on each letter and then ouputs an encrypted message on the webpage*/

    messageArray = Array.from(inputMessage.value()); //put input message into a character array
    messageNumbersArray = convert2numbers(messageArray); //convert message to numbers 
    keywordArray = Array.from(inputKeyword.value()); //put keyword into a character array
    keywordNumbersArray = convert2numbers(keywordArray); //convert keyword to numbers 
    outputArray = encrypt();
    outputMessage.html(outputArray.join('')); //makes the array elements join and output to paragraph element
}


function decode() {
    /* this function is called when the user presses the decode button. It places the input message and keyword into arrays and
    calls the convert2numbers function to assign numbers for each letter in the arrays. Then the encrypt function is called to 
    perform the polyalphabet shift on each letter and then ouputs an decrypted message on the webpage*/

    messageArray = Array.from(inputMessage.value()); //put input message into a character array
    messageNumbersArray = convert2numbers(messageArray); //convert message to numbers 
    keywordArray = Array.from(inputKeyword.value()); //put keyword into a character array
    keywordNumbersArray = convert2numbers(keywordArray); //convert keyword to numbers 
    outputArray = decrypt();
    outputMessage.html(outputArray.join('')); //outputs the decrypted message into a html paragraph
}


function convert2numbers(parameterArray) {
    /* this function is called to convert an array with letters into numbers that correspond to the    
    Numerical order the letter appears in the alphabet.It uses parallel arrays to achieve this.You
    could use multidimensional array if you wanted to */

    let parameterNumbersArray = [];
    for (let index = 0; index < parameterArray.length; index++) { //search letters in incoming array 
        for (let index2 = 0; index2 < alphabetArray.length; index2++) { //search alphabet array 
            if (parameterArray[index] == alphabetArray[index2]) { //if letters match then 
                parameterNumbersArray[index] = index2; //store alphabet position value  
                index2 = alphabetArray.length; //to break from loop  
            }
        }
    }
    return parameterNumbersArray;
}


function encrypt() {
    //this function will add the two numbers from the message array and the keyword numbers array and output the corresponding letter in the alphabet for that sum into an encrypted array// 
    let shiftNumber = 0
    let index2 = 0;
    outputArray = [];
    for (let index = 0; index < messageNumbersArray.length; index++) { //loop each number in message 
        index2 = index % keywordNumbersArray.length //points at the keyword numbers 
        // this next line determines the new position by adding the keyword value and message value together and finds the new alphabet number 
        shiftNumber = (messageNumbersArray[index] + keywordNumbersArray[index2]) % 27
        outputArray[index] = alphabetArray[shiftNumber] //stores new letter in the encrypted array 
    }
    return outputArray;
}


function decrypt() {
    //this function will add the two numbers from the message array and the keyword numbers array and output the corresponding letter in the alphabet for that sum into an encrypted array// 
    let shiftNumber = 0
    let index2 = 0;
    outputArray = [];
    for (let index = 0; index < messageNumbersArray.length; index++) { //loop each number in message 
        index2 = index % keywordNumbersArray.length //points at the keyword numbers 
        // the next lines subtract the keyword value and message value from each other and finds the new alphabet number 
        //if the difference is negative the modulo 27 is added to the negative number to find the correct position in the alphabet array
        if ((messageNumbersArray[index] - keywordNumbersArray[index2]) > 0) {
            shiftNumber = (messageNumbersArray[index] - keywordNumbersArray[index2]) % 27
        } else {
            shiftNumber = (messageNumbersArray[index] - keywordNumbersArray[index2] + 27) % 27
        }
        outputArray[index] = alphabetArray[shiftNumber] //stores new letter in the encrypted array 
    }
    return outputArray;
}