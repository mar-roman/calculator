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
const depositBank = document.querySelector('.deposit-bank');

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor(){
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

    const _this = this;
    start.addEventListener('click', () => {
      if (+salaryAmount.value !== 0) {
        _this.start();
        incomeTitle = document.querySelectorAll('.income-title');
        expensesTitle = document.querySelectorAll('.expenses-title');
        incomeAmount = document.querySelectorAll('.income-amount');
        expensesAmount = document.querySelectorAll('.expenses-amount');
        incomeTitle.forEach((item) => {
          item.setAttribute('disabled', '');
        });
        incomeAmount.forEach((item) => {
          item.setAttribute('disabled', '');
        });
        expensesTitle.forEach((item) => {
          item.setAttribute('disabled', '');
        });
        expensesAmount.forEach((item) => {
          item.setAttribute('disabled', '');
        });
        salaryAmount.setAttribute('disabled', '');
        additionalIncomeItem[0].setAttribute('disabled', '');
        additionalIncomeItem[1].setAttribute('disabled', '');
        additionalExpensesItem.setAttribute('disabled', '');
        targetAmount.setAttribute('disabled', '');
        depositAmount.setAttribute('disabled', '');
        depositPercent.setAttribute('disabled', '');
        start.style.display = 'none';
        cancel.style.display = 'block';
      }
    });
    cancel.addEventListener('click', () => {
      _this.reset();
    });
    expensesPlus.addEventListener('click', _this.addExpencesBlock);
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    periodSelect.addEventListener('change', () => {
      periodAmount.innerHTML = periodSelect.value;
    });
    depositCheck.addEventListener('change', _this.depositHandler.bind(_this));
  }

  changePersent(){
    const valueSelect = this.value;
    if(valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
    depositPercent.addEventListener('change', function(){
      if(depositPercent.value !== ''){
        if(!isNumber(depositPercent.value) || depositPercent.value < 1 || depositPercent.value > 100){
          alert('Введите корректное значение в поле проценты');
          depositPercent.value = '0';
        }
      }
    });
  }

  depositHandler(){
    if(depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }

  getInfoDeposit() {
    if(this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }
  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', () => {
      incomePeriodValue.value = _this.calcSavedMoney();
    });
  }
  addExpencesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  getExpenses() {
    const _this = this;
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  getIncome() {
    const _this = this;
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        _this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if(item !== ''){
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome(){
    const _this = this;
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for(let key in this.expenses){
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(parseFloat(this.budgetMonth) / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() {
    if (this.budgetDay > 1200){
      return "У Вас высокий уровень дохода";
    } else if ((this.budgetDay > 600) && (this.budgetDay <= 1200)) {
      return "У Вас средний уровень дохода";
    } else if ((this.budgetDay > 0) && (this.budgetDay <= 600)) {
      return "У Вас низкий уровень дохода";
    } else {
      return "Что-то пошло не так";
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  reset(){
    salaryAmount.removeAttribute('disabled', '');
    salaryAmount.value = '';
    incomeTitle.forEach((item) => {
      item.removeAttribute('disabled', '');
      item.value = '';
    });
    incomeAmount.forEach((item) => {
      item.removeAttribute('disabled', '');
      item.value = '';
    });
    expensesTitle.forEach((item) => {
      item.removeAttribute('disabled', '');
      item.value = '';
    });
    expensesAmount.forEach((item) => {
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
    depositPercent.value = '';
    depositPercent.style.display = 'none';
    depositPercent.removeAttribute('disabled', '');
    depositBank.value = '';
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
}

const appData = new AppData();
