document.getElementById('check-btn').addEventListener('click', function () {
    const input = document.getElementById('text-input').value;
    const resultElement = document.getElementById('result');

    if (input === '') {
        alert('Please input a value');
        return;
    }

    const sanitizedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedInput = sanitizedInput.split('').reverse().join('');

    if (sanitizedInput === reversedInput) {
        resultElement.textContent = `${input} is a palindrome`;
    } else {
        resultElement.textContent = `${input} is not a palindrome`;
    }
});
