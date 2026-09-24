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
