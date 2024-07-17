// Añade un evento de clic al botón con id 'convert-btn'
document.getElementById('convert-btn').addEventListener('click', function () {
    // Obtiene el valor del campo de entrada con id 'number'
    const number = document.getElementById('number').value;
    // Obtiene el elemento donde se mostrará el resultado
    const outputElement = document.getElementById('output');

    // Si el campo de entrada está vacío, muestra un mensaje de error y termina la ejecución
    if (number === '') {
        outputElement.textContent = 'Please enter a valid number'; // Muestra un mensaje de error
        return; // Salir de la función
    }

    // Convierte el valor de entrada a un número entero
    const num = parseInt(number, 10);

    // Si el número es menor que 1, muestra un mensaje de error y termina la ejecución
    if (num < 1) {
        outputElement.textContent = 'Please enter a number greater than or equal to 1'; // Muestra un mensaje de error
        return; // Salir de la función
    }

    // Si el número es mayor o igual a 4000, muestra un mensaje de error y termina la ejecución
    if (num >= 4000) {
        outputElement.textContent = 'Please enter a number less than or equal to 3999'; // Muestra un mensaje de error
        return; // Salir de la función
    }

    // Convierte el número a un número romano
    const romanNumeral = convertToRoman(num);
    // Muestra el número romano en el elemento de salida
    outputElement.textContent = romanNumeral;
});

// Función para convertir un número a su representación en números romanos
function convertToRoman(num) {
    // Array de objetos que contienen los valores y símbolos romanos
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = ''; // Variable para almacenar el resultado

    // Itera sobre los valores y símbolos romanos
    for (const { value, numeral } of romanNumerals) {
        // Mientras el número sea mayor o igual al valor romano actual
        while (num >= value) {
            result += numeral; // Añade el símbolo romano al resultado
            num -= value; // Resta el valor romano del número
        }
    }

    return result; // Retorna el resultado en números romanos
}
