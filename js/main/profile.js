import { getProfile, getProfilePosts } from "../api/profiles.js";
import { renderProfile } from "../ui/renderProfile.js";

const container = document.getElementById("profileContainer");
// Load the profile
async function loadProfile() {
    const params = new URLSearchParams(window.location.search);
    const usernameFromUrl = params.get("name");
    const loggedInUser = localStorage.getItem("username");

    const profileToLoad = usernameFromUrl || loggedInUser;

    if (!profileToLoad) {
        console.error("No profile username was provided.");
        container.textContent = "Unable to identify the profile.";
        return;
    }

    try {
        const profile = await getProfile(profileToLoad);
        const posts = await getProfilePosts(profileToLoad);

        profile.posts = posts; // Add the posts to the profile object

        renderProfile(profile, container);

    } catch (error) {
        console.error("Error loading profile:", error);
        container.textContent = 
        `Error loading profile: ${error.message}`;
    }
}

loadProfile();

// Log out functionality
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        try {
            localStorage.removeItem("accessToken");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 300); // 3 seconds delay
        } catch (error) {
            console.error("Error during logout:", error);
        }
    });
}