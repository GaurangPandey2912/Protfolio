import GITHUB_CONFIG from "./config.js";

const { token, username } = GITHUB_CONFIG;

async function fetchGitHubRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
        headers: { Authorization: `token ${token}` }
    });
    const repos = await response.json();

    if (repos.message) {
        console.error("GitHub API Error:", repos.message);
        return;
    }

    let repoList = document.getElementById("repo-list");
    repoList.innerHTML = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join("");
}

async function fetchGitHubActivity() {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
        headers: { Authorization: `token ${token}` }
    });
    const events = await response.json();

    if (events.message) {
        console.error("GitHub API Error:", events.message);
        return;
    }

    let activityList = document.getElementById("activity-list");
    activityList.innerHTML = events.slice(0, 5).map(event => 
        `<li>${event.type} in <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></li>`
    ).join("");
}

// Load data
fetchGitHubRepos();
fetchGitHubActivity();
