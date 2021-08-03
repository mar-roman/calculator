'use strict';

let money = 90000,
income = 'фриланс', 
addExpenses = 'интернет, такси, коммуналка',
deposit = true,
mission = 1000000,
period = 12,
expenses1, expenses2, amount1, amount2;

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
expenses1 = prompt("Введите обязательную статью расходов?");
amount1 = prompt("Во сколько это обойдется?");
expenses2 = prompt("Введите обязательную статью расходов?");
amount2 = prompt("Во сколько это обойдется?");

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

let getExpensesMonth = function(data1, data2) {
  return parseInt(data1) + parseInt(data2);
};

let getAccumulatedMonth = function(money, expenses) {
  return money - expenses;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

let getTargetMonth = function(mission, budgetMonth) {
  return Math.ceil(mission / budgetMonth);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log("Расходы за месяц: " + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log("Цель будет достигнута за " + getTargetMonth(mission, accumulatedMonth) + " месяцев");

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
