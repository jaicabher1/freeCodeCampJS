// script.js
document.getElementById('check-btn').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value.trim();
    const resultsDiv = document.getElementById('results-div');

    if (userInput === '') {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(userInput);
    resultsDiv.textContent = isValid ? `Valid US number: ${userInput}` : `Invalid US number: ${userInput}`;
});

document.getElementById('clear-btn').addEventListener('click', function () {
    document.getElementById('results-div').textContent = '';
    document.getElementById('user-input').value = '';
});

function validatePhoneNumber(phoneNumber) {
    // Remove all non-numeric characters except for parentheses and hyphens
    const cleaned = phoneNumber.replace(/[^\d()-\s]/g, '');

    // Regular expression patterns for valid US phone numbers
    const validPatterns = [
        /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,    // 1 (area code) xxx-xxxx
        /^1?\s?\d{3}-\d{3}-\d{4}$/,           // 1 xxx-xxx-xxxx
        /^1?\s?\d{3}\s\d{3}\s\d{4}$/,         // 1 xxx xxx xxxx
        /^1?\s?\d{10}$/                       // 1 xxxxxxxxxx
    ];

    return validPatterns.some(pattern => pattern.test(cleaned));
}
