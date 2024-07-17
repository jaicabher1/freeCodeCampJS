// Añade un evento de clic al botón con id 'check-btn'
document.getElementById('check-btn').addEventListener('click', function () {
    // Obtiene el valor del campo de entrada con id 'user-input' y elimina los espacios en blanco alrededor
    const userInput = document.getElementById('user-input').value.trim();
    // Obtiene el elemento donde se mostrará el resultado
    const resultsDiv = document.getElementById('results-div');

    // Si el campo de entrada está vacío, muestra una alerta y termina la ejecución
    if (userInput === '') {
        alert('Please provide a phone number'); // Muestra una alerta solicitando un número de teléfono
        return; // Salir de la función
    }

    // Valida el número de teléfono usando la función validatePhoneNumber
    const isValid = validatePhoneNumber(userInput);
    // Muestra el resultado de la validación
    resultsDiv.textContent = isValid ? `Valid US number: ${userInput}` : `Invalid US number: ${userInput}`;
});

// Añade un evento de clic al botón con id 'clear-btn'
document.getElementById('clear-btn').addEventListener('click', function () {
    // Limpia el contenido del div con id 'results-div'
    document.getElementById('results-div').textContent = '';
    // Limpia el valor del campo de entrada con id 'user-input'
    document.getElementById('user-input').value = '';
});

// Función para validar el número de teléfono
function validatePhoneNumber(phoneNumber) {
    // Elimina todos los caracteres no numéricos excepto paréntesis, guiones y espacios
    const cleaned = phoneNumber.replace(/[^\d()-\s]/g, '');

    // Patrones de expresiones regulares para números de teléfono válidos en EE.UU.
    const validPatterns = [
        /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,    // 1 (código de área) xxx-xxxx
        /^1?\s?\d{3}-\d{3}-\d{4}$/,          // 1 xxx-xxx-xxxx
        /^1?\s?\d{3}\s\d{3}\s\d{4}$/,        // 1 xxx xxx xxxx
        /^1?\s?\d{10}$/                      // 1 xxxxxxxxxx
    ];

    // Devuelve verdadero si el número coincide con alguno de los patrones válidos
    return validPatterns.some(pattern => pattern.test(cleaned));
}
