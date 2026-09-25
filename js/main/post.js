import { getSinglePost } from "../api/posts.js";
import { renderSinglePost } from "../ui/renderPost.js";

const container = document.getElementById("singlePostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// Load the single post
async function loadSinglePost() {
    try {
        if (!postId) {
            throw new Error("Post ID is missing in the URL.");
        }

        const post = await getSinglePost(postId);

        renderSinglePost(post, container);
    } catch (error) {
        console.error("Error loading single post:", error);
        container.innerHTML = "<p>Failed to load the post. Please try again later.</p>";
    }
}

// Call the function to load the single post when the page loads
loadSinglePost();