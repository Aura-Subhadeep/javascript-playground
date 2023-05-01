let input = document.getElementById('input-box');

// Get all the button elements and store them in a NodeList
let buttons = document.querySelectorAll('button');

// Initialize an empty string to store the input string
let string = "";

// Convert the NodeList to an array
let arr = Array.from(buttons);

// Loop through each button element in the array
arr.forEach(button => {
    // Add an event listener to each button for the "click" event
    button.addEventListener('click', (e) => {
        // If the button's inner HTML is "=", evaluate the input string
        if (e.target.innerHTML == '=') {
            string = eval(string);
            // Update the input box value with the evaluated result
            input.value = string;
        } 
        // If the button's inner HTML is "AC", clear the input string
        else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        } 
        // If the button's inner HTML is "DEL", remove the last character from the input string
        else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } 
        // If the button is any other character, append it to the input string
        else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});
