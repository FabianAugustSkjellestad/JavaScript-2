// import 
import { isValidEmail, isValidPassword, isValidName } from '../utils/validation.js';
import { registerUser } from '../api/auth.js';

// DOM references
const form = document.getElementById('registerForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');