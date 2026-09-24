const BASE_URL = 'https://v2.api.noroff.dev/social/profiles';
const API_KEY = "14bea214-b38d-4084-8ba8-4b906837e2ac";

function getHeaders() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found. Please log in first.');
    }

    return {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
    };
}

// Get profile
export async function getProfile(name) {
    const response = await fetch(`${BASE_URL}/${name}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch profile.`);
    }

    const data = await response.json();
    return data.data;
}

// Get users posts
export async function getProfilePosts(name) {
    const response = await fetch(`${BASE_URL}/${name}/posts`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch profile posts.`);
    }

    const data = await response.json();
    return data.data;
}

// Follow user
export async function followUser(name) {
    const response = await fetch(`${BASE_URL}/${name}/follow`, {
        method: 'PUT',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to follow user.`);
    }

    const data = await response.json();
    return data.data;
}

// Unfollow user
export async function unfollowUser(name) {
    const response = await fetch(`${BASE_URL}/${name}/unfollow`, {
        method: 'PUT',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to unfollow user.`);
    }

    const data = await response.json();
    return data.data;
}