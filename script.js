"use strict";
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
const filterMonthBtn = document.querySelector(".month__btn");
const editExpenseBtn = document.querySelector(".expense-edit__btn");
const deleteExpenseBtn = document.querySelector(".expense-delete__btn");
// INPUTS
const inputAmountLabel = document.querySelector(".form-amount-area");
const inputDetailLabel = document.querySelector(".form-input__description");
const [...inputCategoryArray] =
  document.getElementsByClassName("form-category__btn");
// MISC
const chart_innerBar = document.querySelector(".bar-inner");
const expenseList = document.querySelector(".expense-list");
const categorySection = document.querySelector(".category-section");
const form = document.querySelector("form");

// STARTER VARIABLES
const expenses = [
  {
    amount: 50,
    category: "NIGHT OUT",
    detail: "Test detail",
    date: {
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
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
      month: new Date().getMonth() + 1,
      day: new Date().getDay() + 1,
      year: new Date().getFullYear(),
    },
    id: 10,
  },
];
let inputCategory;
let inputAmount;
let inputDetail;

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
  chart_bar[0].style.height = `${(nightOut / total) * 100}% `;
  chart_bar[1].style.height = `${(eatingOut / total) * 100}% `;
  chart_bar[2].style.height = `${(groceries / total) * 100}% `;
  chart_bar[3].style.height = `${(car / total) * 100}% `;
  chart_bar[4].style.height = `${(fixed / total) * 100}% `;
  chart_bar[5].style.height = `${(misc / total) * 100}% `;
};
// Updates the category totals

// HELPER FUNCTIONS - Resets form field after submission
const resetForm = function () {
  inputAmountLabel.value = "";
  inputDetailLabel.value = "";
  inputCategoryArray.forEach((category) => {
    category.classList.remove("active-category");
  });
};

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
      <button class="expense-edit__btn">Edit</button>
      <button class="expense-delete__btn">X</button>
    </div>
    `;
    expenseList.insertAdjacentHTML("afterbegin", html);
  });
};

// sets the selected category
inputCategoryArray.forEach((category) => {
  category.addEventListener("click", (e) => {
    e.preventDefault();
    inputCategory = e.target.innerHTML;
    category.classList.toggle("active-category");
    //IMPROVEMENT: Remove class
  });
});

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

// remove both function call after testing
displayExpenses(expenses);
calculateTotals(expenses);
