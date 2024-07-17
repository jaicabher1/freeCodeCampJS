let price = 19.5; // Change this for testing different prices
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

const cash = document.getElementById("cash");
const changeMessage = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
];

purchaseBtn.addEventListener("click", () => {
    const cashValue = parseFloat(cash.value);
    const changeDue = (cashValue - price).toFixed(2);

    if (cashValue < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cashValue === price) {
        changeMessage.innerText = "No change due - customer paid with exact cash";
        return;
    }

    const changeResult = getChange(parseFloat(changeDue), cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
        changeMessage.innerText = `Status: ${changeResult.status} ${formatChange(changeResult.change)}`;
    } else {
        changeMessage.innerText = `Status: OPEN ${formatChange(changeResult.change)}`;
    }
});

const getChange = (changeDue, cid) => {
    let totalCID = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let changeArray = [];
    let remainingChange = changeDue;

    for (let i = currencyUnits.length - 1; i >= 0; i--) {
        let unit = currencyUnits[i][0];
        let unitValue = currencyUnits[i][1];
        let unitInDrawer = cid[i][1];

        if (remainingChange >= unitValue && unitInDrawer > 0) {
            let amountFromUnit = 0;
            while (remainingChange >= unitValue && unitInDrawer > 0) {
                remainingChange = (remainingChange - unitValue).toFixed(2);
                unitInDrawer -= unitValue;
                amountFromUnit += unitValue;
            }
            if (amountFromUnit > 0) {
                changeArray.push([unit, amountFromUnit]);
            }
        }
    }

    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (totalCID === changeDue) {
        return { status: "CLOSED", change: cid };
    }

    return { status: "OPEN", change: changeArray };
};

const formatChange = changeArray => 
    changeArray
        .filter(([unit, amount]) => amount > 0)
        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
        .join(" ");
