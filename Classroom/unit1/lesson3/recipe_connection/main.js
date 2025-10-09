"use strict";
// Enables strict mode — helps prevent common coding mistakes 
// (like using undeclared variables or reserved words)

const cities = require("cities");
// Imports the 'cities' Node.js module, which allows you to look up 
// city information (like city name, state, latitude, longitude, etc.) 
// based on a ZIP/postal code

var myCity = cities.zip_lookup("10016");
// Uses the 'zip_lookup' method from the 'cities' module to find information 
// about the ZIP code "10016" (which corresponds to New York City)

console.log(myCity);
// Prints the city information object to the console
// Example output might look like:
// { zip: '10016', city: 'New York', state: 'NY', latitude: 40.7448, longitude: -73.9789 }
