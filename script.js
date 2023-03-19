// NOTE: there should be a 'loadUI()' function that reloads the expenses array and updates the overview

///// DOCUMENT VARIABLES /////
// LABELS
const chart_expenseTotalLabel = document.querySelector(".total-expense__label");
const [...chart_categoryTotalLabel] = document.querySelectorAll(
  ".category-total__label"
);
const chart_categoryLabel = document.querySelector("category__label");
const [...chart_bar] = document.querySelectorAll(".bar-inner");
const list_amountLabel = document.querySelector(".expense-amount__label");
const list_dateLabel = document.querySelector(".expense-date__label");
const list_categoryLabel = document.querySelector(".expense-category__label");
const list_detailLabel = document.querySelector(".expense-description__label");
// BUTTONS
const submitBtn = document.querySelector(".form-submit__btn");
const filterMonthBtn = document.querySelector(".month-filter__btn");
const deleteExpenseBtns = document.querySelectorAll(".expense-delete__btn");
// FORM ELEMENTS
const inputAmountLabel = document.querySelector(".form-amount-area");
const inputDetailLabel = document.querySelector(".form-input__description");
const [...inputCategoryArray] =
  document.getElementsByClassName("form-category__btn");
// EDIT ELEMENTS
const modal = document.querySelector(".modal-bg");
const editModal = document.querySelector(".edit-modal");
const editExpenseBtn = document.querySelectorAll(".expense-edit__btn");
const editConfirmBtn = document.querySelector(".edit-confirm__btn");
const editCancelBtn = document.querySelector(".edit-cancel__btn");
const [...editCategoryArray] =
  document.getElementsByClassName("edit-category__btn");
const editAmountLabel = document.querySelector(".edit-amount-area");
const editDetailLabel = document.querySelector(".edit-input__description");
// MISC
const chart_innerBar = document.querySelector(".bar-inner");
const expenseList = document.querySelector(".expense-list");
const expenseListParent = document.getElementById("parent-list");
const categorySection = document.querySelector(".category-section");
const form = document.querySelector("form");
const filterDropdown = document.querySelector(".dropdown-content");
const [...monthOptions] = document.querySelectorAll(".month-option");

// STARTER VARIABLES
const expenses = [
  {
    amount: 50,
    category: "NIGHT OUT",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 3,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 1,
  },
  {
    amount: 25,
    category: "FIXED",
    detail: "Test detail",
    date: {
      month: new Date().getMonth(),
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 2,
  },
  {
    amount: 250,
    category: "CAR",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 3,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 3,
  },
  {
    amount: 550,
    category: "FIXED",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 2,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 4,
  },
  {
    amount: 200,
    category: "GROCERIES",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 5,
  },
  {
    amount: 75,
    category: "EATING OUT",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 6,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 6,
  },
  {
    amount: 125,
    category: "NIGHT OUT",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 6,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 7,
  },
  {
    amount: 375,
    category: "MISC",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 6,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 8,
  },
  {
    amount: 150,
    category: "EATING OUT",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 9,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 9,
  },
  {
    amount: 250,
    category: "GROCERIES",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 4,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 10,
  },
];
const monthArr = [
  "All",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let inputCategory;
let inputAmount;
let inputDetail;
let monthFilter;
let filteredArray;

// sets the selected category
const selectCategory = function (arr) {
  arr.forEach((category) => {
    category.addEventListener("click", (e) => {
      e.preventDefault();
      inputCategory = e.target.innerHTML;
      category.classList.toggle("active-category");
      //IMPROVEMENT: Remove class
    });
  });
};
selectCategory(inputCategoryArray);
selectCategory(editCategoryArray);

// handles whether to delete or edit an expense
expenseListParent.addEventListener("click", (e) => {
  let expenseID = Number(e.target.value);
  if (e.target.className === "expense-delete__btn") {
    deleteExpenseHandler(expenseID);
  } else if (e.target.className === "expense-edit__btn") {
    editExpenseHandler(expenseID);
  }
});

// HELPER FUNCTIONS - Calculates total for each category and total expenses
const calculateTotals = function (expenses) {
  const nightOut = expenses
    .filter((expense) => expense.category === "NIGHT OUT")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const eatingOut = expenses
    .filter((expense) => expense.category === "EATING OUT")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const groceries = expenses
    .filter((expense) => expense.category === "GROCERIES")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const car = expenses
    .filter((expense) => expense.category === "CAR")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const fixed = expenses
    .filter((expense) => expense.category === "FIXED")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const misc = expenses
    .filter((expense) => expense.category === "MISC")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const total = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  // Updates the category total values
  chart_categoryTotalLabel[0].textContent = `$${nightOut}`;
  chart_categoryTotalLabel[1].textContent = `$${eatingOut}`;
  chart_categoryTotalLabel[2].textContent = `$${groceries}`;
  chart_categoryTotalLabel[3].textContent = `$${car}`;
  chart_categoryTotalLabel[4].textContent = `$${fixed}`;
  chart_categoryTotalLabel[5].textContent = `$${misc}`;
  chart_expenseTotalLabel.textContent = `$${total}`;

  // Updates the height of the category charts
  if (!total) {
    chart_bar[0].style.height = "0%";
    chart_bar[1].style.height = "0%";
    chart_bar[2].style.height = "0%";
    chart_bar[3].style.height = "0%";
    chart_bar[4].style.height = "0%";
    chart_bar[5].style.height = "0%";
  } else {
    chart_bar[0].style.height = `${(nightOut / total) * 100}% `;
    chart_bar[1].style.height = `${(eatingOut / total) * 100}% `;
    chart_bar[2].style.height = `${(groceries / total) * 100}% `;
    chart_bar[3].style.height = `${(car / total) * 100}% `;
    chart_bar[4].style.height = `${(fixed / total) * 100}% `;
    chart_bar[5].style.height = `${(misc / total) * 100}% `;
  }
};

// HELPER FUNCTIONS - Resets form fields after submission
const resetForm = function () {
  inputAmountLabel.value = "";
  inputDetailLabel.value = "";
  inputCategory = "";
  inputCategoryArray.forEach((category) => {
    category.classList.remove("active-category");
  });

  editAmountLabel.value = "";
  editDetailLabel.value = "";
  editCategoryArray.forEach((category) => {
    category.classList.remove("active-category");
  });
};

// HELPER FUNCTION - Filters the expenses
filterMonthBtn.addEventListener("click", () => {
  const filterActive = filterDropdown.style.display === "block";
  if (filterActive) filterDropdown.style.display = "none";
  else filterDropdown.style.display = "block";
});

monthOptions.forEach((month) => {
  month.addEventListener("click", () => {
    filterDropdown.style.display = "none";
    monthFilter = month.textContent;
    let idx = monthArr.findIndex((month) => month === monthFilter);
    filterMonthBtn.textContent = monthArr[idx];

    let filteredArray = expenses.filter(
      (expense) => expense.date.month === idx
    );

    if (idx === 0) {
      displayExpenses(expenses);
      calculateTotals(expenses);
    } else {
      displayExpenses(filteredArray);
      calculateTotals(filteredArray);
    }
  });
});

// HELPER FUNCTIONS - displays expense list
const displayExpenses = function (expenses) {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    const html = `
    <div class="expense-item">
      <div class="expense-amount-date">
        <p class="expense-amount__label">$${expense.amount}</p>
        <p class="expense-date__label">${expense.date.month}/${expense.date.day}/${expense.date.year}</p>
      </div>
      <div class="expense-detail">
        <p class="expense-category__label">${expense.category}</p>
        <p class="expense-description__label">${expense.detail}</p>
      </div>
      <button class="expense-edit__btn" value="${expense.id}">Edit</button>
      <button class="expense-delete__btn" value="${expense.id}">X</button>
      </div>
      `;
    expenseList.insertAdjacentHTML("afterbegin", html);
  });
};

