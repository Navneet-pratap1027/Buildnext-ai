const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildPrompt(repos, scores) {
  const repoList = repos
    .map(r => `- ${r.name} (${r.language || 'Unknown'}): ${r.description || 'no description'}`)
    .join('\n');

  return `You are a senior tech hiring manager at a top product company.

A developer has submitted their GitHub portfolio for review. Here are their repositories:

${repoList}

Languages detected: ${scores.languages.join(', ') || 'not specified'}
Total public repos: ${scores.repoCount}
Total stars: ${scores.totalStars}

Your task: analyze this portfolio honestly and return a JSON report.

Return ONLY raw JSON. No markdown, no backticks, no explanation before or after.

{
  "summary": "Write 2-3 honest sentences assessing this portfolio. Mention what's good, what's missing, and what the developer should focus on.",
  "skillCoverage": [
    { "skill": "React", "percentage": 82, "level": "high" },
    { "skill": "Node.js", "percentage": 68, "level": "mid" },
    { "skill": "Testing", "percentage": 8, "level": "low" }
  ],
  "missingSkills": [
    "Unit Testing",
    "CI/CD Pipelines",
    "System Design",
    "GraphQL",
    "Cloud Deployment",
    "TypeScript"
  ],
  "recommendations": [
    {
      "title": "Real-Time Collaborative Tool",
      "reason": "WebSocket-based collaboration tools are rare in student portfolios and directly signal senior-level thinking. This would immediately differentiate you from 90% of MERN applicants.",
      "impactScore": 22,
      "techStack": ["React", "Socket.io", "Node.js", "Redis"],
      "difficulty": "intermediate",
      "timeEstimate": "3-4 weeks"
    },
    {
      "title": "Full-Stack SaaS with Payments",
      "reason": "Most students never integrate real payment systems. A working SaaS with Stripe or Razorpay shows production-level thinking and is extremely attractive to startups.",
      "impactScore": 19,
      "techStack": ["React", "Node.js", "Stripe", "MongoDB", "JWT"],
      "difficulty": "intermediate",
      "timeEstimate": "4-5 weeks"
    },
    {
      "title": "Open Source Contribution Tracker",
      "reason": "A meta-project using GitHub API plus data visualization shows both API integration skills and self-awareness. Hiring managers notice this immediately.",
      "impactScore": 14,
      "techStack": ["React", "GitHub API", "Recharts", "Express"],
      "difficulty": "beginner",
      "timeEstimate": "1-2 weeks"
    }
  ]
}

Strict rules:
- skillCoverage: 5 to 7 items. Estimate percentages honestly based on how many repos use that skill. level must be exactly "high" (>70%), "mid" (40-70%), or "low" (<40%)
- missingSkills: exactly 6 strings, based on what is genuinely absent from this portfolio
- recommendations: exactly 3 objects. Each must be unique, specific to THIS developer's gaps, not generic advice
- impactScore: realistic number 5-25 based on actual market demand
- difficulty: exactly "beginner", "intermediate", or "advanced"
- Do NOT return githubScore, uniquenessScore, or overusedScore
- Return ONLY the JSON object. Absolutely nothing else.`;
}

async function analyzePortfolio(repos, scores) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = buildPrompt(repos, scores);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip any markdown fences
  const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  // Extract JSON object
  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Gemini did not return valid JSON');

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error('Failed to parse Gemini JSON: ' + e.message);
  }

  // Normalize recommendations
  parsed.recommendations = (parsed.recommendations || []).map((rec, i) => ({
    title:       typeof rec.title === 'string'  ? rec.title       : `Recommendation #${i + 1}`,
    reason:      typeof rec.reason === 'string' ? rec.reason      : 'High impact project for your portfolio.',
    impactScore: typeof rec.impactScore === 'number' ? rec.impactScore : 10,
    techStack:   Array.isArray(rec.techStack)   ? rec.techStack   : [],
    difficulty:  ['beginner', 'intermediate', 'advanced'].includes(rec.difficulty)
                   ? rec.difficulty : 'intermediate',
    timeEstimate: typeof rec.timeEstimate === 'string' ? rec.timeEstimate : '2-3 weeks',
  }));

  // Normalize skillCoverage
  parsed.skillCoverage = (parsed.skillCoverage || []).map(s => ({
    skill:      typeof s.skill === 'string' ? s.skill : 'Unknown',
    percentage: typeof s.percentage === 'number' ? Math.min(Math.max(s.percentage, 0), 100) : 50,
    level:      ['high', 'mid', 'low'].includes(s.level) ? s.level : 'mid',
  }));

  parsed.missingSkills = Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [];
  parsed.summary       = typeof parsed.summary === 'string'  ? parsed.summary       : '';

  return parsed;
}

module.exports = { analyzePortfolio };