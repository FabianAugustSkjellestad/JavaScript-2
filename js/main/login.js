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

// Submit event handler
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validation
    const emailCheck = isValidEmail(emailInput.value);
    const passwordCheck = isValidPassword(passwordInput.value);

    // Display validation errors
    emailError.textContent = emailCheck.message;
    passwordError.textContent = passwordCheck.message;

    if (!emailCheck.valid || !passwordCheck.valid) {
        return; // Stop submission if validation fails
    }

    const credentials = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
    };

    try {
        const data = await loginUser(credentials);

        // Store the token and username in localStorage
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("username", data.data.name);

        alert("Login successful!");
        window.location.href = "feed.html"; // Redirect to feed page

    } catch (error) {
        alert("Login failed: " + error.message);
    }
});