// HELPER FUNCTION - used to delete expense from array
const deleteExpenseHandler = function (expenseID) {
  let idx = expenses.findIndex((element) => expenseID === element.id);
  expenses.splice(idx, 1);
  displayExpenses(expenses);
  calculateTotals(expenses);
};

// Handles form submission
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  inputAmount = Number(inputAmountLabel.value);
  inputDetail = inputDetailLabel.value;

  if (!inputAmount || !inputDetail || !inputCategory) {
    window.alert("Please enter a valid expense");
  } else {
    // adds properties to the expense object
    const newExpense = {};
    newExpense.amount = inputAmount;
    newExpense.category = inputCategory;
    newExpense.detail = inputDetail;
    (newExpense.date = {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    }),
      (newExpense.id = Math.floor(Math.random() * 10000));

    // adds expense object to expenses array
    expenses.push(newExpense);
    displayExpenses(expenses);
    calculateTotals(expenses);
  }
  resetForm();
});

// Handles edit button
const editExpenseHandler = function (expenseID) {
  editModal.style.display = "block";
  resetForm();

  // Handles canceling an edit
  editCancelBtn.addEventListener("click", () => {
    editModal.style.display = "none";
    // modal.style.display = "none";

    expenseID = "";
  });

  // Handles confirming an edit
  editConfirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let idx = expenses.findIndex((element) => expenseID === element.id);
    inputAmount = Number(editAmountLabel.value);
    inputDetail = editDetailLabel.value;
    if (!inputAmount || !inputDetail || !inputCategory) {
      window.alert("Please enter a valid expense");
    } else {
      expenses[idx].amount = inputAmount;
      expenses[idx].category = inputCategory;
      expenses[idx].detail = inputDetail;

      // Updates totals, expenses and resets form
      displayExpenses(expenses);
      calculateTotals(expenses);
      editModal.style.display = "none";
      // modal.style.display = "none";
    }
  });
};

// remove both function calls after testing
displayExpenses(expenses);
calculateTotals(expenses);

////////// BUGS TO FIX
// 1. If you have a filter on and try to delete or edit an expense, the displayExpenses function passes in the expenses array and not the filteredArray
// 2. When adding a new expense, the displayExpenses function passes in the expenses array and not the filteredArray
// 3. Use Javascript to automatically reformat the currency and date values
// 4. The inner bar color on the chart is top-down instead of bottom-up
// 5. Multiple categories look selected in the edit modal and expense form. The value is based off the last clicked box which is correct. Need logic so that 2 elements in that div can't contain the active class.
// 6. When the edit button is clicked there needs to be a background blur
