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

    // Follow/unfollow button
    const loggedInUser = localStorage.getItem("username");

    // Only show the follow/unfollow button if the logged-in user is viewing another user's profile
    if (profile.username !== loggedInUser) {
        const followButton = document.createElement("button");
        followButton.className = "follow-button";
        // Check if the logged-in user is following the profile with some(). If so, set the button text to "Unfollow", otherwise set it to "Follow".
        const isFollowing = profile.followers.some(follower => follower.username === loggedInUser);
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