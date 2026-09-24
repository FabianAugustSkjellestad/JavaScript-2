export function isValidName(name) {
    const trimmed = name.trim();
    const regex = /^[A-Za-z0-9_]{3,15}$/; // Alphanumeric and underscores, 3-15 characters

    if (!regex.test(trimmed)) {
        return {
            valid: false,
            message: "Name must be 3-15 characters long and can only contain letters, numbers, and underscores."
        };
    }

    return { valid: true, message: "" };
}

/**
 * This function checks if the email is valid and ends with "@stud.noroff.no".
 * @param {string} email - The email to validate.
 * @returns {{valid: boolean, message: string}} - An object containing the validation result and an error message if invalid.
 */
export function isValidEmail(email) {
    const trimmed = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check.

    if (!regex.test(trimmed)) {
        return {
            valid: false,
            message: "Email must be a valid email address."
        };
    }

    if (!trimmed.toLowerCase().endsWith("@stud.noroff.no")) {
        return {
            valid: false,
            message: "Email must end with '@stud.noroff.no'."
        };
    }

    return { valid: true, message: "" };
}

/**
 * This function checks if the password is valid.
 * @param {string} password - The password to validate.
 * @returns {{valid: boolean, message: string}} - An object containing the validation result and an error message if invalid.
 */
export function isValidPassword(password) {
    const trimmed = password.trim();

    if (trimmed.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long."
        };
    }

    return { valid: true, message: "" };
}