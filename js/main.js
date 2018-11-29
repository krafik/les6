'use strict';

// let btn = document.querySelector('#start'),
//   values = document.querySelectorAll('div[Class$="value"]'),
//   inputs = document.querySelectorAll('.expenses-item'),
//   btnCalc = document.querySelectorAll('.expenses-item-btn'),
//   btnConfirm = document.querySelectorAll('.count-budget-btn'),
//   inpOptExp = document.querySelectorAll('.optionalexpenses-item'),
//   chooseIncome = document.querySelector('.choose-income'),
//   chooseSum =  document.querySelector('.choose-sum'),
//   choosePrcent = document.querySelector('.choose-percent'),
//   yearValue = document.querySelector('.year-value'),
// monthValue = document.querySelector('.month-value'),
// dayValue = document.querySelector('.day-value');
let startbtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    divData = document.querySelector('.data');

let time, money;

expensesBtn.disabled = true;
expensesBtn.style.background = 'red';
optionalExpensesBtn.disabled = true;
optionalExpensesBtn.style.background = 'red';
countBtn.disabled = true;
countBtn.style.background = 'red';

startbtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", '2018-11-15');
    money = +prompt("Ваш бюджет на месяц?", '');
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budjet = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    countBtn.disabled = false;
    countBtn.style.background = 'green';
});

divData.addEventListener('input', function () {
    for (let i = 0; i < expensesItem.length; i++) {
        // expensesItem = expensesItem[i];
        if (expensesItem[0].value != '' && expensesItem[1].value != '' &&
            expensesItem[2].value != '' && expensesItem[3].value != '') {
            expensesBtn.disabled = false;
            expensesBtn.style.background = 'green';
        }
    }
    // optionalExpensesItem
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        if (optionalExpensesItem[0].value != '' && optionalExpensesItem[1].value != '' &&
            optionalExpensesItem[2].value != '') {
            optionalExpensesBtn.disabled = false;
            optionalExpensesBtn.style.background = 'green';
        }
    }

});

let sum = 0;
expensesBtn.addEventListener('click', function () {
    
    for (let i = 0; i < expensesItem.length; i++) {
        let name = expensesItem[i].value,
            price = expensesItem[++i].value;

        //проверить не пустой и ответ. не null(при отмене) и не пустой ''.
        // не больше 50-ти символов. 
        if ((typeof (name)) === 'string' && (typeof (name)) != null &&
            (typeof (price)) != null && name != '' && price != '') {
            appData.expenses[name] = price;
            sum += +price;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {

    if (appData.budjet != undefined) {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let qst = optionalExpensesItem[i].value;

            if ((typeof (qst)) === 'string' && (typeof (qst)) != null && qst != '') {
                appData.optionalExpenses[i] = qst;
                optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            } else {
                i--;
            }
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }

});

countBtn.addEventListener('click', function () {
    appData.moneyPerDay = ((appData.budjet - sum) / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;
    console.log(expensesValue.value);

    if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = "высокий уровень достатка";
    } else {
        levelValue.textContent = "произошла ошибка";
    }
});

incomeItem.addEventListener('input', function () {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budjet: money, //бюджет
    timeData: time, //данные времени
    expenses: {}, //обязательные расходы
    optionalExpenses: {}, //необязательные расходы()
    income: [], //доп. доходом(массив)
    savings: false //свойство
};