'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
income = 'фриланс', 
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
deposit = confirm("Есть ли у вас депозит в банке?"),
mission = 1000000,
period = 12;


let start = function() {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

let expenses = [];

let getExpensesMonth = function(data1, data2) {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");
    let expense;
    do {
      expense = +prompt("Во сколько это обойдется?");
    } while (!isNumber(expense));
    sum += expense;
  }
  
  console.log(expenses);
  return sum; 
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function(money, expenses) {
  return money - expenses;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let getTargetMonth = function(mission, budgetMonth) {
  return Math.ceil(mission / budgetMonth);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log("Расходы за месяц: " + expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));

if (getTargetMonth(mission, accumulatedMonth) > 0) {
  console.log("Цель будет достигнута за " + getTargetMonth(mission, accumulatedMonth) + " месяцев");
} else {
  console.log("Цель не будет достигнута");
}

let budgetDay = Math.floor(parseFloat(accumulatedMonth) / 30);
console.log("Бюджет на день: " + budgetDay);

let getStatusIncome = function() {
  if (budgetDay > 1200){
    return "У Вас высокий уровень дохода";
  } else if ((budgetDay > 600) && (budgetDay <= 1200)) {
    return "У Вас средний уровень дохода";
  } else if ((budgetDay > 0) && (budgetDay <= 600)) {
    return "У Вас низкий уровень дохода";
  } else {
    return "Что-то пошло не так";
  }
};

console.log(getStatusIncome());
