"use strict";  
// Enables strict mode — helps catch common coding mistakes and unsafe actions 
// (like using undeclared variables)

let messages = [
    "A change of environment can be a good thing!",
    "You will make it!",
    "Just run with the code!"
];  
// Creates an array called 'messages' that stores three motivational strings

messages.forEach(message => console.log(message));  
// Uses the forEach() method to loop through each item in the 'messages' array
// For each 'message', it prints the message to the console
// Output:
// A change of environment can be a good thing!
// You will make it!
// Just run with the code!
