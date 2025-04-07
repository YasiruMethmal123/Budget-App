let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const Amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

totalAmountButton.addEventListener('click',()=>{
    tempAmount = tempAmount.value;
    if(tempAmount == "" || tempAmount <0){
        errorMessage.classList.remove("hide");
    }else{
        errorMessage.classList.add("hide");
        Amount.innerHTML = tempAmount;
        balanceValue.innerHTML = tempAmount - expenditureValue.innerText;
        totalAmount.value = "";
    }
});
const disableButton = (boot) =>{
    let editButton = document.getElementsByClassName("edit");
    Array.from(editButton).forEach((element) =>{
        element.disabled = bool;
    });
};

const modifyElement = (element,edit = false) =>{
    let perentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpences = expenditureValue.innerText;
    let parentAmount = perentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = perentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButton(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText =
        parseInt(currentExpences) = parseInt(parentAmount);
    perentDiv.remove();

}
const listCreator = (expenseName, expenseValue)=>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click",()=>{
        modifyElement(editButton,true)
    });
   let deleteButton = document.createElement("button");
   deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
   deleteButton.style.fontSize = "1.2em";
   deleteButton.addEventListener("click",()=>{
    modifyElement(deleteButton);
   });
   sublistContent.appendChild(editButton);
   sublistContent.appendChild(deleteButton);
   document.getElementById("list").appendChild(sublistContent);

};
checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !productTitle.value){
        productCostError.classList.remove("hide");
        return false;
    }
    disableButton(false);
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    listCreator(productTitle.value , userAmount.value);

    productTitle.value = "";
    userAmount.value = "";

});