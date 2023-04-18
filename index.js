

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
  const newWallet = { walletType, walletAmount, walletPhoto, walletTotalIncomes, walletTotalExpenses};
  wallets.push(newWallet);
  localStorage.setItem('wallets', JSON.stringify(wallets));
  generateAllWalletsHTML();
  addWalletEvent();
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



function addButtonsFunc() {
  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach(button => {
    
    let inEditMode = false;
    let inDeleteMode = false;
    
    const editButton = button.querySelector('.edit');
    const deleteButton = button.querySelector('.delete');
    
    editButton.addEventListener('click', () => {
      const expenseElement = event.target.parentNode.parentNode.parentNode.parentNode;
      const name = expenseElement.querySelector(".title");
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].expenseName === name.textContent) {
          openEditExpenseModal(i);
          break; // exit loop once the expense is deleted
        }
      }
      inDeleteMode = false;
      inEditMode = !inEditMode;
      if(inEditMode) {
       
      }
    });
    
    deleteButton.addEventListener('click', () => {
      const expenseElement = event.target.parentNode.parentNode.parentNode.parentNode;
      const name = expenseElement.querySelector(".title");
      console.log(name.textContent);
      // assuming `name` variable holds the name of the expense to be deleted
for (let i = 0; i < expenses.length; i++) {
  if (expenses[i].expenseName === name.textContent) {
    expenses.splice(i, 1);
    break; // exit loop once the expense is deleted
  }
}
localStorage.setItem('expenses', JSON.stringify(expenses));
generateAllExpensesHTML();
addButtonsFunc();
      inEditMode = false;
      inDeleteMode = !inDeleteMode;
      if(inDeleteMode) {
        
      }
    });
  });
}



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
 const pendingContainer = document.querySelector('#pending-container');

 function openExpenseModal() {
  updateCategoryDropdown();
  document.querySelector('#expense-modal').style.display = 'block';
}


