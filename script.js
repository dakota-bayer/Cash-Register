// DO NOT EDIT BELOW THIS LINE
let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
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

  const cidDuplicate = cid.map((x) => [...x]); // Deep copy of cash-in-drawer (cid) array to either commit or rollback changes for insufficient funds in drawer
  const transactionArray = cid.map((x) => [x[0], 0]); // Array to keep track of change given to customer

  let remainingChange = totalChange;
  while (remainingChange > 0) {
    const withdrawn = getLargestAvailableBill(remainingChange, cidDuplicate);

    if (isNaN(withdrawn)) {
      changeDueOutput.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    }

    const removalIndex = getCidIndexFromAmount(withdrawn);
    cidDuplicate[removalIndex][1] = parseFloat(
      (cidDuplicate[removalIndex][1] - withdrawn).toFixed(2)
    );
    transactionArray[removalIndex][1] = parseFloat(
      (transactionArray[removalIndex][1] + withdrawn).toFixed(2)
    );
    remainingChange = parseFloat((remainingChange - withdrawn).toFixed(2));
  }

  cid = cidDuplicate;

  let status = "Status: CLOSED";
  if (cid.find((x) => x[1] > 0)) {
    status = "Status: OPEN";
  }

  const filteredChange = transactionArray.filter((x) => x[1] > 0).reverse();
  changeDueOutput.textContent = status + getTransactionString(filteredChange);
});

const getTransactionString = (arr) => {
  let str = "";
  arr.forEach((x) => (str += ` ${x[0]}: $${x[1]}`));
  return str;
};

const getLargestAvailableBill = (changeDue, cashInDrawerArray) => {
  const bills = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  return bills.find(
    (bill) => isBillAvailable(bill, cashInDrawerArray) && changeDue >= bill
  );
};

const isBillAvailable = (amount, cashInDrawerArray) => {
  const index = getCidIndexFromAmount(amount);
  return cashInDrawerArray[index][1] >= amount;
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
