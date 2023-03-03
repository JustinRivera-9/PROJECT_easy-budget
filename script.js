"use strict";
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

console.log(expenseData);
