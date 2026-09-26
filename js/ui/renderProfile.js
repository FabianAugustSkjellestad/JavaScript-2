import { followUser, unfollowUser, getProfile } from "../api/profiles.js";
import { renderPosts } from "./renderPosts.js";

export function renderProfile(profile, container) {
    container.innerHTML = "";

    // Profile header
    const header = document.createElement("div");
    header.className = "profile-header";

    // Profile banner
    if (profile.banner?.url) {
        const banner = document.createElement("img");
        banner.src = profile.banner.url;
        banner.alt = profile.banner.alt || "Profile banner";
        banner.className = "profile-image";
        header.appendChild(banner);
    }

    // wrapper avatar and username
    const userRow = document.createElement("div");
    userRow.className = "profile-user-row";

    // Avatar
    if (profile.avatar?.url) {
        const avatar = document.createElement("img");
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt || "Profile avatar";
        avatar.className = "profile-avatar";
        userRow.appendChild(avatar);
    }

    // Name
    const name = document.createElement("h2");
    name.textContent = profile.name;
    name.className = "profile-name";
    userRow.appendChild(name);

    header.appendChild(userRow);

    // Bio
    if (profile.bio) {
        const bio = document.createElement("div");
        bio.textContent = profile.bio;
        bio.className = "profile-bio";
        header.appendChild(bio);
    }

    // Follow/unfollow button
    const loggedInUser = localStorage.getItem("username");

    // Only show the follow/unfollow button if the logged-in user is viewing another user's profile
    if (profile.name !== loggedInUser) {
        const followButton = document.createElement("button");
        followButton.className = "follow-button";
        // Check if the logged-in user is following the profile with some(). If so, set the button text to "Unfollow", otherwise set it to "Follow".
        const isFollowing = profile.followers?.some(follower => follower.name === loggedInUser);
        followButton.textContent = isFollowing ? "Unfollow" : "Follow";
        header.appendChild(followButton);
        
        // Add event listener to the follow/unfollow button
        followButton.addEventListener("click", async () => {
            try {
                if(followButton.textContent === "Unfollow") {
                    await unfollowUser(profile.username);
                    followButton.textContent = "Follow";
                }
                else {
                    await followUser(profile.username);
                    followButton.textContent = "Unfollow";
                }
                window.location.reload(); // Reload the page to update the profile view
            } catch (error) {
                console.error("Error updating follow status:", error);
                alert("An error occurred while updating follow status. Please try again.");
            }
        });
    }

    // Summary (posts, followers, following)
    const summary = document.createElement("div");
    summary.className = "profile-summary";

    summary.innerHTML = `
        <span>Posts: ${profile._count.posts}</span>
        <span>Followers: ${profile._count.followers}</span>
        <span>Following: ${profile._count.following}</span>
    `;

    header.appendChild(summary);

    container.appendChild(header);

    // Posts
    const postsSection = document.createElement("div");
    postsSection.className = "profile-posts";

    container.appendChild(postsSection);
    
    renderPosts(profile.posts, postsSection);
}