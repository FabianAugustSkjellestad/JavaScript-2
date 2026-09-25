import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { loginUser } from "../api/auth.js";

// DOM references
const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
