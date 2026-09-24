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

    // wrapper avatar and username
    const userRow = document.createElement("div");
    userRow.className = "profile-user-row";

    // Avatar
    if (profile.avatar?.url) {
        const avatar = document.createElement("img");
        avatar.src = profile.avatar.url;
        avatar.alt = `${profile.username}'s avatar`;
        avatar.className = "profile-avatar";
        userRow.appendChild(avatar);
    }

    // Username
    const username = document.createElement("h2");
    username.textContent = profile.username;
    username.className = "profile-username";
    userRow.appendChild(username);

    header.appendChild(userRow);

    // Bio
    if (profile.bio) {
        const bio = document.createElement("div");
        bio.textContent = profile.bio;
        bio.className = "profile-bio";
        header.appendChild(bio);
    }