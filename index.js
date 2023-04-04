

////// WALLETS /////

let wallets = JSON.parse(localStorage.getItem('wallets')) || [];

// Select the wallets container and the wallet form
const walletsContainer = document.querySelector('#wallets-container');
const walletForm = document.querySelector('#wallet-form');

// Function to generate HTML for a single wallet
function generateWalletHTML(wallet) {
  return `
    <section class="wallet-types">
      <div class="left-panel">
        <img src="${wallet.walletPhoto}" alt="portofel" width="40px" height="40px">
      </div>
      <div class="right-panel">
        <p class="title">${wallet.walletType}</p>
        <p class="subtitle">${parseInt(wallet.walletTotalIncomes) - parseInt(wallet.walletTotalExpenses)} RON</p>
      </div>
    </section>
  `;
}

// Function to generate HTML for all wallets
function generateAllWalletsHTML() {
  let walletsHTML = '';
  wallets.forEach(wallet => {
    walletsHTML += generateWalletHTML(wallet);
  });
  walletsContainer.innerHTML = walletsHTML;
}

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const walletType = document.querySelector('#wallet-type').value;
  const walletAmount = document.querySelector('#wallet-amount').value;
  const walletPhoto = document.querySelector('input[name="photo"]:checked').value;
  const walletTotalIncomes = walletAmount;
  const walletTotalExpenses = "0";
  //console.log(walletPhoto);
  const newWallet = { walletType, walletAmount, walletPhoto, walletTotalIncomes, walletTotalExpenses};
  wallets.push(newWallet);
  localStorage.setItem('wallets', JSON.stringify(wallets));
  generateAllWalletsHTML();
  closeModal(e);
}

// Add event listener to the wallet form
walletForm.addEventListener('submit', handleFormSubmit);

// Function to open the modal
function openModal() {
  document.querySelector('#my-modal').style.display = 'block';
}

// Function to close the modal
function closeModal(event) {
  event.preventDefault()
  document.querySelector('#my-modal').style.display = 'none';
}

// Add event listener to the add wallet button to open the modal
document.querySelector('#open-modal').addEventListener('click', openModal);

// Add event listener to the close button to close the modal
document.querySelector('.close').addEventListener('click', closeModal);

// Generate HTML for all wallets on page load
generateAllWalletsHTML();



////// EXPENSE BUTTONS //////////

const buttons = document.querySelectorAll(".buttons");

buttons.forEach(button => {
  const textForEdit = document.createElement('div');
  textForEdit.textContent = "In edit mode";
  textForEdit.style.color = "green";
  textForEdit.style.visibility = "hidden";
  button.appendChild(textForEdit);

  let inEditMode = false;
  let inDeleteMode = false;
  
  const editButton = button.querySelector('.edit');
  const deleteButton = button.querySelector('.delete');
  
  editButton.addEventListener('click', () => {
    inDeleteMode = false;
    inEditMode = !inEditMode;
    if(inEditMode) {
      textForEdit.textContent = "In edit mode";
      textForEdit.style.color = "green";
    }
    textForEdit.style.visibility = inEditMode ? "visible" : "hidden";
  });
  
  deleteButton.addEventListener('click', () => {
    inEditMode = false;
    inDeleteMode = !inDeleteMode;
    if(inDeleteMode) {
      textForEdit.textContent = "In delete mode";
      textForEdit.style.color = "red";
    }
    textForEdit.style.visibility = inDeleteMode ? "visible" : "hidden";
  });
});


/// CATEGORY ////

let categories = JSON.parse(localStorage.getItem('categories')) || [];

const categoryContainer = document.querySelector('#categories-container');
const categoryForm = document.querySelector('#category-form');


function generateCategoryHTML(categories) {
  return `
    <section class="wallet-types">
      <div class="left-panel">
        <img src="${categories.categoryPhoto}" alt="portofel" width="40px" height="40px">
      </div>
      <div class="right-panel">
        <p class="title">${categories.categoryType}</p>
        <p class="subtitle">${categories.categoryAmount} RON</p>
      </div>
    </section>
  `;
}

function openCategoryModal() {
  document.querySelector('#category-modal').style.display = 'block';
}
document.querySelector('#open-categoryModal').addEventListener('click', openCategoryModal);

function closeCategoryModal(event) {
  event.preventDefault()
  document.querySelector('#category-modal').style.display = 'none';
}

function generateAllCategoriesHTML() {
  let categoriesHTML = '';
  categories.forEach(category => {
    categoriesHTML += generateCategoryHTML(category);
  });
  categoryContainer.innerHTML = categoriesHTML;
}

