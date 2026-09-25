// import 
import { isValidEmail, isValidPassword, isValidName } from '../utils/validation.js';
import { registerUser } from '../api/auth.js';

// DOM references
const form = document.getElementById('registerForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');


// Live validation for name input, email input, and password input
nameInput.addEventListener('blur', () => {
    const result = isValidName(nameInput.value);
    nameError.textContent = result.message;
});

emailInput.addEventListener('blur', () => {
    const result = isValidEmail(emailInput.value);
    emailError.textContent = result.message;
});

passwordInput.addEventListener('blur', () => {
    const result = isValidPassword(passwordInput.value);
    passwordError.textContent = result.message;
});

// Submit event listener for the registration form
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    const nameCheck = isValidName(nameInput.value);
    const emailCheck = isValidEmail(emailInput.value);
    const passwordCheck = isValidPassword(passwordInput.value);

    // Show error messages if validation fails
    nameError.textContent = nameCheck.message;
    emailError.textContent = emailCheck.message;
    passwordError.textContent = passwordCheck.message;

    if (!nameCheck.valid || !emailCheck.valid || !passwordCheck.valid) {
        return; // Stop before making the API call if validation fails
    }

    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    };

    try {
        await registerUser(userData);
        // Redirect to login page after successful registration
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'index.html';
    } catch (error) {
        // Handle registration error (e.g., user already exists)
        alert(`Registration failed: ${error.message}`);
    }
});
