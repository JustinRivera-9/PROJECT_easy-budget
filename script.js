"use strict";

///// DOCUMENT VARIABLES /////
// LABELS
const chart_expenseTotalLabel = document.querySelector(".total-expense__label");
const chart_categoryTotalLabel = document.querySelectorAll(
  ".category-total__label"
);
const chart_categoryLabel = document.querySelector("category__label");
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
const expenseList = document.querySelector(".expense-list"); //insert adjascent element
const categorySection = document.querySelector(".category-section");
const form = document.querySelector("form");

// STARTER VARIABLES
const expenses = [];
let inputCategory;
let inputAmount;
let inputDetail;

// NOTE: there should be a 'loadUI()' function that reloads the expenses array and updates the overview

// saves the value of input fields
const handleInputs = function (e) {
  inputAmount = Number(inputAmountLabel.value);
  inputDetail = inputDetailLabel.value;
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

// handles form submission
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // adds properties to the expense object
  const newExpense = {};
  newExpense.amount = inputAmount;
  newExpense.category = inputCategory;
  newExpense.detail = inputDetail;
  (newExpense.date = {
    month: new Date().getMonth() + 1,
    day: new Date().getDay() - 2,
    year: new Date().getFullYear(),
  }),
    (newExpense.id = Math.floor(Math.random() * 10000));

  // adds expense object to expenses array
  expenses.push(newExpense);
  console.log(expenses);

  // resets form fields
  inputAmountLabel.value = "";
  inputDetailLabel.value = "";
  inputCategoryArray.forEach((category) => {
    category.classList.remove("active-category");
  });
});

// for each expense object in the expense array, create a new element containing that expenses information
