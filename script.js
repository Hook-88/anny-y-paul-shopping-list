const addBtn = document.getElementById('add-btn')
const userInputField = document.getElementById('user-input-field')
const shoppingListEl = document.getElementById('shopping-list-el')


addBtn.addEventListener('click', renderShoppingList)

function renderShoppingList(){
  let item = capeltilizeFirstChar(userInputField.value) 
  console.log(item)
  clearInputField()
  renderShoppingItem(item)
  
}

function clearInputField() {
  userInputField.value = ""
}

function renderShoppingItem(shoppingItem) {
  const listItemEl = document.createElement('li')
  listItemEl.textContent = shoppingItem
  shoppingListEl.append(listItemEl)
}

function capeltilizeFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

