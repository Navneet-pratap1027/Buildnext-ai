const OVERUSED_KEYWORDS = [
  'todo', 'weather', 'calculator', 'notes', 'quiz',
  'portfolio', 'chat', 'ecommerce', 'shopping', 'movie',
  'recipe', 'crud', 'blog', 'login', 'register', 'auth',
  'clock', 'counter', 'timer', 'snake', 'game',
  'library', 'management', 'system', 'student', 'hospital',
  'school', 'college', 'bank', 'inventory', 'hotel',
  'doctor', 'employee', 'attendance', 'covid', 'corona',
  'disease', 'prediction', 'detection', 'classification',
  'mnist', 'iris', 'titanic', 'housing', 'sentiment',
  'churn', 'spam', 'fake', 'digit', 'cancer'
];

const RARE_KEYWORDS = [
  'saas', 'realtime', 'websocket', 'microservice',
  'kubernetes', 'pipeline', 'compiler', 'interpreter',
  'blockchain', 'open-source', 'cli', 'devtool',
  'contribution', 'analytics', 'fintech',
  'razorpay', 'stripe', 'graphql'
];

const AVERAGE_KEYWORDS = [
  'ml', 'machine-learning', 'deep-learning', 'neural',
  'tensorflow', 'keras', 'sklearn', 'pytorch',
  'docker', 'docker-compose', 'dsa', 'data-structures',
  'algorithms', 'leetcode', 'solutions', 'practice',
  'learning', 'tutorial', 'course', 'demo',
  'oauth', 'platform', 'mern', 'fullstack', 'full-stack'
];

function classifyRepo(repo) {
  const text = `${repo.name} ${repo.description}`.toLowerCase();
  if (OVERUSED_KEYWORDS.some(k => text.includes(k))) return 'overused';
  if (AVERAGE_KEYWORDS.some(k => text.includes(k))) return 'average';
  if (RARE_KEYWORDS.some(k => text.includes(k))) return 'rare';
  return 'average';
}

function getCategoryName(repo) {
  const text = `${repo.name} ${repo.description}`.toLowerCase();
  for (const k of OVERUSED_KEYWORDS) {
    if (text.includes(k)) return k.charAt(0).toUpperCase() + k.slice(1) + ' Project';
  }
  for (const k of RARE_KEYWORDS) {
    if (text.includes(k)) return k.charAt(0).toUpperCase() + k.slice(1) + ' App';
  }
  return 'General Project';
}

function computeScores(repos) {
  const total = repos.length;
  if (total === 0) {
    return {
      githubScore: 0,
      uniquenessScore: 0,
      overusedScore: 0,
      categories: [],
      repoCount: 0,
      languages: [],
      totalStars: 0,
    };
  }

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const languages  = new Set(repos.map(r => r.language).filter(l => l && l !== 'Unknown'));
  const withDesc   = repos.filter(r => r.description && r.description.length > 10).length;
  const withTopics = repos.filter(r => r.topics && r.topics.length > 0).length;

  // Log scale so scores feel natural, not inflated
  const repoComponent  = Math.log2(total + 1) * 10;
  const starComponent  = Math.log2(totalStars + 1) * 8;
  const langComponent  = Math.min(languages.size * 5, 20);
  const descComponent  = (withDesc / total) * 15;
  const topicComponent = (withTopics / total) * 10;

  const githubScore = Math.min(
    Math.round(repoComponent + starComponent + langComponent + descComponent + topicComponent),
    100
  );

  const classified    = repos.map(r => ({ ...r, status: classifyRepo(r) }));
  const overusedCount = classified.filter(r => r.status === 'overused').length;
  const averageCount  = classified.filter(r => r.status === 'average').length;
  const rareCount     = classified.filter(r => r.status === 'rare').length;

  // Average repos count as half-overused — they're common but not terrible
  const weightedOverused = overusedCount + averageCount * 0.5;
  const overusedScore = Math.min(Math.round((weightedOverused / total) * 100), 100);

  const rareRatio    = rareCount / total;
  const overusedRatio = overusedCount / total;
  const avgRatio     = averageCount / total;

  // Weighted composition score, capped at 75 max (no one gets 100 easily)
  const rawUniqueness = (rareRatio * 75) + (avgRatio * 35) + (overusedRatio * 8);
  const uniquenessScore = Math.min(Math.max(Math.round(rawUniqueness), 5), 75);

  // Group into categories
  const categoryMap = {};
  classified.forEach(r => {
    const name = getCategoryName(r);
    const key  = `${r.status}_${name}`;
    if (!categoryMap[key]) {
      categoryMap[key] = { name, status: r.status, repos: [] };
    }
    categoryMap[key].repos.push(r.name);
  });

  return {
    githubScore,
    uniquenessScore,
    overusedScore,
    categories: Object.values(categoryMap),
    repoCount: total,
    languages: [...languages],
    totalStars,
  };
}

module.exports = { computeScores };