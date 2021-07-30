let money = 100000, 
income = '60000', 
addExpenses = '600, 3000, 5000',
deposit = true,
mission = 1000000, 
period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = parseFloat(income) / 30;
console.log(budgetDay);