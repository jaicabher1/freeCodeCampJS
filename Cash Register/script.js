let price = 19.5; // Cambia esto para probar diferentes precios
let cid = [
    ["PENNY", 0.5], // Monedas de un centavo con 0.5 dólares disponibles
    ["NICKEL", 0], // Monedas de cinco centavos sin dólares disponibles
    ["DIME", 0], // Monedas de diez centavos sin dólares disponibles
    ["QUARTER", 0], // Monedas de veinticinco centavos sin dólares disponibles
    ["ONE", 0], // Billetes de un dólar sin dólares disponibles
    ["FIVE", 0], // Billetes de cinco dólares sin dólares disponibles
    ["TEN", 0], // Billetes de diez dólares sin dólares disponibles
    ["TWENTY", 0], // Billetes de veinte dólares sin dólares disponibles
    ["ONE HUNDRED", 0] // Billetes de cien dólares sin dólares disponibles
];

const cash = document.getElementById("cash"); // Obtener el elemento de entrada de efectivo del cliente
const changeMessage = document.getElementById("change-due"); // Obtener el elemento para mostrar el mensaje de cambio
const purchaseBtn = document.getElementById("purchase-btn"); // Obtener el botón de compra

const currencyUnits = [
    ["PENNY", 0.01], // Unidad de moneda: centavo y su valor
    ["NICKEL", 0.05], // Unidad de moneda: níquel y su valor
    ["DIME", 0.1], // Unidad de moneda: diez centavos y su valor
    ["QUARTER", 0.25], // Unidad de moneda: veinticinco centavos y su valor
    ["ONE", 1], // Unidad de moneda: un dólar y su valor
    ["FIVE", 5], // Unidad de moneda: cinco dólares y su valor
    ["TEN", 10], // Unidad de moneda: diez dólares y su valor
    ["TWENTY", 20], // Unidad de moneda: veinte dólares y su valor
    ["ONE HUNDRED", 100] // Unidad de moneda: cien dólares y su valor
];

purchaseBtn.addEventListener("click", () => { // Agregar un evento al botón de compra
    const cashValue = parseFloat(cash.value); // Obtener el valor del efectivo ingresado por el cliente y convertirlo a número
    const changeDue = (cashValue - price).toFixed(2); // Calcular el cambio debido

    if (cashValue < price) { // Si el efectivo es menor que el precio
        alert("Customer does not have enough money to purchase the item"); // Mostrar alerta de que el cliente no tiene suficiente dinero
        return; // Salir de la función
    }

    if (cashValue === price) { // Si el efectivo es igual al precio
        changeMessage.innerText = "No change due - customer paid with exact cash"; // Mostrar mensaje de que no se debe cambio
        return; // Salir de la función
    }

    const changeResult = getChange(parseFloat(changeDue), cid); // Llamar a la función getChange para obtener el cambio debido

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") { // Si no hay suficiente dinero o la caja está cerrada
        changeMessage.innerText = `Status: ${changeResult.status} ${formatChange(changeResult.change)}`; // Mostrar el estado y el cambio
    } else {
        changeMessage.innerText = `Status: OPEN ${formatChange(changeResult.change)}`; // Mostrar que la caja está abierta y el cambio
    }
});

const getChange = (changeDue, cid) => { // Función para calcular el cambio
    let totalCID = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2)); // Calcular el total del dinero en la caja

    if (totalCID < changeDue) { // Si el total del dinero es menor que el cambio debido
        return { status: "INSUFFICIENT_FUNDS", change: [] }; // Retornar estado de fondos insuficientes
    }

    let changeArray = []; // Arreglo para almacenar el cambio
    let remainingChange = changeDue; // Cambio restante

    for (let i = currencyUnits.length - 1; i >= 0; i--) { // Iterar sobre las unidades de moneda desde la mayor a la menor
        let unit = currencyUnits[i][0]; // Obtener el nombre de la unidad de moneda
        let unitValue = currencyUnits[i][1]; // Obtener el valor de la unidad de moneda
        let unitInDrawer = cid[i][1]; // Obtener la cantidad de esa unidad en la caja

        if (remainingChange >= unitValue && unitInDrawer > 0) { // Si el cambio restante es mayor o igual al valor de la unidad y hay unidades en la caja
            let amountFromUnit = 0; // Inicializar la cantidad de esa unidad que se usará
            while (remainingChange >= unitValue && unitInDrawer > 0) { // Mientras el cambio restante sea mayor o igual al valor de la unidad y haya unidades en la caja
                remainingChange = (remainingChange - unitValue).toFixed(2); // Restar el valor de la unidad al cambio restante
                unitInDrawer -= unitValue; // Restar una unidad de la caja
                amountFromUnit += unitValue; // Añadir el valor de la unidad a la cantidad de esa unidad que se usará
            }
            if (amountFromUnit > 0) { // Si se usó alguna cantidad de esa unidad
                changeArray.push([unit, amountFromUnit]); // Añadir la unidad y la cantidad usada al arreglo de cambio
            }
        }
    }

    if (remainingChange > 0) { // Si aún queda cambio por devolver
        return { status: "INSUFFICIENT_FUNDS", change: [] }; // Retornar estado de fondos insuficientes
    }

    if (totalCID === changeDue) { // Si el total del dinero en la caja es igual al cambio debido
        return { status: "CLOSED", change: cid }; // Retornar estado de caja cerrada con todo el dinero de la caja
    }

    return { status: "OPEN", change: changeArray }; // Retornar estado de caja abierta con el cambio calculado
};

const formatChange = changeArray => // Función para formatear el cambio
    changeArray
        .filter(([unit, amount]) => amount > 0) // Filtrar unidades con cantidad mayor a 0
        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`) // Formatear las unidades y sus cantidades
        .join(" "); // Unir todo en un solo string
