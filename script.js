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
    const totalChange = parseFloat((cash - price).toFixed(2));
    if(totalChange === 0){
        changeDueOutput.textContent = "No change due - customer paid with exact cash";
        return;
        
    }

    // Calculate what bills/coins to use and subtract those from the cid array
    // need a way to check if its possible, then either commit or rollback the transaction
    const cidDuplicate = cid.slice();
    const transactionArray = cid.slice().map(x => x[1] = 0);
    console.log(`change needed is ${totalChange}`);
    let changeNeeded = totalChange;
    while(changeNeeded > 0){
        const withdrawn = getLargestAvailableBill(changeNeeded, cidDuplicate);
        if(withdrawn < 0){
            changeDueOutput.textContent = "Status: INSUFFICIENT_FUNDS";
            return;
        }

        const removalIndex = getCidIndexFromAmount(withdrawn);
        cidDuplicate[removalIndex][1] -= withdrawn;
        transactionArray[removalIndex][1] = withdrawn;
        changeNeeded = parseFloat((changeNeeded - withdrawn).toFixed(2));
    }

    cid = cidDuplicate;
    console.log(transactionArray);
    changeDueOutput.textContent = "Status: OPEN";
    console.log(`Transaction complete. CID = ${cid}`);
});

const getLargestAvailableBill = (amount, cashInDrawerArray) => {
    console.log(`Entered getLargestAvailableBill(${amount}, ${cashInDrawerArray})`)
    if(cashInDrawerArray[8][1] >= 100 && amount >= 100 ){
        return 100;
    }
    else if(cashInDrawerArray[7][1] >= 20 && amount >= 20 ){
        return 20;
    }
    else if(cashInDrawerArray[6][1] >= 10 && amount >= 10 ){
        return 10;
    }
    else if(cashInDrawerArray[5][1] >= 5 && amount >= 5 ){
        return 5;
    }
    else if(cashInDrawerArray[4][1] >= 1 && amount >= 1 ){
        return 1;
    }
    else if(cashInDrawerArray[3][1] >= 0.25 && amount >= 0.25 ){
        return 0.25;
    }
    else if(cashInDrawerArray[2][1] >= 0.10 && amount >= 0.10 ){
        return 0.10;
    }
    else if(cashInDrawerArray[1][1] >= 0.05 && amount >= 0.05 ){
        return 0.05;
    }
    else if(cashInDrawerArray[0][1] >= 0.01 && amount >= 0.01 ){
        return 0.01;
    }
    else{
        return -1;
    }
};

const getCidIndexFromAmount = amount => {
    if(amount === 100){
        return 8;
    }
    else if(amount === 20){
        return 7;
    }
    else if(amount === 10){
        return 6;
    }
    else if(amount === 5){
        return 5;
    }
    else if(amount === 1){
        return 4;
    }
    else if(amount === 0.25){
        return 3;
    }
    else if(amount === 0.1){
        return 2;
    }
    else if(amount === 0.05){
        return 1;
    }
    else if(amount === 0.01){
        return 0;
    }
    else{
        return -1;
    }
}
