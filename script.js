// DO NOT EDIT BELOW THIS LINE
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
// DO NOT EDIT ABOVE THIS LINE

const cashInput = document.getElementById('cash');
const changeDueOutput = document.getElementById('change-due');
const purchaseButton = document.getElementById('purchase-btn');

let cash = 0;

purchaseButton.addEventListener('click', () => { 
    // Validate 
    const cash = parseFloat(cashInput.value);
    if(!cashInput.value || isNaN(cash) || cash < price){
        window.alert("Customer does not have enough money to purchase the item");
        return;
    }

    // Calculate change needed
    const totalChange = cash - price;
    if(totalChange === 0){
        changeDueOutput.textContent = "No change due - customer paid with exact cash";
        return;
    }

    // Calculate what bills/coins to use and subtract those from the cid array
    // need a way to check if its possible, then either commit or rollback the transaction
    const cidCopy = cid.slice();
    const changeNeeded = totalChange;
    for(let i = cid.length - 1; i >= 0; i--){
        if(changeNeeded - 100 >= 0){
            // Add a 100 to the change
        }
    }

    changeDueOutput.textContent = cash;
    console.log(cash);
});

