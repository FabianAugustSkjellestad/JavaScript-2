import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { loginUser } from "../api/auth.js";

// DOM references
const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Live validation for email and password
emailInput.addEventListener("blur", () => {
    const result = isValidEmail(emailInput.value);
    emailError.textContent = result.message;
});

passwordInput.addEventListener("blur", () => {
    const result = isValidPassword(passwordInput.value);
    passwordError.textContent = result.message;
});