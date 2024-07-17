// Añade un evento de clic al botón con id 'check-btn'
document.getElementById('check-btn').addEventListener('click', function () {
    // Obtiene el valor del campo de entrada con id 'text-input'
    const input = document.getElementById('text-input').value;
    // Obtiene el elemento donde se mostrará el resultado
    const resultElement = document.getElementById('result');

    // Si el campo de entrada está vacío, muestra una alerta y termina la ejecución
    if (input === '') {
        alert('Please input a value'); // Muestra una alerta solicitando un valor
        return; // Salir de la función
    }

    // Convierte el valor de entrada a minúsculas y elimina caracteres que no sean letras o números
    const sanitizedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Invierte el valor de entrada sanitizado
    const reversedInput = sanitizedInput.split('').reverse().join('');

    // Compara la entrada sanitizada con su versión invertida
    if (sanitizedInput === reversedInput) {
        // Si son iguales, el valor original es un palíndromo
        resultElement.textContent = `${input} is a palindrome`;
    } else {
        // Si no son iguales, el valor original no es un palíndromo
        resultElement.textContent = `${input} is not a palindrome`;
    }
});
