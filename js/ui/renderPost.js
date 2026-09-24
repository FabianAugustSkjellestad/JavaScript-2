// Render single post to the DOM

export function renderSinglePost(post, container) {
    container.innerHTML = "";

    const postElement = document.createElement("div");
    postElement.classList.add("post-element");

    // Author section............//

    // Only render author if it exists
    if (post.author) {
        const authorSection = document.createElement("div");
        authorSection.className = "post-author";

        //If author has an avatar, render it
        if (post.author.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = post.author.avatar.url;
            avatar.alt = post.author.avatar.alt || "Author Avatar";
            avatar.className = "author-avatar";
            authorSection.appendChild(avatar);
        }
        // Render author name, if missing fallback to "Unknown Author"
        const authorName = document.createElement("a");
        authorName.href = `profile.html?id=${post.author.name}`;
        authorName.textContent = post.author.name || "Unknown";
        authorSection.appendChild(authorName);

        postElement.appendChild(authorSection);
    }