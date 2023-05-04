import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//url of database
const appSettings = {
  databaseURL: "https://anny-y-paul-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
//second argument of ref is name of where we want to put the data
const shoppingItemsInDB = ref(database, "shoppingList")


const addBtn = document.getElementById('add-btn')
const userInputField = document.getElementById('user-input-field')
const shoppingListEl = document.getElementById('shopping-list-el')

addBtn.addEventListener('click', renderShoppingList)

function renderShoppingList(){
  const item = capeltilizeFirstChar(userInputField.value) 
  clearInputField()
  //fireBase method takes the reference and the item we want to add
  push(shoppingItemsInDB, item)
}

function capeltilizeFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

function clearInputField() {
  userInputField.value = ""
}

// when there's a change in de databse
onValue(shoppingItemsInDB, function(snapshot) {
  //check if there's any entries in databse
  if (snapshot.exists()) {
    //snapshot.val returns an object.
    //Object.values returns the values of object in an array
    let shoppingListArray = Object.entries(snapshot.val()) 
  
    clearShoppingList()

    shoppingListArray.forEach(function(shoppingItem) {
      renderShoppingItem(shoppingItem)
    })
  } else {
    shoppingListEl.innerHTML = "No items here... yet"
  }
  
  
})

function clearShoppingList() {
  shoppingListEl.innerHTML = ""
}

function renderShoppingItem(shoppingItem) {
  const shoppingItemID = shoppingItem[0]
  const shoppingItemValue = shoppingItem[1]

  const listItemEl = document.createElement('li')

  listItemEl.textContent = shoppingItemValue

  //add event to remove item from databse
  listItemEl.addEventListener('dblclick', function() {
    // ref needs the database and the item url or exact location
      let exactLocationOfItemInDB = ref(database, `shoppingList/${shoppingItemID}`)
      remove(exactLocationOfItemInDB)
  })
  


  shoppingListEl.append(listItemEl)
}
