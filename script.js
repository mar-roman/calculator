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
let incomeTitle = document.querySelectorAll('.income-title');
let incomeAmount = document.querySelectorAll('.income-amount');
let expensesTitle = document.querySelectorAll('.expenses-title');
let expensesAmount = document.querySelectorAll('.expenses-amount');
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

const AppData = function(){
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
};

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.showResult = function() {
  let _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener('change', function() {
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};
AppData.prototype.addExpencesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  let _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getIncome = function() {
  let _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function() {
  let _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if(item !== ''){
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function(){
  let _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {
  for(let key in this.expenses){
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(parseFloat(this.budgetMonth) / 30);
};

AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay > 1200){
    return "У Вас высокий уровень дохода";
  } else if ((this.budgetDay > 600) && (this.budgetDay <= 1200)) {
    return "У Вас средний уровень дохода";
  } else if ((this.budgetDay > 0) && (this.budgetDay <= 600)) {
    return "У Вас низкий уровень дохода";
  } else {
    return "Что-то пошло не так";
  }
};

AppData.prototype.getInfoDeposit = function() {
  this.deposit = confirm("Есть ли у вас депозит в банке?");
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function(){
  salaryAmount.removeAttribute('disabled', '');
  salaryAmount.value = '';
  incomeTitle.forEach(function(item){
    item.removeAttribute('disabled', '');
    item.value = '';
  });
  incomeAmount.forEach(function(item){
    item.removeAttribute('disabled', '');
    item.value = '';
  });
  expensesTitle.forEach(function(item){
    item.removeAttribute('disabled', '');
    item.value = '';
  });
  expensesAmount.forEach(function(item){
    item.removeAttribute('disabled', '');
    item.value = '';
  });
  additionalIncomeItem[0].removeAttribute('disabled', '');
  additionalIncomeItem[0].value = '';
  additionalIncomeItem[1].removeAttribute('disabled', '');
  additionalIncomeItem[1].value = '';
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
};

AppData.prototype.EventListeners = function(){
  let _this = this;
  start.addEventListener('click', function() {
    if (+salaryAmount.value !== 0) {
      _this.start();
      incomeTitle = document.querySelectorAll('.income-title');
      expensesTitle = document.querySelectorAll('.expenses-title');
      incomeAmount = document.querySelectorAll('.income-amount');
      expensesAmount = document.querySelectorAll('.expenses-amount');
      incomeTitle.forEach(function(item){
        item.setAttribute('disabled', '');
      });
      incomeAmount.forEach(function(item){
        item.setAttribute('disabled', '');
      });
      expensesTitle.forEach(function(item){
        item.setAttribute('disabled', '');
      });
      expensesAmount.forEach(function(item){
        item.setAttribute('disabled', '');
      });
      salaryAmount.setAttribute('disabled', '');
      additionalIncomeItem[0].setAttribute('disabled', '');
      additionalIncomeItem[1].setAttribute('disabled', '');
      additionalExpensesItem.setAttribute('disabled', '');
      targetAmount.setAttribute('disabled', '');
      depositAmount.setAttribute('disabled', '');
      start.style.display = 'none';
      cancel.style.display = 'block';
    }
  });
  cancel.addEventListener('click', function() {
    _this.reset();
  });
  expensesPlus.addEventListener('click', _this.addExpencesBlock);
  incomePlus.addEventListener('click', _this.addIncomeBlock);
  periodSelect.addEventListener('change', function() {
    periodAmount.innerHTML = periodSelect.value;
  });
};

const appData = new AppData();
appData.EventListeners();

console.log(appData);


