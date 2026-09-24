import { deletePost } from "../api/posts.js";

/**
 * Renders a list of posts into the specified container.
 * Clears the container before rendering new posts.
 * Each post is displayed with its title, author, body, image url and tags.
 * @param {Array} posts - An array of post objects to render. Each post object should have the following properties: title, author, body, imageUrl, and tags.
 * @param {HTMLElement} container - The container element where the posts will be rendered.
 * @returns {void} - This function does not return anything. It directly modifies the DOM by appending post elements to the specified container.
 * 
 * @example
 * const posts = await getAllPosts();
 * const container = document.getElementById('posts-container');
 * renderPosts(posts, container);
 */
export function renderPosts(posts, container) {

    container.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        const postTitle = document.createElement("h2");
        const postBody = document.createElement("p");

        postElement.className = "post";
        postTitle.className = "post-title";
        postBody.className = "post-body";

        postTitle.textContent = post.title || "Untitled Post";
        postBody.textContent = post.body || "";

        if (post.author) {
            const authorSection = document.createElement("div");
            const authorName = document.createElement("a");

            if (post.author.avatar?.url) {
                const avatar = document.createElement("img");
                avatar.src = post.author.avatar.url;
                avatar.alt = post.author.avatar.alt || "Author's avatar";
                avatar.className = "author-avatar";
                authorSection.appendChild(avatar);
            }

            authorSection.className = "post-author";
            authorName.textContent = post.author.username || "Unknown Author";
            authorName.href = `/profile.html?username=${post.author.username}`;
            authorSection.appendChild(authorName);

            postElement.appendChild(authorSection);
        }

        const username = localStorage.getItem("username");

        if (post.author?.username === username) {

            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            editButton.className = "edit-button";
            deleteButton.className = "delete-button";
            editButton.textContent = "Edit";
            deleteButton.textContent = "Delete";

            postElement.appendChild(editButton);
            postElement.appendChild(deleteButton);

            editButton.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `./editPost.html?id=${post.id}`;
            });

            deleteButton.addEventListener("click", async (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this post?")) {
                    try {
                        await deletePost(post.id);
                        postElement.remove();
                    } catch (error) {
                        console.error("Error deleting post:", error);
                        alert("Failed to delete the post. Please try again.");
                    }
                }
            });
        }

        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);

        if (post.tags?.length) {
            const postTags = document.createElement("p");
            postTags.className = "post-tags";
            postTags.textContent = `#${post.tags.join("#")}`;
            postElement.appendChild(postTags);
        }

        if (post.media?.url) {
            const postImage = document.createElement("img");
            postImage.src = post.media.url;
            postImage.alt = post.media.alt || "Post image";
            postImage.className = "post-image";
            postElement.appendChild(postImage);
        }

        postElement.addEventListener("click", (e) => {
            if (e.target.closest("button") || e.target.closest("a")) return; // Prevent navigation if a button or link was clicked
            window.location.href = `./post.html?id=${post.id}`;
        }

        );
        container.appendChild(postElement);
    });
}

