const BASE_URL = 'https://v2.api.noroff.dev/social/posts';
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

// Fetch all posts
/**
 * Fetches all posts from the API, including the author information for each post.
 * @async 
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws {Error} Throws an error if the fetch request fails or if the response is not ok.
 * 
 * @example
 * getAllPosts()
 *  .then(posts => console.log(posts))
 * .catch(error => console.error(error));
 */

export async function getAllPosts() {
    const response = await fetch(`${BASE_URL}?_author=true`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}

// Fetch a single post by ID
export async function getSinglePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}?_author=true`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch post.`);
    }

    const data = await response.json();
    return data.data;
}

// Search posts
export async function searchPosts(query) {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&_author=true`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to search posts.`);
    }

    const data = await response.json();
    return data.data;
}

// Create a new post
export async function createPost(postData) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create post.`);
    }

    const data = await response.json();
    return data.data;
}

// Update/edit an existing post
export async function editedPost(postId, postData) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update post.`);
    }

    const data = await response.json();
    return data.data;
}

// Delete a post
export async function deletePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to delete post.`);
    }

    return true;
}