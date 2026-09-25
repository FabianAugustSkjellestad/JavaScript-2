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