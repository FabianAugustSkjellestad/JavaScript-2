import { followUser, unfollowUser, getProfile } from "../api/profiles.js";

export function renderProfile(profile, container) {
    container.innerHTML = "";
    