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

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetMonth = money-amount1-amount2;
console.log("Бюджет на месяц: " + budgetMonth);

console.log("Цель будет достигнута за " + Math.ceil(mission / budgetMonth) + " месяцев");

let budgetDay = Math.floor(parseFloat(budgetMonth) / 30);
console.log("Бюджет на день: " + budgetDay);

if (budgetDay > 1200){
  console.log("У Вас высокий уровень дохода");
} else if ((budgetDay > 600) && (budgetDay <= 1200)) {
  console.log("У Вас средний уровень дохода");
} else if ((budgetDay > 0) && (budgetDay <= 600)) {
  console.log("У Вас низкий уровень дохода");
} else {
  console.log("Что-то пошло не так");
}