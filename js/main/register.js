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