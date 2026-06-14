const axios = require('axios');

const GITHUB_API = 'https://api.github.com';

const headers = () => {
  const h = { 'Accept': 'application/vnd.github.v3+json' };
  if (process.env.GITHUB_TOKEN) {
    h['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return h;
};

async function fetchUserProfile(username) {
  try {
    const res = await axios.get(`${GITHUB_API}/users/${username}`, { headers: headers() });
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) throw new Error('GitHub user not found');
    throw new Error('Failed to fetch GitHub profile');
  }
}

async function fetchUserRepos(username) {
  try {
    const res = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      headers: headers(),
      params: { per_page: 50, sort: 'updated' }
    });
    return res.data;
  } catch (err) {
    throw new Error('Failed to fetch GitHub repos');
  }
}

function extractRepoData(repos) {
  return repos
    .filter(r => !r.fork)
    .map(repo => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      hasReadme: repo.size > 0,
      updatedAt: repo.updated_at,
    }));
}

module.exports = { fetchUserProfile, fetchUserRepos, extractRepoData };