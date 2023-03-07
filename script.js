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
const inputAmountLabel = document.querySelector(".form-amount-area").value;
const inputDetailLabel = document.querySelector(".form-input__description");
const [...inputCategoryArray] =
  document.getElementsByClassName("form-category__btn");
// MISC
const chart_innerBar = document.querySelector(".bar-inner");
const expenseList = document.querySelector(".expense-list"); //insert adjascent element
const categorySection = document.querySelector(".category-section");

// STARTER VARIABLES
const newExpense = {};
let selectedCategory;

// TEST DATA
const expenseData = [
  {
    amount: 56.12,
    category: "night out",
    description: "denver beer co with friends",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() - 2,
      year: new Date().getFullYear(),
    },
  },
  {
    amount: 152.75,
    category: "misc",
    description: "plane tickets to florida",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() - 2,
      year: new Date().getFullYear(),
    },
  },
  {
    amount: 950,
    category: "fixed cost",
    description: "rent",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() - 2,
      year: new Date().getFullYear(),
    },
  },
  {
    amount: 38.59,
    category: "eating out",
    description: "school house with kelly and jared",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() - 2,
      year: new Date().getFullYear(),
    },
  },
  {
    amount: 40,
    category: "night out",
    description: "denver bars",
    date: {
      month: new Date().getMonth() + 1,
      day: new Date().getDay() - 2,
      year: new Date().getFullYear(),
    },
  },
];

// NOTE: there should be a 'loadUI()' function that reloads the expenses array and updates the overview
// 1. Save form fields
//    - save them in an object
//    - add unique ID to that object (to be used to find and edit/delete expenses)

// sets the amount ///////////

// sets the category
inputCategoryArray.forEach((category) => {
  category.addEventListener("click", (e) => {
    e.preventDefault();
    selectedCategory = e.target.innerHTML;
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // create new object
  newExpense.category = selectedCategory;
});
