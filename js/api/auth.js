const BASE_URL = "https://v2.api.noroff.dev/auth";

// Function to register a new user
export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.[0]?.message || "Failed to register user, please try again."
        );
    }

    return data;
}

// Function to log in a user
export async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.[0]?.message || "Failed to log in, please check your credentials."
        );
    }

    return data;

}
