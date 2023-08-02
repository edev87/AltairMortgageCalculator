const validateInput = () => {

  let loanAmount = parseInt(document.getElementById('loan-amount').value);
  let months = parseInt(document.getElementById('term-months').value);
  let interestRate = parseInt(document.getElementById('interest-rate').value) / 100;

  switch(true){
    case loanAmount < 0 || loanAmount == 0 || '':
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The loan amount must be greater than 0!'
      })
      break;
      case months < 1 || months > 100 || '':
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The term for the mortgage must be greater than 1 and less than 100!'
        })
        break;
        case interestRate > 1 || '':
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The interest rate must be greater than 0!'
          })
          break;


  }
  // if (loanAmount < 0 || loanAmount == 0 || '') {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'The loan amount must be greater than 0!'
  //   })
  // } else if (months < 1 || months > 100 || '') {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'The term for the mortgage mus tbe greater 1 and less than 100!'
  //   })
  // }
  // else if (interestRate < 1 || ' ') {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'The interest rate must be greater than 0!'
  //   })
  // }
  // else {
 return   calculateLoan(loanAmount, months, interestRate);
 // }

}

const calculateLoan = (loanAmount, months, interestRate) => {
  let totalMonthlyPayment = 0;
  let previousRemainingBalance = 0;
  let interestPayment = 0;
  let principalPayment = 0;
  let remainingBalance = 0;

 // totalMonthlyPayment = (parseFloat(Math.abs((loanAmount) * (interestRate / 1200) / (1 - (1 + interestRate / 1200) * (Math.pow(1, -months))))));

// totalMonthlyPayment = (parseFloat(Math.abs(totalMonthlyPayment)).toFixed(2));
//    previousRemainingBalance = loanAmount;

 totalMonthlyPayment = (loanAmount) * (interestRate / 1200) /
(1 - (1 + interestRate / 1200) * (Math.pow(1, -months)));

   interestPayment = loanAmount * (interestRate / 1200);

  principalPayment = 0;
  principalPayment = totalMonthlyPayment - interestPayment;

  remainingBalance = 0;
 // remainingBalance = previousRemainingBalance - principalPayment;

  let mortgagePaymentData = [];
  let pRB = new Array(1);

  for (let i = 1; 1 <= 12; i++) {

   let totalMonthlyPayment = (loanAmount) * (interestRate / 1200) /
      (1 - (1 + interestRate / 1200) * (Math.pow(1, -months)));

    totalMonthlyPayment = (parseFloat(Math.abs(totalMonthlyPayment)).toFixed(2));
    totalMonthlyPayment = parseFloat(totalMonthlyPayment);
    console.log(totalMonthlyPayment);
   previousRemainingBalance = loanAmount;

    if (i == 1) {
       remainingBalance = loanAmount - principalPayment;
      pRB.push(remainingBalance);
    }
    else if (i >= 2) {
      previousRemainingBalance = pRB[0];
      remainingBalance = previousRemainingBalance - principalPayment;
      pRB.push(remainingBalance);

    }
    //  let remainingBalance = loanAmount - principalPayment;
    //  pRB.push(remainingBalance);

    let interestPayment = loanAmount * (interestRate / 1200);

    let principalPayment = totalMonthlyPayment - interestPayment;

    mortgagePaymentData.push({
      i: i,
      "totalMonthlyPayment": totalMonthlyPayment,
      "interestPayment": interestPayment,
      "principalPayment": principalPayment,
      "remainingBalance": remainingBalance
    })

  }

  console.log(JSON.stringify(mortgagePaymentData));
}