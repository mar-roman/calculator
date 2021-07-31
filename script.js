let money = 90000,
income = 'фриланс', 
addExpenses = 'интернет, такси, коммуналка',
deposit = true,
mission = 1000000, 
period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = parseFloat(money) / 30;
console.log(budgetDay);