const billInput = document.querySelector('.bill');
const tips = document.querySelectorAll('input[type="radio"]')
const customInput = document.querySelector('.custom-input')
const numberOfPeople = document.querySelector('.people')
const error = document.querySelector('.error')
const resetBtn = document.querySelector('.reset-btn')
const tipAmountPerson = document.querySelector('.tip-amount-person')
const tipAmountTotal = document.querySelector('.tip-amount-total');

let info = {
  billAmount:0,
  tipAmount:0,
  peopleAmount:0,
}

function updateResult() {
  const { billAmount, peopleAmount, tipAmount } = info;

  if (billAmount && tipAmount && peopleAmount) {
    const totalTipAmount = calculateTip(billAmount, tipAmount)
    const tipPerPerson = totalTipAmount / peopleAmount

    tipAmountTotal.textContent = `${formatNumber(totalTipAmount)}`
    tipAmountPerson.textContent = `${formatNumber(tipPerPerson)}`
  }

}

// helper functions
function calculateTip(bill, tip) {
  const decimalPercent = tip / 100;
  const tipAmount = bill * decimalPercent;
  return  tipAmount
}

function formatNumber(num) {
  const formatedNumber = new Intl.NumberFormat('en-US', {
    style:'currency',
    currency:'USD'
  })
  return formatedNumber.format(num)
}

// EVENTS
billInput.addEventListener('input',(e) => {
  const amount = Number(e.target.value);

  if (amount <= 0) {
    e.target.value = '';
  }

  if (amount > 0) {
    info.billAmount = amount;
    updateResult();
  }
})

numberOfPeople.addEventListener('input', (e) => {
  const amount = Number(e.target.value);

  if (amount < 0 ) {
    e.target.value = ''
  }

  if (!amount) {
    numberOfPeople.classList.add('error')
    error.textContent = "can't be zero"
  }

  if (amount) {
    numberOfPeople.classList.remove('error');
    error.textContent = ""
    info.peopleAmount = amount;
    updateResult()
  }
})

customInput.addEventListener('input', (e) => {
  const amount = Number(e.target.value);
  if (amount > 0) {
    tips.forEach(t => t.parentElement.classList.remove('active')) 
    info.tipAmount = amount
  }
})

tips.forEach(tip => {
  tip.addEventListener('input', (e) => {

    tips.forEach(t => t.parentElement.classList.remove('active'))

    if (e.target.checked && !customInput.value) {
      info.tipAmount = Number(e.target.value)
      e.target.parentElement.classList.add('active')
      updateResult();
    }
  })
})

// RESET
resetBtn.addEventListener('click', () => {
  info.billAmount = 0;
  info.peopleAmount = 0;
  info.tipAmount = 0
  billInput.value = 0;
  tips.forEach(t => t.checked === false);
  numberOfPeople.value = 0;
  customInput.value = '';
  tipAmountPerson.textContent = 0;
  tipAmountTotal.textContent = 0
})