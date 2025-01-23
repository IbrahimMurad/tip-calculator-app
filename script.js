// Get references to DOM elements
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

// Object to store input values
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

// Event listener for bill input to check the input value whenever it changes
billInput.addEventListener("input", () => {
  // covert from string to number
  const billValue = Number(billInput.value);

  // handle negaitve values
  if (billValue < 0) {
    billError.textContent = "Can't be negative";
    billInput.classList.add("error");
    return;
  }

  // save the value in the inputFields object
  billInput.classList.remove("error");
  inputFields.bill = parseFloat(billInput.value);

  // calculate tip if all inputs are valid
  calculateTip();
});

// Event listeners for tip inputs [type="button"]
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // deactivate other tip buttons
    tipButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
    customTipInput.value = "";

    // save the value in the inputFields object
    inputFields.tip = parseFloat(button.value);

    // calculate tip if all inputs are valid
    calculateTip();
  });
});

// Event listener for custom tip input to check the input value whenever it changes
customTipInput.addEventListener("input", () => {
  const tipValue = Number(customTipInput.value);

  // deactivate other tip buttons
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // handle invalid values
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

  // ensure there are no error messages
  customTipInput.classList.remove("error");
  tipError.textContent = "";

  // save the value in the inputFields object
  inputFields.tip = tipValue;

  // calculate tip if all inputs are valid
  calculateTip();
});

// Event listener for number of people input
peopleInput.addEventListener("input", () => {
  const peopleValue = Number(peopleInput.value);

  // handle invalid values
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

  // ensure there are no error messages
  peopleInput.classList.remove("error");
  peopleError.textContent = "";

  // save the value in the inputFields object
  inputFields.people = peopleValue;

  // calculate tip if all inputs are valid
  calculateTip();
});

// Event listener for reset button
resetButton.addEventListener("click", reset);

// Function to update the result display
function updateResult(result) {
  tipAmountResult.textContent = result.tipPerPerson;
  totalResult.textContent = result.totalPerPerson;
}

// Function to calculate the tip and total amounts
function calculateTip() {
  // check if all inputs are valid
  if (inputFields.people === 0) {
    return;
  }

  // activate the reset button
  resetButton.classList.add("active");

  // calculate
  const tipAmount = inputFields.bill * (inputFields.tip / 100);
  const totalAmount = inputFields.bill + tipAmount;
  const tipPerPerson = tipAmount / inputFields.people;
  const totalPerPerson = totalAmount / inputFields.people;

  // store the calculated values in the currency format
  const result = {
    tipPerPerson: "$" + tipPerPerson.toFixed(2),
    totalPerPerson: "$" + totalPerPerson.toFixed(2),
  };

  // update the result display
  updateResult(result);
}
