export function renderEditPost(post, container, onSave) {
    container.innerHTML = "";

    const editPostElement = document.createElement("div");
    editPostElement.className = "edit-post";

    const postTitleLabel = document.createElement("label");
    const postTitleInput = document.createElement("input");
    const postBodyLabel = document.createElement("label");
    const postBodyInput = document.createElement("textarea");
    const postTagsLabel = document.createElement("label");
    const postTagsInput = document.createElement("input");
    const postImageLabel = document.createElement("label");
    const postImageInput = document.createElement("input");
    const saveButton = document.createElement("button");

    postTitleInput.id = "editPostTitle";
    postBodyInput.id = "editPostBody";
    postTagsInput.id = "editPostTags";
    postImageInput.id = "editPostImage";

    postTitleInput.name = "editPostTitle";
    postBodyInput.name = "editPostBody";
    postTagsInput.name = "editPostTags";
    postImageInput.name = "editPostImage";

    postTitleLabel.setAttribute("for", "editPostTitle");
    postBodyLabel.setAttribute("for", "editPostBody");
    postTagsLabel.setAttribute("for", "editPostTags");
    postImageLabel.setAttribute("for", "editPostImage");

    postTitleLabel.className = "sr-only";
    postTitleInput.className = "edit-post-input";
    postBodyLabel.className = "sr-only";
    postBodyInput.className = "edit-post-body";
    postTagsLabel.className = "sr-only";
    postTagsInput.className = "edit-post-tags";
    postImageLabel.className = "sr-only";
    postImageInput.className = "edit-post-image";
    saveButton.className = "save-button";

    postTitleInput.type = "text";
    postTagsInput.type = "text";
    postImageInput.type = "url";