function generateExpenseHTML(expense) {
  if(expense.isIncome == 1) {
    return `
 <div class="expense">
 <div class="profit line-expense">
   <section class="income">
     <div class="left-panel">
       <img src="${categories[expense.categoryIndex].categoryPhoto}" alt="portofel" width="40px" height="40px">
     </div>
     <div class="right-panel" id="right-border">
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
     <p class="green title2">+ ${expense.expenseAmount} RON</p>
     <div class="buttons">
       <button class="btn edit"><img src="assets/edit.png" alt="Edit"></button>
       <button class="btn delete"><img src="assets/Delete.png" alt="Edit"></button>
     </div>
   </section>
 </div> 
</div>
 `;
  }
 return `
 <div class="expense">
 <div class="profit line-expense">
   <section class="income">
     <div class="left-panel">
       <img src="${categories[expense.categoryIndex].categoryPhoto}" alt="portofel" width="40px" height="40px">
     </div>
     <div class="right-panel" id="right-border">
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
     <p class="title2 red">- ${expense.expenseAmount} RON</p>
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

function isInFuture(yearThis, monthThis, dayThis, yearCurrent, monthCurrent, dayCurrent) {
  var thisDate = new Date(yearThis, monthThis - 1, dayThis);
  var currentDate = new Date(yearCurrent, monthCurrent - 1, dayCurrent);

  // Compare the two dates
  if (thisDate > currentDate) {
    return true;
  } else {
    return false;
  }
}

function generateAllExpensesHTML() {
  let expenseHTML = '';
  let pendingHTML = '';
  expenses.forEach(expense => {
    //console.log(expense.expenseDate);
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let formattedDate = year + '-' + month + '-' + day;
    let dateParts = formattedDate.split('-');
    let yearCurrent = parseInt(dateParts[0]);
    let monthCurrent = parseInt(dateParts[1]);
    let dayCurrent = parseInt(dateParts[2]);
    //console.log(formattedDate);
    console.log(yearCurrent, monthCurrent, dayCurrent);
    let thisExpenseDate = expense.expenseDate;
    let thisDateParts = thisExpenseDate.split('-');
    let yearThis = parseInt(thisDateParts[0]);
    let monthThis = parseInt(thisDateParts[1]);
    let dayThis = parseInt(thisDateParts[2]);
    console.log(yearThis, monthThis, dayThis);
    if(isInFuture(yearThis, monthThis, dayThis, yearCurrent, monthCurrent, dayCurrent)) {
      pendingHTML += generateExpenseHTML(expense);
    } else {
      expenseHTML += generateExpenseHTML(expense);
    }
    
  });
  expenseContainer.innerHTML = expenseHTML;
  pendingContainer.innerHTML = pendingHTML;
}

function handleExpenseFormSubmit(e) {
  e.preventDefault();
  const expenseName = document.querySelector('#expense-name').value;
  const expenseDate = document.querySelector('#expense-date').value;
  const expenseAmount = document.querySelector('#expense-amount').value;
  const categoryIndex = document.querySelector('#category-value').value;
  const walletIndex = currentWalletIndex;
  const isIncome = 0;
  const newExpense = { expenseName, expenseDate, expenseAmount, categoryIndex, walletIndex, isIncome };

  categories[categoryIndex].categoryAmount = parseInt(categories[categoryIndex].categoryAmount) + parseInt(expenseAmount);
  wallets[currentWalletIndex].walletTotalExpenses = parseInt(wallets[currentWalletIndex].walletTotalExpenses) + parseInt(expenseAmount);
  localStorage.setItem('wallets', JSON.stringify(wallets));
  localStorage.setItem('categories', JSON.stringify(categories));
  generateAllWalletsHTML();
  addWalletEvent();
  generateAllCategoriesHTML();
  console.log(currentWalletIndex);
  generateCurrentWallet(currentWalletIndex);
  expenses.unshift(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  generateAllExpensesHTML();
  addButtonsFunc();
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


///////// INCOMES ////////////

const incomeForm = document.querySelector('#income-form');


function openIncomeModal() {
 updateCategoryDropdown();
 document.querySelector('#income-modal').style.display = 'block';
}


function generateIncomeHTML(expense) {
  if(expense.isIncome == 1) {
    return `
 <div class="expense">
 <div class="profit line-expense">
   <section class="income">
     <div class="left-panel">
       <img src="${categories[expense.categoryIndex].categoryPhoto}" alt="portofel" width="40px" height="40px">
     </div>
     <div class="right-panel" id="right-border">
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
     <p class="green title2">- ${expense.expenseAmount} RON</p>
     <div class="buttons">
       <button class="btn edit"><img src="assets/edit.png" alt="Edit"></button>
       <button class="btn delete"><img src="assets/Delete.png" alt="Edit"></button>
     </div>
   </section>
 </div> 
</div>
 `;
  }
 return `
 <div class="expense">
 <div class="profit line-expense">
   <section class="income">
     <div class="left-panel">
       <img src="${categories[expense.categoryIndex].categoryPhoto}" alt="portofel" width="40px" height="40px">
     </div>
     <div class="right-panel" id="right-border">
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
     <p class="title2 red">- ${expense.expenseAmount} RON</p>
     <div class="buttons">
       <button class="btn edit"><img src="assets/edit.png" alt="Edit"></button>
       <button class="btn delete"><img src="assets/Delete.png" alt="Edit"></button>
     </div>
   </section>
 </div> 
</div>
 `;
 
}

document.querySelector('#open-incomeModal').addEventListener('click', openIncomeModal);

function closeIncomeModal(event) {
 event.preventDefault()
 document.querySelector('#income-modal').style.display = 'none';
}

function handleIncomeFormSubmit(e) {
 e.preventDefault();
 const expenseName = document.querySelector('#income-name').value;
 const expenseDate = document.querySelector('#income-date').value;
 const expenseAmount = document.querySelector('#income-amount').value;
 const categoryIndex = document.querySelector('#income-category-value').value;
 const walletIndex = currentWalletIndex;
 const isIncome = 1;
 const newExpense = { expenseName, expenseDate, expenseAmount, categoryIndex, walletIndex, isIncome };

 categories[categoryIndex].categoryAmount = parseInt(categories[categoryIndex].categoryAmount) + parseInt(expenseAmount);
 wallets[currentWalletIndex].walletTotalIncomes = parseInt(wallets[currentWalletIndex].walletTotalIncomes) + parseInt(expenseAmount);
 localStorage.setItem('wallets', JSON.stringify(wallets));
 localStorage.setItem('categories', JSON.stringify(categories));
 generateAllWalletsHTML();
 addWalletEvent();
 generateAllCategoriesHTML();
 console.log(currentWalletIndex);
 generateCurrentWallet(currentWalletIndex);
 expenses.unshift(newExpense);
 localStorage.setItem('expenses', JSON.stringify(expenses));
 generateAllExpensesHTML();
 addButtonsFunc();
 closeExpenseModal(e);
}


incomeForm.addEventListener('submit', handleIncomeFormSubmit);
document.querySelector('.closeIncomeModal').addEventListener('click', closeIncomeModal);

function updateIncomeCategoryDropdown() {
 const categoryDropdown = document.querySelector('#income-category-value');
 categoryDropdown.innerHTML = `<option value="">--Select--</option>`;
 for (let i = 0; i < categories.length; i++) {
   categoryDropdown.innerHTML += `<option value="${i}">${categories[i].categoryType}</option>`;
 }
}

updateIncomeCategoryDropdown();
generateAllExpensesHTML();



///// EDIT EXPENSES //////

let indexOf = 0;

const editExpenseForm = document.querySelector('#edit-expense-form');

function updateEditCategoryDropdown() {
  const categoryDropdown = document.querySelector('#edit-category-value');
  categoryDropdown.innerHTML = `<option value="">--Select--</option>`;
  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += `<option value="${i}">${categories[i].categoryType}</option>`;
  }
}

function openEditExpenseModal(index) {
  indexOf = index;
  
  updateEditCategoryDropdown();
  document.querySelector('#edit-expense-name').value = expenses[index].expenseName;
 document.querySelector('#edit-expense-date').value = expenses[index].expenseDate;
  document.querySelector('#edit-expense-amount').value = expenses[index].expenseAmount;
  document.querySelector('#edit-expense-modal').style.display = 'block';
}

function closeEditExpenseModal(event) {
  event.preventDefault()
  document.querySelector('#edit-expense-modal').style.display = 'none';
}
document.querySelector('.edit-closeExpenseModal').addEventListener('click', closeEditExpenseModal);

function handleEditExpenseFormSubmit(e) {
  e.preventDefault();
  const editExpenseName = document.querySelector('#edit-expense-name').value;
  const editExpenseDate = document.querySelector('#edit-expense-date').value;
  const editExpenseAmount = document.querySelector('#edit-expense-amount').value;
  const editEategoryIndex = document.querySelector('#edit-category-value').value;
  

   categories[expenses[indexOf].categoryIndex].categoryAmount
    = parseInt(categories[expenses[indexOf].categoryIndex].categoryAmount) - parseInt(expenses[indexOf].expenseAmount); /// Sterge suma din categoria in care a fost
    console.log(categories[expenses[indexOf].categoryIndex].categoryAmount);

    categories[editEategoryIndex].categoryAmount = parseInt(categories[editEategoryIndex].categoryAmount) + parseInt(editExpenseAmount);   //categories[expenses[indexOf].categoryIndex].categoryAmount = parseInt(categories[expenses[indexOf].categoryIndex].categoryAmount) + parseInt(editExpenseAmount);
  
   localStorage.setItem('categories', JSON.stringify(categories));
  
  expenses[indexOf].expenseName = editExpenseName;
  expenses[indexOf].expenseDate = editExpenseDate;
  expenses[indexOf].expenseAmount = editExpenseAmount;
  expenses[indexOf].categoryIndex = editEategoryIndex;
  localStorage.setItem('expenses', JSON.stringify(expenses));
  myFunction();
  generateAllExpensesHTML();
  generateAllCategoriesHTML();
  addButtonsFunc();
  closeEditExpenseModal(e);
}

editExpenseForm.addEventListener('submit', handleEditExpenseFormSubmit);


///// CURRENT WALLET //////

let currentWalletIndex = 0;
const currentWalletContainer = document.querySelector('#current-wallet-container');



function addWalletEvent() {
  let walletsSelected = document.querySelectorAll(".wallet-types");
  walletsSelected.forEach((wallet, index) => {
  
    wallet.addEventListener('click', (event) => {
      
      const walletNameSelected = event.target.querySelector(".title").textContent;
      if(walletNameSelected) {
        currentWalletIndex = index;
        generateCurrentWallet(index);
        walletsSelected.forEach((otherWallet) => {
          if (otherWallet != wallet) {
            otherWallet.classList.remove('active');
          }
        });
        wallet.classList.add('active');
      }
    })
  });
}

addWalletEvent();


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

addButtonsFunc();



//// SNACKBAR FUNCTION


function myFunction() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

