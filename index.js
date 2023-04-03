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
        <p class="subtitle">${wallet.walletAmount} RON</p>
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
  console.log(walletPhoto);
  const newWallet = { walletType, walletAmount, walletPhoto};
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

// const buttons = document.querySelectorAll(".buttons");

// buttons.forEach(button => {
//   const textForEdit = document.createElement('div');
//   textForEdit.textContent = "In edit mode";
//   textForEdit.style.color = "green";
//   textForEdit.style.display = "none";
//   button.appendChild(textForEdit);
  
//   let visible = false;
  
//   const editButton = button.querySelector('.edit');
//   const deleteButton = button.querySelector('.delete');
  
//   const toggleVisibility = () => {
//     visible = !visible;
//     textForEdit.style.display = visible ? "block" : "none";
//   };
  
//   editButton.addEventListener('click', toggleVisibility);
//   deleteButton.addEventListener('click', toggleVisibility);
// });


// let inEditMode = false;
// let inDeleteMode = false;

// const editClickHandler = () => {

//   inEditMode = !inEditMode;
//   inDeleteMode = false;
//   if(inEditMode) {
//     editModeContainer.textContent = "In edit mode";
//     editModeContainer.style.color = "green";
//   }
//   editModeContainer.style.visibility = inEditMode ? "visible" : "hidden";
  
//   btnEdit.style.color = inEditMode ? "green" : "black";
  
//   console.log("Edit value is: " + inEditMode);
//   console.log("Delete value is: " + inDeleteMode);
// };

// const deleteClickHandler = () => {
//   inDeleteMode = !inDeleteMode;
//   inEditMode  = false;
//   if(inDeleteMode) {
//     editModeContainer.textContent = "In delete mode";
//     editModeContainer.style.color = "red";
//   }
//   editModeContainer.style.visibility = inDeleteMode ? "visible" : "hidden";
//   btnEdit.style.color = inEditMode ? "green" : "black";
 
//   console.log("Edit value is: " + inEditMode);
//   console.log("Delete value is: " + inDeleteMode);
// };


// btnEdit.addEventListener("click", editClickHandler);
// btnDelete.addEventListener("click", deleteClickHandler);

// btnDelete.addEventListener("click", () => {
//   btnEdit.removeEventListener("click", editClickHandler);
// });

// const categories = [
//   {
//     name: "Utility",
//     balance: 250,
//   },
//   {
//     name: "Saving",
//     balance: 1000,
//   },
//   {
//     name: "Shopping",
//     balance: 430,
//   },
//   {
//     name: "Personal",
//     balance: 150,
//   },
//   {
//     name: "Health",
//     balance: 70,
//   },
// ];

// const renderWidget = (title, items) => {
//   const renderedItems = items.reduce((acc, { name, balance }) => {
//     return (
//       acc +
//       `<li>
//         <div class="widget-item">
//             <div class="widget-item-name">${name}</div>
//             <div class="widget-item-balance">${balance}</div>
//         </div>
//     </li>`
//     );
//   }, "");
//   const content = `
//     <div class="widget">
//         <h2>${title}</h2>
//         <ul class="widget-item-container">
//             ${renderedItems}
//         </ul>
//     </div
// `;
//   console.log(content);
//   return content;
// };

// (function () {
//   const wallets = JSON.parse(localStorage.getItem("wallets"));
//   console.log(wallets, typeof wallets);
//   const aside = document.querySelector(".aside");
//   aside.innerHTML += renderWidget("Wallets", wallets);
//   aside.innerHTML += renderWidget("Categories", categories);
// })();
