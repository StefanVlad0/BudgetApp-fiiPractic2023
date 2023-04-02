// const btnEdit = document.querySelector(".btn.edit");
// const btnDelete = document.querySelector(".btn.delete");

// const editModeContainer = document.createElement("div");
// editModeContainer.textContent = "In edit mode";
// editModeContainer.style.color = "green";
// editModeContainer.style.visibility = "hidden";

// const buttons = document.querySelectorAll(".buttons");
// buttons.forEach(element => {
//   const textForEdit = document.createElement('div');
//   textForEdit.textContent = "In edit mode";
//   textForEdit.style.color = "green";
//   element.appendChild(textForEdit);
// });

const openModalButton = document.querySelector('#open-modal');
const modalElement = document.querySelector('#my-modal');

openModalButton.addEventListener('click', () => {
  modalElement.style.display = 'block';
});


const closeModalButton = document.querySelector('#close-modal');

closeModalButton.addEventListener('click', () => {
  modalElement.style.display = 'none';
});


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

const categories = [
  {
    name: "Utility",
    balance: 250,
  },
  {
    name: "Saving",
    balance: 1000,
  },
  {
    name: "Shopping",
    balance: 430,
  },
  {
    name: "Personal",
    balance: 150,
  },
  {
    name: "Health",
    balance: 70,
  },
];

const renderWidget = (title, items) => {
  const renderedItems = items.reduce((acc, { name, balance }) => {
    return (
      acc +
      `<li>
        <div class="widget-item">
            <div class="widget-item-name">${name}</div>
            <div class="widget-item-balance">${balance}</div>
        </div>
    </li>`
    );
  }, "");
  const content = `
    <div class="widget">
        <h2>${title}</h2>
        <ul class="widget-item-container">
            ${renderedItems}
        </ul>
    </div
`;
  console.log(content);
  return content;
};

(function () {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  console.log(wallets, typeof wallets);
  const aside = document.querySelector(".aside");
  aside.innerHTML += renderWidget("Wallets", wallets);
  aside.innerHTML += renderWidget("Categories", categories);
})();
