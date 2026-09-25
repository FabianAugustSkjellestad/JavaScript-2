import { getSinglePost } from "../api/posts.js";
import { renderEditPost } from "../ui/renderEditPost.js";
import { updatePost } from "../api/posts.js";

const container = document.getElementById("editPostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// Load edit post
async function loadEditPost() {
    try {
        if (!postId) {
            throw new Error("Post ID is missing in the URL.");
        }

        const post = await getSinglePost(postId);
        renderEditPost(post, container, publishEditedPost);
    } catch (error) {
        console.error("Error loading post:", error);
        container.innerHTML = "<p class='error'>Error loading post. Please try again later.</p>";
    }
}

loadEditPost();
