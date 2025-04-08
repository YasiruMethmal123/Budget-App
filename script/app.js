document.addEventListener("DOMContentLoaded", () => {
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
    const list = document.getElementById("title");
    let tempAmount = 0;

    console.log("All elements:", { totalAmount, userAmount, checkAmountButton, totalAmountButton, productTitle, errorMessage, productTitleError, productCostError, Amount, expenditureValue, balanceValue, list });

    if (!list) console.error("list element (id='title') is missing from HTML!");
    if (!productTitle) console.error("productTitle element (id='product-title') is missing from HTML!");
    if (!userAmount) console.error("userAmount element (id='user-amount') is missing from HTML!");

    totalAmountButton.addEventListener('click', () => {
        tempAmount = totalAmount.value;
        if (tempAmount === "" || tempAmount < 0) {
            errorMessage.classList.remove("hide");
        } else {
            errorMessage.classList.add("hide");
            Amount.innerHTML = tempAmount;
            balanceValue.innerHTML = tempAmount - expenditureValue.innerText;
            totalAmount.value = "";
        }
    });

    const disableButton = (bool) => {
        let editButton = document.getElementsByClassName("edit");
        Array.from(editButton).forEach((element) => {
            element.disabled = bool;
        });
    };

    const modifyElement = (element, edit = false) => {
        let parentDiv = element.parentElement;
        let currentBalance = balanceValue.innerText;
        let currentExpenses = expenditureValue.innerText;
        let parentAmount = parentDiv.querySelector(".amount").innerText;
        if (edit) {
            let parentText = parentDiv.querySelector(".product").innerText;
            productTitle.value = parentText;
            userAmount.value = parentAmount;
            disableButton(true);
        }
        balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
        expenditureValue.innerText = parseInt(currentExpenses) - parseInt(parentAmount);
        parentDiv.remove();
    };

    const listCreator = (expenseName, expenseValue) => {
        console.log("listCreator called with:", expenseName, expenseValue);
        let sublistContent = document.createElement("div");
        sublistContent.classList.add("sublist-content", "flex-space");
        if (list) {
            list.appendChild(sublistContent);
            sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
            console.log("Appended to list:", list.innerHTML);
        } else {
            console.error("list element (id='title') not found!");
        }
        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "1.2em";
        editButton.addEventListener("click", () => {
            modifyElement(editButton, true);
        });
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
        deleteButton.style.fontSize = "1.2em";
        deleteButton.addEventListener("click", () => {
            modifyElement(deleteButton);
        });
        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);
    };

    checkAmountButton.addEventListener("click", () => {
        console.log("checkAmountButton clicked!");
        console.log("productTitle element:", productTitle);
        console.log("productTitle.value:", productTitle?.value);
        console.log("userAmount element:", userAmount);
        console.log("userAmount.value:", userAmount?.value);
        console.log("tempAmount:", tempAmount);

        if (!productTitle || !userAmount || !productTitle.value || !userAmount.value) {
            console.log("Validation failed!");
            if (!productTitle) console.log("Reason: productTitle is null");
            if (!userAmount) console.log("Reason: userAmount is null");
            if (productTitle && !productTitle.value) console.log("Reason: productTitle.value is empty");
            if (userAmount && !userAmount.value) console.log("Reason: userAmount.value is empty");
            if (productCostError) {
                productCostError.classList.remove("hide");
            }
            return false;
        }

    

        disableButton(false);
        let expenditure = parseInt(userAmount.value) || 0;
        let currentExpenditure = parseInt(expenditureValue?.innerText || "0") || 0;
        let sum = currentExpenditure + expenditure;
        console.log("expenditure:", expenditure, "sum:", sum);
        expenditureValue.innerText = sum;
        const totalBalance = tempAmount - sum;
        console.log("totalBalance:", totalBalance);
        balanceValue.innerText = totalBalance;

        let productName = productTitle.value;
        let amountValue = userAmount.value;
        console.log("Calling listCreator with:", productName, amountValue);
        listCreator(productName, amountValue);

        productTitle.value = "";
        userAmount.value = "";
    });
});