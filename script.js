const addBtn = document.getElementById('add-btn')
const userInputField = document.getElementById('user-input-field')
const shoppingListEl = document.getElementById('shopping-list-el')


addBtn.addEventListener('click', renderShoppingList)

function renderShoppingList(){
  let item = userInputField.value
  const listItemEl = document.createElement('li')
  listItemEl.textContent = item
  shoppingListEl.append(listItemEl)

}