"use strict"; 
// Enforces strict mode to catch common coding errors and unsafe actions (like using undeclared variables)

3 + 3; 
// Simple arithmetic operation (adds 3 and 3), but result isn’t stored or displayed

3 / 0; 
// Division by zero — returns Infinity in JavaScript (no error, but not meaningful)

console.log("Hello Universe!"); 
// Prints the text "Hello Universe!" to the console

let name = "Jada Mathele"; 
// Declares a variable 'name' and assigns it the string value "Jada Mathele"

console.log(name); 
// Logs the value of 'name' ("Jada Mathele") to the console

class Goat {
    // Defines a class named 'Goat'
    
    eat(foodType) {
        // Defines a method 'eat' that takes one parameter (foodType)
        console.log(`I love eating ${foodType}`);
        // Logs a message showing what the goat likes to eat
    }
}

let billy = new Goat(); 
// Creates a new instance of the 'Goat' class named 'billy'

billy.eat("tin cans"); 
// Calls the 'eat' method on the 'billy' object with "tin cans" as the argument
// Expected output: "I love eating tin cans"
