// import firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js"

// initialize firebase app with database URL
const appSettings = {
    databaseURL : "https://playground-5fd52-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// get the elements from the HTML document by their id
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEL = document.getElementById("shopping-list")

// add an event listener to the add button
addButtonEl.addEventListener("click", function(){
    // get the input value
    let inputValue = inputFieldEl.value
    // check if the input value is empty
    if (inputValue.trim().length === 0) {
        // do nothing or show an error message
    } else {
    // push the input value to the database
        push(shoppingListInDB, inputValue)
    }
    // clear the input field
    clearInputFieldEl()
})

// listen for changes in the database
onValue(shoppingListInDB, function(snapshot) {

    // check if the snapshot exists
    if (snapshot.exists()) {
        // convert the snapshot to an array of key-value pairs
        let itemsArray = Object.entries(snapshot.val())
        // clear the shopping list element
        clearShoppingListEl()
        // loop through the items array
        for (let i = 0; i < itemsArray.length; i++) {
            // get the current item and its id and value
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            // append the current item to the shopping list element
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        // if the snapshot does not exist, display a message
        shoppingListEL.innerHTML = "Nothing here"
    }
})

// define a function to clear the shopping list element
function clearShoppingListEl() {
    shoppingListEL.innerHTML = ""
}

// define a function to clear the input field element
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

// define a function to append an item to the shopping list element
function appendItemToShoppingListEl(item) {
    // get the item id and value
    let itemID = item[0]
    let itemValue = item[1]
    // create a new list element
    let newEl = document.createElement("li")
    // set the text content of the new element to the item value
    newEl.textContent = itemValue

    // add an event listener to the new element
    newEl.addEventListener("click", function() {
        // get the reference to the item location in the database
        let itemLocation = ref(database, `shoppingList/${itemID}`)
        // log a message to the console
        console.log(`${itemValue} has been removed from the database`)
        // remove the item from the database
        remove(itemLocation)
    })
    // append the new element to the shopping list element
    shoppingListEL.append(newEl)
}