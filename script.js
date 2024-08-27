// DO NOT EDIT BELOW THIS LINE
let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];
// DO NOT EDIT ABOVE THIS LINE

const cashInput = document.getElementById("cash");
const changeDueOutput = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");

let cash = 0;

purchaseButton.addEventListener("click", () => {
  // Validate
  const cash = parseFloat(cashInput.value);
  if (!cashInput.value || isNaN(cash) || cash < price) {
    window.alert("Customer does not have enough money to purchase the item");
    return;
  }

  // Calculate change needed
  const totalChange = parseFloat((cash - price).toFixed(2));
  if (totalChange === 0) {
    changeDueOutput.textContent =
      "No change due - customer paid with exact cash";
    return;
  }

  // Calculate what bills/coins to use and subtract those from the cid array
  const cidDuplicate = cid.map((x) => [...x]); // Creates a deep copy of cid to either commit or rollback the transaction
  const transactionArray = cid.map((x) => [x[0], 0]); // Creates a new array with sub-arrays having the second element set to 0

  let changeNeeded = totalChange;
  while (changeNeeded > 0) {
    if(changeNeeded < 0.02){
        console.log('test');
    }
    const withdrawn = getLargestAvailableBill(changeNeeded, cidDuplicate);
    if (withdrawn < 0) {
      changeDueOutput.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    }

    const removalIndex = getCidIndexFromAmount(withdrawn);
    cidDuplicate[removalIndex][1] = parseFloat((cidDuplicate[removalIndex][1] - withdrawn).toFixed(2));
    transactionArray[removalIndex][1] = parseFloat((transactionArray[removalIndex][1] + withdrawn).toFixed(2))
    changeNeeded = parseFloat((changeNeeded - withdrawn).toFixed(2));
  }

  cid = cidDuplicate;

  let status = "Status: CLOSED";
  if (cid.find((x) => x[1] > 0)) {
    status = "Status: OPEN";
  }

  const filtered = transactionArray.filter((x) => x[1] > 0).reverse();
  changeDueOutput.textContent = status + getTransactionString(filtered);
});

const getTransactionString = (arr) => {
  let str = "";
  arr.forEach((x) => (str += ` ${x[0]}: $${x[1]}`));
  return str;
};

const getLargestAvailableBill = (amount, cashInDrawerArray) => {
  if (cashInDrawerArray[8][1] >= 100 && amount >= 100) {
    return 100;
  } else if (cashInDrawerArray[7][1] >= 20 && amount >= 20) {
    return 20;
  } else if (cashInDrawerArray[6][1] >= 10 && amount >= 10) {
    return 10;
  } else if (cashInDrawerArray[5][1] >= 5 && amount >= 5) {
    return 5;
  } else if (cashInDrawerArray[4][1] >= 1 && amount >= 1) {
    return 1;
  } else if (cashInDrawerArray[3][1] >= 0.25 && amount >= 0.25) {
    return 0.25;
  } else if (cashInDrawerArray[2][1] >= 0.1 && amount >= 0.1) {
    return 0.1;
  } else if (cashInDrawerArray[1][1] >= 0.05 && amount >= 0.05) {
    return 0.05;
  } else if (cashInDrawerArray[0][1] >= 0.01 && amount >= 0.01) {
    return 0.01;
  } else {
    return -1;
  }
};

const getCidIndexFromAmount = (amount) => {
  if (amount === 100) {
    return 8;
  } else if (amount === 20) {
    return 7;
  } else if (amount === 10) {
    return 6;
  } else if (amount === 5) {
    return 5;
  } else if (amount === 1) {
    return 4;
  } else if (amount === 0.25) {
    return 3;
  } else if (amount === 0.1) {
    return 2;
  } else if (amount === 0.05) {
    return 1;
  } else if (amount === 0.01) {
    return 0;
  } else {
    return -1;
  }
};