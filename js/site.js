//get numbers for the loan out of inputs
const getValues = () => {
  //get each of the values from the inputs on the page
  let loanAmount = document.getElementById('loan-amount').value;
  let loanLength = document.getElementById('term').value;
  let loanInterest = document.getElementById('interest-rate').value;

  loanAmount = parseFloat(loanAmount);
  loanLength = parseInt(loanLength);
  loanInterest = parseFloat(loanInterest);

  //make sure those values make sense
  if (isNaN(loanAmount) || isNaN(loanLength) || isNaN(loanInterest)
    || loanAmount <= 0 || loanLength <= 0 || loanInterest <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Woops!',
      text: 'Please enter valid loan details.'
    })
  } else {
    let loanTotals = caluclateTotals(loanAmount, loanLength, loanInterest);
    displayTotals(loanTotals.monthlyPayment, loanAmount, loanTotals.totalInterest, loanTotals.totalCost);

    let payments = calculatePayments(loanLength, loanTotals.monthlyPayment, loanAmount, loanInterest);

    displayPayments(payments);

  }

}

//calculate the totals for the loan
const caluclateTotals = (principal, term, rate) => {
  //calculate the monthly
  let monthlyPayment = (principal * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -term));
  //calulcate the total cost
  let totalCost = monthlyPayment * term;
  //calculate the total interest
  let totalInterest = totalCost - principal;

  let loanTotals = {
    monthlyPayment: monthlyPayment,
    totalCost: totalCost,
    totalInterest: totalInterest
  }
  return loanTotals;



}

//display the totals for the loan
const displayTotals = (monthlyPayment, principal, interest, cost) => {
  let formatOptions = {
    style: 'currency',
    currency: 'USD'
  }
  document.getElementById("amount").innerHTML = monthlyPayment.toLocaleString('en-US', formatOptions);
  document.getElementById("total-principal-amount").innerHTML = principal.toLocaleString('en-US', formatOptions);;
  document.getElementById("total-interest-amount").innerHTML = interest.toLocaleString('en-US', formatOptions);;
  document.getElementById("total-cost-amount").innerHTML = cost.toLocaleString('en-US', formatOptions);;

}

//calculate each month of payments in the table
const calculatePayments = (term, monthlyPayment, principal, rate) => {
  // create a for loop to calculate every month of payments

  let remainingBalance = principal;
  let totalInterest = 0;
  let paymentsArray = [];

  for (let month = 1; month <= term; month++) {

    let interestPayment = remainingBalance * (rate / 1200);

    let principalPayment = monthlyPayment - interestPayment;

    totalInterest += interestPayment;

    remainingBalance -= principalPayment;

    // -- create an object to store those values

    let loanPayment = {
      month: month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      totalInterest: totalInterest,
      balance: remainingBalance

    }
    // -- put that object in an array
    paymentsArray.push(loanPayment);

  }

  // return the array

  return paymentsArray;

}

//display each month of payments in the table
const displayPayments = (payments) => {

  const tableRowTemplate = document.getElementById('payment-row');
  const paymentsTable = document.getElementById('mortgage-table');
  paymentsTable.innerHTML = '';

  let formatOptions = {
    style: 'currency',
    currency: 'USD'
  }

  for (let i = 0; i < payments.length; i++) {

    let currentMonthPayment = payments[i];

    let tableRow = tableRowTemplate.content.cloneNode(true);

    let tableCell = tableRow.querySelectorAll('td'); //will return a array of td's
    tableCell[0].textContent = currentMonthPayment.month;
    tableCell[1].textContent = currentMonthPayment.payment.toLocaleString('en-US', formatOptions);
    tableCell[2].textContent = currentMonthPayment.principal.toLocaleString('en-US', formatOptions);
    tableCell[3].textContent = currentMonthPayment.interest.toLocaleString('en-US', formatOptions);
    tableCell[4].textContent = currentMonthPayment.totalInterest.toLocaleString('en-US', formatOptions);
    tableCell[5].textContent = currentMonthPayment.balance.toLocaleString('en-US', formatOptions);

    if (i == payments.length - 1) {
      tableRow.querySelector('tr').classList.add('table-success')
    }
    paymentsTable.appendChild(tableRow);

  }


}
