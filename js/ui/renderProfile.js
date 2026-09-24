import { followUser, unfollowUser, getProfile } from "../api/profiles.js";

export function renderProfile(profile, container) {
    container.innerHTML = "";

    // Profile header
    const header = document.createElement("div");
    header.className = "profile-header";

    // Profile picture
    if (profile.image?.url) {
        const profileImage = document.createElement("img");
        profileImage.src = profile.image.url;
        profileImage.alt = `${profile.username}'s profile picture`;
        profileImage.className = "profile-image";
        header.appendChild(profileImage);
    }