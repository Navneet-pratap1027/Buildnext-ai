const express = require('express');
const router = express.Router();
const { fetchUserProfile, fetchUserRepos, extractRepoData } = require('../services/github');
const { computeScores } = require('../services/scorer');
const { analyzePortfolio } = require('../services/gemini');

router.post('/', async (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'GitHub username is required' });
  }

  try {
    const [profile, rawRepos] = await Promise.all([
      fetchUserProfile(username.trim()),
      fetchUserRepos(username.trim()),
    ]);

    if (!rawRepos.length) {
      return res.status(400).json({ error: 'No public repositories found' });
    }

    const repos  = extractRepoData(rawRepos);
    const scores = computeScores(repos);
    const aiData = await analyzePortfolio(repos, scores);

    res.json({
      profile: {
        username:    profile.login,
        name:        profile.name,
        avatar:      profile.avatar_url,
        bio:         profile.bio,
        publicRepos: profile.public_repos,
        followers:   profile.followers,
        profileUrl:  profile.html_url,
      },
      repos,
      analysis: {
        githubScore:      scores.githubScore,
        uniquenessScore:  scores.uniquenessScore,
        overusedScore:    scores.overusedScore,
        categories:       scores.categories,
        summary:          aiData.summary,
        skillCoverage:    aiData.skillCoverage,
        missingSkills:    aiData.missingSkills,
        recommendations:  aiData.recommendations,
      },
    });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

module.exports = router;