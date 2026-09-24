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

            editButton.textContent = "Edit";
