const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".tip-percent");
const peopleInput = document.getElementById("people-number");
const resetButton = document.querySelector("button.reset");
const billError = document.getElementById("bill-error-message");
const tipError = document.getElementById("tip-error-message");
const peopleError = document.getElementById("people-number-error-message");

const totalResult = document.getElementById("total-result");
const tipAmountResult = document.getElementById("tip-amount-result");

const inputFields = {
  bill: 0,
  tip: 0,
  people: 0,
};

function reset() {
  // reset input fields
  for (let key in inputFields) {
    inputFields[key] = 0;
  }

  // reset active status
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
  resetButton.classList.remove("active");

  // reset input values
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";

  // reset text contents
  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";

  // reset errors
  billInput.classList.remove("error");
  customTipInput.classList.remove("error");
  peopleInput.classList.remove("error");

  // reset result
  totalResult.textContent = "$0.0";
  tipAmountResult.textContent = "$0.0";
}

billInput.addEventListener("input", () => {
  const billValue = Number(billInput.value);
  if (billValue < 0) {
    billError.textContent = "Can't be negative";
    billInput.classList.add("error");
    return;
  }
  billInput.classList.remove("error");
  inputFields.bill = parseFloat(billInput.value);
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
    customTipInput.value = "";
    inputFields.tip = parseFloat(button.value);
    calculateTip();
  });
});

customTipInput.addEventListener("input", () => {
  const tipValue = Number(customTipInput.value);

  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  if (tipValue < 0) {
    tipError.textContent = "Can't be negative";
    customTipInput.classList.add("error");
    return;
  }

  if (tipValue > 100) {
    tipError.textContent = "Can't be greater than 100";
    customTipInput.classList.add("error");
    return;
  }

  customTipInput.classList.remove("error");
  tipError.textContent = "";
  inputFields.tip = tipValue;
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  const peopleValue = Number(peopleInput.value);
  if (peopleValue < 0) {
    peopleError.textContent = "Can't be negative";
    peopleInput.classList.add("error");
    return;
  }

  if (peopleValue === 0) {
    peopleError.textContent = "Can't be zero";
    peopleInput.classList.add("error");
    return;
  }

  if (!Number.isInteger(peopleValue)) {
    peopleError.textContent = "Must be a whole number";
    peopleInput.classList.add("error");
    return;
  }
  peopleInput.classList.remove("error");
  peopleError.textContent = "";
  inputFields.people = peopleValue;
  calculateTip();
});

resetButton.addEventListener("click", reset);

function updateResult(result) {
  tipAmountResult.textContent = result.tipPerPerson;
  totalResult.textContent = result.totalPerPerson;
}

function calculateTip() {
  if (inputFields.people === 0) {
    return;
  }
  resetButton.classList.add("active");
  const tipAmount = inputFields.bill * (inputFields.tip / 100);
  const totalAmount = inputFields.bill + tipAmount;
  const tipPerPerson = tipAmount / inputFields.people;
  const totalPerPerson = totalAmount / inputFields.people;
  const result = {
    tipPerPerson: "$" + tipPerPerson.toFixed(2),
    totalPerPerson: "$" + totalPerPerson.toFixed(2),
  };
  updateResult(result);
}
