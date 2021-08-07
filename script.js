'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function() {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function() {

      if (confirm('Есть ли у вас дополнительный источник заработка?')) {
        let itemIncome, cashIncome;
        do {
          itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Такси');
        } while (isNumber(itemIncome));
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        } while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      }

      appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
      appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm("Есть ли у вас депозит в банке?");

      for (let i = 0; i < 2; i++) {
        let key;
        do {
          key = prompt("Введите обязательную статью расходов?");
        } while (isNumber(key));
        appData.expenses[key] = 0;
        let expense;
        do {
          expense = +prompt("Во сколько это обойдется?");
        } while (!isNumber(expense));
        appData.expenses[key] = expense;
      }   
  },

  getExpensesMonth: function() {
    for(let key in appData.expenses){
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(parseFloat(appData.budgetMonth) / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function() {
    if (appData.budgetDay > 1200){
      return "У Вас высокий уровень дохода";
    } else if ((appData.budgetDay > 600) && (appData.budgetDay <= 1200)) {
      return "У Вас средний уровень дохода";
    } else if ((appData.budgetDay > 0) && (appData.budgetDay <= 600)) {
      return "У Вас низкий уровень дохода";
    } else {
      return "Что-то пошло не так";
    }
  },

  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

appData.getExpensesMonth();

appData.getBudget();

console.log("Расходы за месяц: " + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
} else {
  console.log("Цель не будет достигнута");
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}

for (let i = 0; i < appData.addExpenses.length; i++) {
  let firstLetter = appData.addExpenses[i].substr(0, 1);
  appData.addExpenses[i] = firstLetter.toUpperCase() + appData.addExpenses[i].substr(1);
}
console.log(appData.addExpenses.join(', '));