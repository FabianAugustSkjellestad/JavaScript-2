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