import { getSinglePost } from "../api/posts.js";
import { renderEditPost } from "../ui/renderEditPost.js";
import { updatePost } from "../api/posts.js";

const container = document.getElementById("editPostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// Load 