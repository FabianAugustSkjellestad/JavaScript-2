import { getAllPosts, searchPosts, createPost } from "..api/posts.js";
import { renderPosts } from "../ui/renderPosts.js";

const postsContainer = document.getElementById("postsContainer");

// Function to fetch posts
async function fetchPosts() {
    try {
        const posts = await getAllPosts();
        renderPosts(posts, postsContainer);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchPosts");
    const searchButton = document.getElementById("searchButton");
    const createPostButton = document.getElementById("createPostButton");
    const createPostForm = document.getElementById("createPostForm");

    // Search button click event
    searchButton.addEventListener("click", async () => {
        const query = searchInput.value.trim();

        if (query) {
            const posts = await searchPosts(query);
            renderPosts(posts, postsContainer);
        } else {
            fetchPosts(); // Fetch all posts if search query is empty
        }
    });

    searchInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                const posts = await searchPosts(query);
                renderPosts(posts, postsContainer);
            } else {
                fetchPosts(); // Fetch all posts if search query is empty
            }
        }
    });

    // Removes search results when the search input is cleared
    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            fetchPosts(); // Fetch all posts if search query is empty
        }
    });

    // Show create post form when the button is clicked
    createPostButton.addEventListener("click", () => {
        if (createPostForm.style.display === "none") {
            createPostForm.style.display = "flex";
            createPostButton.textContent = "Cancel";
        } else {
            createPostForm.style.display = "none";
            createPostButton.textContent = "+ Create new post";
        }
    });

    // Handle create post form submission
    createPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("postTitle").value.trim();
        const body = document.getElementById("postBody").value.trim();
        const tags = document.getElementById("postTags").value.trim();
        const imageUrl = document.getElementById("postImageUrl").value.trim();

        if (!title) {
            alert("Title is required.");
            return;
        }

        const newPost = { title };

        if (body) {
            newPost.body = body;
        }
        if (tags) {
            
            newPost.tags = tags.split(" ").map(tag => tag.trim()).filter(tag => tag);
        }
        if (imageUrl) {
            newPost.media = {
                url: imageUrl
            };
        }

        await createPost(newPost);
        createPostForm.reset();
        fetchPosts(); // Refresh the posts after creating a new one
    });

    // Initial fetch of posts
    fetchPosts();
});