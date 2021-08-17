'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelectorAll('.income-title')[1];
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelectorAll('.expenses-title')[1];
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  incomeMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getBudget();
    this.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function() {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpencesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    for(let key in this.expenses){
      this.expensesMonth += +this.expenses[key];
    }
  },

  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(parseFloat(this.budgetMonth) / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },

  getStatusIncome: function() {
    if (this.budgetDay > 1200){
      return "У Вас высокий уровень дохода";
    } else if ((this.budgetDay > 600) && (this.budgetDay <= 1200)) {
      return "У Вас средний уровень дохода";
    } else if ((this.budgetDay > 0) && (this.budgetDay <= 600)) {
      return "У Вас низкий уровень дохода";
    } else {
      return "Что-то пошло не так";
    }
  },

  getInfoDeposit: function() {
    this.deposit = confirm("Есть ли у вас депозит в банке?");
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },

  calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },

  reset: function(){
    salaryAmount.removeAttribute('disabled', '');
    salaryAmount.value = '';
    incomeTitle.removeAttribute('disabled', '');
    incomeTitle.value = '';
    incomeAmount.removeAttribute('disabled', '');
    incomeAmount.value = '';
    additionalIncomeItem[0].removeAttribute('disabled', '');
    additionalIncomeItem[0].value = '';
    additionalIncomeItem[1].removeAttribute('disabled', '');
    additionalIncomeItem[1].value = '';
    expensesTitle.removeAttribute('disabled', '');
    expensesTitle.value = '';
    expensesAmount.removeAttribute('disabled', '');
    expensesAmount.value = '';
    additionalExpensesItem.removeAttribute('disabled', '');
    additionalExpensesItem.value = '';
    targetAmount.removeAttribute('disabled', '');
    targetAmount.value = '';
    depositAmount.removeAttribute('disabled', '');
    depositAmount.value = '';
    start.style.display = 'block';
    cancel.style.display = 'none';
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = '';
    incomePeriodValue.value = '';
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 1000000;
    this.period = 12;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
};

start.addEventListener('click', function() {
  if (+salaryAmount.value !== 0) {
    appData.start();

    salaryAmount.setAttribute('disabled', '');
    incomeTitle.setAttribute('disabled', '');
    incomeAmount.setAttribute('disabled', '');
    additionalIncomeItem[0].setAttribute('disabled', '');
    additionalIncomeItem[1].setAttribute('disabled', '');
    expensesTitle.setAttribute('disabled', '');
    expensesAmount.setAttribute('disabled', '');
    additionalExpensesItem.setAttribute('disabled', '');
    targetAmount.setAttribute('disabled', '');
    depositAmount.setAttribute('disabled', '');
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
});

cancel.addEventListener('click', function() {
  appData.reset();
});

expensesPlus.addEventListener('click', appData.addExpencesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', function() {
  periodAmount.innerHTML = periodSelect.value;
});

//if (appData.getTargetMonth() > 0) {
//  console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
//} else {
//  console.log("Цель не будет достигнута");
//}
