// Render single post to the DOM

export function renderSinglePost(post, container) {
    container.innerHTML = "";

    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

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

        postCard.appendChild(authorSection);
    }

    // Title section
    const postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = post.title || "Untitled Post";
    postElement.appendChild(elementTitle);

    // Body section
    const postBody = document.createElement("p");
    postBody.className = "post-body";
    postBody.textContent = post.body || "";
    postCard.appendChild(postBody);

    // Tags section
    if (post.tags?.length) {
        const postTags = document.createElement("p");
        postTags.className = "post-tags";
        postTags.textContent = `#${post.tags.join(", #")}`;
        postCard.appendChild(postTags);
    }

    // Image section
    if (post.media?.url) {
        const postImage = document.createElement("img");
        postImage.src = post.media.url;
        postImage.alt = post.media.alt || "Post Image";
        postImage.className = "post-image";
        postCard.appendChild(postImage);
    }