function handleCategoryFormSubmit(e) {
  e.preventDefault();
  const categoryType = document.querySelector('#category-type').value;
  const categoryAmount = document.querySelector('#category-amount').value;
  const categoryPhoto = document.querySelector('input[name="photo-category"]:checked').value;
  const newCategory = { categoryType, categoryAmount, categoryPhoto};
  categories.push(newCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  generateAllCategoriesHTML();
  closeCategoryModal(e);
}


categoryForm.addEventListener('submit', handleCategoryFormSubmit);
document.querySelector('.closeCategoryModal').addEventListener('click', closeCategoryModal);

generateAllCategoriesHTML();


 ///////// EXPENSE ////////////
 let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
 const expenseForm = document.querySelector('#expense-form');
 const expenseContainer = document.querySelector('#expense-container');

 function openExpenseModal() {
  updateCategoryDropdown();
  document.querySelector('#expense-modal').style.display = 'block';
}


function generateExpenseHTML(expense) {
  return `
  <div class="expense">
  <div class="profit line-expense">
    <section class="income">
      <div class="left-panel">
        <img src="${categories[expense.categoryIndex].categoryPhoto}" alt="portofel" width="40px" height="40px">
      </div>
      <div class="right-panel" style="border-right: 3px solid black; padding-right: 15px;">
        <p class="title">${expense.expenseName}</p>
        <p class="subtitle">${expense.expenseDate}</p>
      </div>
      <div class="left-panel">
      <img src="${wallets[expense.walletIndex].walletPhoto}" alt="portofel" width="40px" height="40px">
    </div>
    <div class="right-panel">
      <p class="title">${wallets[expense.walletIndex].walletType}</p>
    </div>
    </section>
    <section class="income">
      <p class="title red">- ${expense.expenseAmount} RON</p>
      <div class="buttons">
        <button class="btn edit"><img src="assets/edit.png" alt="Edit"></button>
        <button class="btn delete"><img src="assets/Delete.png" alt="Edit"></button>
      </div>
    </section>
  </div> 
</div>
  `;
}

document.querySelector('#open-expenseModal').addEventListener('click', openExpenseModal);

 function closeExpenseModal(event) {
  event.preventDefault()
  document.querySelector('#expense-modal').style.display = 'none';
}

function generateAllExpensesHTML() {
  let expenseHTML = '';
  expenses.forEach(expense => {
    expenseHTML += generateExpenseHTML(expense);
  });
  expenseContainer.innerHTML = expenseHTML;
}

function handleExpenseFormSubmit(e) {
  e.preventDefault();
  const expenseName = document.querySelector('#expense-name').value;
  const expenseDate = document.querySelector('#expense-date').value;
  const expenseAmount = document.querySelector('#expense-amount').value;
  const categoryIndex = document.querySelector('#category-value').value;
  const walletIndex = currentWalletIndex;
  const newExpense = { expenseName, expenseDate, expenseAmount, categoryIndex, walletIndex };

  categories[categoryIndex].categoryAmount = parseInt(categories[categoryIndex].categoryAmount) + parseInt(expenseAmount);
  wallets[currentWalletIndex].walletTotalExpenses = parseInt(wallets[currentWalletIndex].walletTotalExpenses) + parseInt(expenseAmount);
  localStorage.setItem('wallets', JSON.stringify(wallets));
  localStorage.setItem('categories', JSON.stringify(categories));
  generateAllWalletsHTML();
  generateAllCategoriesHTML();
  console.log(currentWalletIndex);
  generateCurrentWallet(currentWalletIndex);
  expenses.unshift(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  generateAllExpensesHTML();
  closeExpenseModal(e);
}


 expenseForm.addEventListener('submit', handleExpenseFormSubmit);
 document.querySelector('.closeExpenseModal').addEventListener('click', closeExpenseModal);

 function updateCategoryDropdown() {
  const categoryDropdown = document.querySelector('#category-value');
  categoryDropdown.innerHTML = `<option value="">--Select--</option>`;
  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += `<option value="${i}">${categories[i].categoryType}</option>`;
  }
}

updateCategoryDropdown();
generateAllExpensesHTML();



///// CURRENT WALLET //////

let currentWalletIndex = 0;
const currentWalletContainer = document.querySelector('#current-wallet-container');

let walletsSelected = document.querySelectorAll(".wallet-types");

walletsSelected.forEach((wallet, index) => {
  
  wallet.addEventListener('click', (event) => {
    const walletNameSelected = event.target.querySelector(".title").textContent;
    if(walletNameSelected) {
      currentWalletIndex = index;
      generateCurrentWallet(index);
      
    }
  })
});

function generateCurrentWallet(index) {
  let currentWalletHTML = '';
  currentWalletHTML += `<section class="current-wallet">
  <div class="left-panel">
    <img src="${wallets[index].walletPhoto}" alt="portofel" width="40px" height="40px">
  </div>
  <div class="right-text">
    <p>${wallets[index].walletType}</p>
  </div>
</section>
<section class="balance">
                <div class="profit">
                  <section class="income ident">
                    <div class="left-panel">
                      <img src="assets/Profit.png" alt="portofel" width="40px" height="40px">
                    </div>
                    <div class="right-panel">
                      <p class="subtitle">Total Incomes</p>
                      <p class="title">${wallets[index].walletTotalIncomes} RON</p>
                    </div>
                  </section>
                </div>
                <div class="profit">
                  <section class="income ident">
                    <div class="left-panel">
                      <img src="assets/Loss.png" alt="portofel" width="40px" height="40px">
                    </div>
                    <div class="right-panel">
                      <p class="subtitle">Total Expenses</p>
                      <p class="title">${wallets[index].walletTotalExpenses} RON</p>
                    </div>
                  </section>
                </div>
              </section>`;
currentWalletContainer.innerHTML = currentWalletHTML;
}

generateCurrentWallet(0);
